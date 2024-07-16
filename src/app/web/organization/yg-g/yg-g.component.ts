import { Component, OnInit } from '@angular/core';
import { KseaInfoService } from 'src/app/service/ksea-info.service';

@Component({
  selector: 'app-yg-g',
  templateUrl: './yg-g.component.html',
  styleUrls: [
    '../../../css/common.scss',
    '../committee/committee.component.scss',
    './yg-g.component.scss',
  ],
})
export class YgGComponent implements OnInit {
  kseaInfo: any;

  constructor(private kseaInfoService: KseaInfoService) {}

  ngOnInit(): void {
    this.kseaInfoService.getKSEAInfo().subscribe((res) => {
      this.kseaInfo = res.Item;
      this.kseaInfoService.setKSEAInfo(res);
    });
  }
}
