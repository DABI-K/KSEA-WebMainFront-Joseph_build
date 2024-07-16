import { Component, OnInit } from '@angular/core';
import { KseaInfoService } from 'src/app/service/ksea-info.service';

@Component({
  selector: 'app-lcpc',
  templateUrl: './lcpc.component.html',
  styleUrls: [
    '../../../css/common.scss',
    '../committee/committee.component.scss',
    './lcpc.component.scss',
  ],
})
export class LcpcComponent implements OnInit {
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
      return this.kseaInfo.chapters.filter((item: any) => item.type === key);
    }

    return [];
  }
}
