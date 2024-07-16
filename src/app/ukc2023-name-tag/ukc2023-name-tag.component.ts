import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ukc2023-name-tag',
  templateUrl: './ukc2023-name-tag.component.html',
  styleUrls: ['./ukc2023-name-tag.component.scss'],
})
export class Ukc2023NameTagComponent implements OnInit {
  constructor(private http: HttpClient) {}
  dataList: any[] = [];

  pageList: any[] = [];

  ngOnInit(): void {
    this.http
      .get(
        'https://ksea-files.s3.us-west-2.amazonaws.com/data/2023+UKC+Registration+-0718+nametag+final.csv',
        { responseType: 'text' }
      )
      .subscribe((data) => {
        const list = data.split('\n');
        list.forEach((e) => {
          if (e.startsWith('Frist Name')) {
          } else {
            let fName = e.split(',')[0];

            if (fName) {
              fName = fName.replace(/"""/gi, '&&');
              fName = fName.replace(/""/gi, '&&');
              fName = fName.replace(/"/gi, '');
              fName = fName.replace(/&&/gi, '"');
            }
            const lName = e.split(',')[1];
            const affiliation = e.split(',')[2];
            const ts = e.split(',')[3];
            const code = e.split(',')[4];

            const unitData = {
              fName: fName,
              lName: lName,
              affiliation: affiliation,
              ts: ts,
              code: code,
            };
            this.dataList.push(unitData);
          }
        });
        for (let i = 0; i < this.dataList.length; i = i + 6) {
          let pageData: any = {};

          pageData.data1 = this.dataList[i];
          pageData.data2 = this.dataList[i + 1];
          pageData.data3 = this.dataList[i + 2];
          pageData.data4 = this.dataList[i + 3];
          pageData.data5 = this.dataList[i + 4];
          pageData.data6 = this.dataList[i + 5];

          this.pageList.push(pageData);
        }

        console.log(this.pageList);
      });
  }
}
