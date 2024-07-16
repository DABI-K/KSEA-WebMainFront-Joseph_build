import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { UserInfoService } from 'src/app/service/user-info.service';

import {
  EducationInfo,
  JobInfo,
  KSEAInfo,
  UserInfo,
} from 'src/app/shared/userinfo';

import { IUser, CognitoService } from '../../service/cognito.service';
import { Membership } from 'src/app/shared/membership';
import { MembershipService } from 'src/app/service/membership.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../css/common.scss', './profile.component.scss'],
})

export class ProfileComponent implements OnInit {
  currentTab = 'Personal Information';
  token: string = '';
  loading: boolean;
  user: IUser;
  userInfo: UserInfo;
  titles: string[] = ['Dr.', 'Prof.', 'Mr.', 'Ms.'];
  kseaInfo: any;
  newEduInfo: EducationInfo;
  newJobInfo: JobInfo;
  membership: Membership;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private userInfoService: UserInfoService,
    private kseaInfoService: KseaInfoService,
    private membershipService: MembershipService,
    private route: ActivatedRoute
  ) {
    this.loading = false;
    this.user = {} as IUser;
    this.userInfo = {} as UserInfo;
    this.newEduInfo = {} as EducationInfo;
    this.newJobInfo = {} as JobInfo;
    this.membership = {} as Membership;
  }

  public ngOnInit(): void {
    this.newEduInfo = {} as EducationInfo;
    this.newJobInfo = {} as JobInfo;
    const tab = this.route.snapshot.paramMap.get('tab');

    if (tab === 'Personal-Information')
      this.currentTab = 'Personal Information';
    else if (tab === 'KSEA-Information') this.currentTab = 'KSEA Information';
    else if (tab === 'Work-Information') this.currentTab = 'Work Information';
    else if (tab === 'Education-Information')
      this.currentTab = 'Education Information';
    else if (tab === 'Membership-Information')
      this.currentTab = 'Membership Information';
    else this.currentTab = 'Membership Information';

    this.kseaInfoService.getKSEAInfo().subscribe((res) => {
      this.kseaInfo = res.Item;
      this.kseaInfoService.setKSEAInfo(res);
    });

    this.cognitoService
      .getUser()
      .then((user: any) => {
        this.user = user.attributes;
        this.user.username = user.username;
        console.log(this.user);

        this.cognitoService.getToken().then((sdata) => {
          this.token = sdata.accessToken.jwtToken;

          this.membershipService
            .getMembership(user.username, this.token)
            .subscribe((data: any) => {
              this.membership = data.Item;
              if (!this.membership) {
                this.membership = {} as Membership;
                this.membership.id = user.username;
                this.membership.type = 'Unpaid';
                this.membership.email = user.attributes.email;
              }
            });

          this.userInfoService
            .getUserInfo(user.username, this.token)
            .subscribe((result: any) => {
              this.userInfo = result.Item;
              if (result.Item) {
                this.userInfo = result.Item;
                if (!this.userInfo.educationInfo) this.userInfo.educationInfo = [];
                if (!this.userInfo.jobHistory) this.userInfo.jobHistory = [];
                if (!this.userInfo.currentJob) this.userInfo.currentJob = {} as JobInfo;
                if (!this.userInfo.kseaInfo) this.userInfo.kseaInfo = {} as KSEAInfo;
              } else {
                this.userInfo = {} as UserInfo;
                this.userInfo.id = user.username;
                this.userInfo.email = user.attributes.email;
                this.userInfo.kseaInfo = {} as KSEAInfo;
                this.userInfo.educationInfo = [];
                this.userInfo.jobHistory = [];
                this.userInfo.currentJob = {} as JobInfo;
              }
              this.sortEduInfo();
              this.sortJobInfo();
            });
        });
      })
      .catch(() => {
        this.router.navigate(['/signIn']);
      });
  }

  public update(): void {
    this.loading = true;
    this.userInfoService
          .createUserInfo(this.userInfo)
          .subscribe(() => {
            this.loading = false;
          });
  }

  public signOut(): void {
    this.cognitoService.signOut().then(() => {
      this.router.navigate(['/signIn']);
    });
  }

  public addEduInfo(): void {
    this.userInfo.educationInfo.push(
      JSON.parse(JSON.stringify(this.newEduInfo))
    );
    this.newEduInfo = {} as EducationInfo;
    this.sortEduInfo();
  }

  public delEduInfo(item: EducationInfo): void {
    this.userInfo.educationInfo = this.userInfo.educationInfo.filter((obj) => {
      return obj !== item;
    });
  }

  public sortEduInfo(): void {
    this.userInfo.educationInfo = this.userInfo.educationInfo.sort((a, b) =>
      a.yearEarned > b.yearEarned ? -1 : 1
    );
  }

  public addJobInfo(): void {
    this.userInfo.jobHistory.push(JSON.parse(JSON.stringify(this.newJobInfo)));
    this.newJobInfo = {} as JobInfo;
    this.sortJobInfo();
  }

  public delJobInfo(item: JobInfo): void {
    this.userInfo.jobHistory = this.userInfo.jobHistory.filter((obj) => {
      return obj !== item;
    });
  }

  public sortJobInfo(): void {
    this.userInfo.jobHistory = this.userInfo.jobHistory.sort((a, b) =>
      a.startDate > b.startDate ? -1 : 1
    );
  }
}
