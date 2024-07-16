import { Component, OnInit } from '@angular/core';
import { KseaInfoService } from 'src/app/service/ksea-info.service';

@Component({
  selector: 'app-technical-g',
  templateUrl: './technical-g.component.html',
  styleUrls: [
    '../../../css/common.scss',
    '../committee/committee.component.scss',
    './technical-g.component.scss',
  ],
})
export class TechnicalGComponent implements OnInit {
  kseaInfo: any;

  physicalSciencesTechnicalGroups: any[] = [];
  lifeSciencesTechnicalGroups: any[] = [];
  engineeringTechnicalGroups: any[] = [];
  otherFieldsGroups: any[] = [];

  constructor(private kseaInfoService: KseaInfoService) {}

  ngOnInit(): void {
    this.kseaInfoService.getKSEAInfo().subscribe((res) => {
      this.kseaInfo = res.Item;
      this.kseaInfoService.setKSEAInfo(res);

      this.kseaInfo.groups.forEach((elm: any) => {
        if (elm.code.startsWith('A')) {
          this.physicalSciencesTechnicalGroups.push(elm);
        } else if (elm.code.startsWith('B')) {
          this.lifeSciencesTechnicalGroups.push(elm);
        } else if (elm.code.startsWith('C')) {
          this.engineeringTechnicalGroups.push(elm);
        } else if (elm.code.startsWith('D')) {
          this.otherFieldsGroups.push(elm);
        }
      });
    });
  }
}
