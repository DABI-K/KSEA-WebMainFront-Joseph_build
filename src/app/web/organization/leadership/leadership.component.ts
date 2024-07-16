import { Component, OnInit } from '@angular/core';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-leadership',
  templateUrl: './leadership.component.html',
  styleUrls: ['../../../css/common.scss', './leadership.component.scss'],
})
export class LeadershipComponent implements OnInit {
  imgURL: string = environment.external_urls.s3 + 'leaders/';
  kseaInfo: any;

  constructor(private kseaInfoService: KseaInfoService) {}

  ngOnInit(): void {
    this.kseaInfoService.getKSEAInfo().subscribe((res) => {
      this.kseaInfo = res.Item;
      this.kseaInfoService.setKSEAInfo(res);
    });
  }
}
