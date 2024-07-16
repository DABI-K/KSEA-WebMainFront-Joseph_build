import { Component, OnInit } from '@angular/core';
import { KseaInfoService } from 'src/app/service/ksea-info.service';

@Component({
  selector: 'app-councilors',
  templateUrl: './councilors.component.html',
  styleUrls: [
    '../../../css/common.scss',
    '../committee/committee.component.scss',
    '../lcpc/lcpc.component.scss',
    './councilors.component.scss',
  ],
})
export class CouncilorsComponent implements OnInit {
  kseaInfo: any;

  constructor(private kseaInfoService: KseaInfoService) {}

  ngOnInit(): void {
    this.kseaInfoService.getKSEAInfo().subscribe((res) => {
      this.kseaInfo = res.Item;
      this.kseaInfoService.setKSEAInfo(res);
    });
  }

  filterChapters(key: string): any[] {
    if (this.kseaInfo && this.kseaInfo.committees) {
      return this.kseaInfo.chapters.filter((item: any) => item.type === key);
    }

    return [];
  }
}
