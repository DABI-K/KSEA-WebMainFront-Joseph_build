import { Component, OnInit } from '@angular/core';
import { CognitoService } from 'src/app/service/cognito.service';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { MembershipService } from 'src/app/service/membership.service';
import { Membership } from 'src/app/shared/membership';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-scholarshihp',
  templateUrl: './scholarship.component.html',
  styleUrls: ['../../../css/common.scss', './scholarship.component.scss'],
})
export class ScholarshihpComponent implements OnInit {
  scholarshipDefId = environment.webConfig.scholarshipDefId;
  scholarshipDef: any;
  user: any = null;
  token: string = '';
  membership: Membership;
  constructor(
    private kseaInfoService: KseaInfoService,
    private membershipService: MembershipService,
    private cognitoService: CognitoService
  ) {
    this.membership = {} as Membership;
  }

  ngOnInit(): void {
    this.user = null;
    this.kseaInfoService.getEventDef(this.scholarshipDefId).subscribe((res) => {
      this.scholarshipDef = res.Item;
    });

    this.cognitoService.getUser().then((user: any) => {
      this.user = user;
      if (this.user) {
        this.cognitoService.getToken().then((sdata) => {
          this.token = sdata.accessToken.jwtToken;
          this.membershipService
            .getMembership(user.username, this.token)
            .subscribe((data: any) => {
              this.membership = data.Item;
            });
        });
      }
    });
  }
}
