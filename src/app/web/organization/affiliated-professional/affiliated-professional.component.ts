import { Component, OnInit } from '@angular/core';
import { KseaInfoService } from 'src/app/service/ksea-info.service';

@Component({
  selector: 'app-affiliated-professional',
  templateUrl: './affiliated-professional.component.html',
  styleUrls: [
    '../../../css/common.scss',
    '../committee/committee.component.scss',
    './affiliated-professional.component.scss',
  ],
})
export class AffiliatedProfessionalComponent implements OnInit {
  kseaInfo: any;

  constructor(private kseaInfoService: KseaInfoService) {}

  ngOnInit(): void {
    this.kseaInfoService.getKSEAInfo().subscribe((res) => {
      this.kseaInfo = res.Item;
      this.kseaInfoService.setKSEAInfo(res);
    });
  }
}
