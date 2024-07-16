import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/service/cognito.service';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { MembershipService } from 'src/app/service/membership.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['../../css/common.scss', './user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  list: any[] = [];
  idListStr: string = '';
  user: any = null;
  token: string = '';
  loading = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private membershipService: MembershipService,
    private userInfoService: UserInfoService,
    private kseaInfoService: KseaInfoService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.cognitoService
      .getUser()
      .then((user: any) => {
        this.user = user;
        if (this.user) {
          this.cognitoService.getToken().then((sdata) => {
            this.token = sdata.accessToken.jwtToken;

            if (
              environment.userInfoMonitors.includes(this.user.attributes.email)
            ) {
              this.loading = false;
            }
          });
        } else this.router.navigate(['/signIn']);
      })
      .catch(() => {
        this.router.navigate(['/signIn']);
      });
  }

  query() {
    this.loading = true;
    this.list = [];

    const idList = this.idListStr.split(',');
    this.casecadeQuery(idList);
  }
  casecadeQuery(idList: string[]) {
    if (idList && idList.length > 0) {
      const id = idList[0].trim();

      if (id.includes('@')) {
        const email = id;
        this.membershipService
          .getMembershipByEmail(email, this.token)
          .subscribe((res1: any) => {
            this.userInfoService
              .getUserInfoByEmail(email, this.token)
              .subscribe((res2: any) => {
                const memberInfo = res1.Item;
                const userInfo = res2.Item;
                console.log(memberInfo);
                console.log(userInfo);

                let newItem: any = {};
                newItem.id = memberInfo.id;

                if (memberInfo) {
                  if (!newItem.email) newItem.email = memberInfo.email;
                  if (memberInfo.type === 'Student') {
                    newItem.status = memberInfo.schoolInfo.type;
                  } else {
                    newItem.status = memberInfo.type;
                  }

                  newItem.expirationDate = memberInfo.expirationDate;
                }

                if (userInfo) {
                  if (!newItem.email) newItem.email = userInfo.email;
                  if (userInfo.kseaInfo) {
                    newItem.chapter = userInfo.kseaInfo.localChapter;
                  }
                }

                this.list.push(newItem);
                console.log(this.list);
                this.casecadeQuery(idList.slice(1));
              });
          });
      } else {
        this.membershipService
          .getMembership(id, this.token)
          .subscribe((res1: any) => {
            this.userInfoService
              .getUserInfo(id, this.token)
              .subscribe((res2: any) => {
                const memberInfo = res1.Item;
                const userInfo = res2.Item;
                console.log(memberInfo);
                console.log(userInfo);

                let newItem: any = {};
                newItem.id = id;

                if (memberInfo) {
                  if (!newItem.email) newItem.email = memberInfo.email;
                  if (memberInfo.type === 'Student') {
                    newItem.status = memberInfo.schoolInfo.type;
                  } else {
                    newItem.status = memberInfo.type;
                  }

                  newItem.expirationDate = memberInfo.expirationDate;
                }

                if (userInfo) {
                  if (!newItem.email) newItem.email = userInfo.email;
                  if (userInfo.kseaInfo) {
                    newItem.chapter = userInfo.kseaInfo.localChapter;
                  }
                }

                this.list.push(newItem);
                console.log(this.list);
                this.casecadeQuery(idList.slice(1));
              });
          });
      }
    } else {
      this.loading = false;
    }
  }
}
