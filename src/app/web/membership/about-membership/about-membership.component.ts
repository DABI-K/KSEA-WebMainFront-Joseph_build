import { Component, OnInit } from '@angular/core';
import { CognitoService } from 'src/app/service/cognito.service';
import { KseaInfoService } from 'src/app/service/ksea-info.service';

@Component({
  selector: 'app-about-membership',
  templateUrl: './about-membership.component.html',
  styleUrls: ['../../../css/common.scss', './about-membership.component.scss'],
})
export class AboutMembershipComponent implements OnInit {
  user: any;
  kseaInfo: any;

  constructor(
    private cognitoService: CognitoService,
    private kseaInfoService: KseaInfoService
  ) {}
  // constructor(private kseaInfoService: KseaInfoService) {}

  ngOnInit(): void {
    // this.cognitoService.getUser().then((user: any) => {
    //   if (user) {
    //     this.user = user;
    //   }
    // });
    // Donghun added
    this.kseaInfoService.getKSEAInfo().subscribe((res) => {
      this.kseaInfo = res.Item;
      this.kseaInfoService.setKSEAInfo(res);
    });
  }

  // Donghun added
  filter(key: string): any[] {
    if (this.kseaInfo ) { // if (this.kseaInfo && this.kseaInfo.committees) { 
      //return this.kseaInfo.lifetime.filter((item: any) => item.type === key);
      return this.kseaInfo.lifetime;
    }
    return [];
  }
  
}
