import { Component, OnInit } from '@angular/core';
import { KseaInfoService } from 'src/app/service/ksea-info.service';

@Component({
  selector: 'app-former-contact-list',
  templateUrl: './former-contact-list.component.html',
  styleUrls: [
    '../../../css/common.scss',
    '../committee/committee.component.scss',
    '../leadership/leadership.component.scss',
    './former-contact-list.component.scss',
  ],
})
export class FormerContactListComponent implements OnInit {
  kseaInfo: any;

  constructor(private kseaInfoService: KseaInfoService) {}

  ngOnInit(): void {
    this.kseaInfoService.getKSEAInfo().subscribe((res) => {
      this.kseaInfo = res.Item;
      this.sortFormer();
      this.kseaInfoService.setKSEAInfo(res);
    });
  }

  ordinal_suffix_of(i: number) {
    const j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + 'st';
    }
    if (j == 2 && k != 12) {
      return i + 'nd';
    }
    if (j == 3 && k != 13) {
      return i + 'rd';
    }
    return i + 'th';
  }

  public sortFormer(): void {
    this.kseaInfo.formerPresidents = this.kseaInfo.formerPresidents.sort(
      (a: any, b: any) => (Number(a.term) > Number(b.term) ? -1 : 1)
    );
  }
}
