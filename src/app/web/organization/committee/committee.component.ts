import { Component, OnInit } from '@angular/core';
import { KseaInfoService } from 'src/app/service/ksea-info.service';

@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['../../../css/common.scss', './committee.component.scss'],
})
export class CommitteeComponent implements OnInit {
  kseaInfo: any;

  constructor(private kseaInfoService: KseaInfoService) {}

  ngOnInit(): void {
    this.kseaInfoService.getKSEAInfo().subscribe((res) => {
      this.kseaInfo = res.Item;
      this.kseaInfoService.setKSEAInfo(res);
    });
  }

  filter(key: string): any[] {
    if (this.kseaInfo && this.kseaInfo.committees) {
      return this.kseaInfo.committees.filter((item: any) => item.type === key);
    }

    return [];
  }
}
