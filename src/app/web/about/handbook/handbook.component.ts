import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-hadbook',
  templateUrl: './handbook.component.html',
  styleUrls: ['../../../css/common.scss', './handbook.component.scss'],
})
export class HadbookComponent implements OnInit {
  filesURL: string = environment.external_urls.s3 + 'files/';
  constructor() {}

  ngOnInit(): void {}
}
