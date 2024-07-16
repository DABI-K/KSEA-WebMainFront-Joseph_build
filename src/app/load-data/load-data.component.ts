import { HttpClient } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MembershipService } from '../service/membership.service';
import { UserInfoService } from '../service/user-info.service';

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['../css/common.scss', './load-data.component.scss'],
})
export class LoadDataComponent implements OnInit {
  loading: boolean = false;
  constructor(
    private http: HttpClient,
    private membershipService: MembershipService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    this.loading = false;
  }

  loadUserData(): void {
    this.loading = false;
    this.http
      .get('assets/data/additionalData/ksea_info.json', {
        responseType: 'text',
      })
      .subscribe((ksea_data) => {
        this.http
          .get('assets/data/additionalData/work_info.json', {
            responseType: 'text',
          })
          .subscribe((work_data) => {
            this.http
              .get('assets/data/additionalData/education.json', {
                responseType: 'text',
              })
              .subscribe((edu_data) => {
                const ksea_data_raw: any[] = JSON.parse(ksea_data);
                const work_data_raw: any[] = JSON.parse(work_data);
                const edu_data_raw: any[] = JSON.parse(edu_data);

                console.log(ksea_data_raw);
                console.log(work_data_raw);
                console.log(edu_data_raw);

                let ksea_data_map = new Map();

                ksea_data_raw.forEach((item: any) => {
                  if (!ksea_data_map.get(item.id))
                    ksea_data_map.set(item.id, item);
                });

                let work_data_map = new Map();

                work_data_raw.forEach((item: any) => {
                  if (!work_data_map.get(item.id))
                    work_data_map.set(item.id, item);
                  else {
                    if (!work_data_map.get(item.id).jobHistory)
                      work_data_map.get(item.id).jobHistory = [];
                    work_data_map
                      .get(item.id)
                      .jobHistory.push(item.jobHistory[0]);
                  }
                });

                let edu_data_map = new Map();

                edu_data_raw.forEach((item: any) => {
                  if (!edu_data_map.get(item.id))
                    edu_data_map.set(item.id, item);
                  else {
                    if (!edu_data_map.get(item.id).educationInfo)
                      edu_data_map.get(item.id).educationInfo = [];
                    edu_data_map
                      .get(item.id)
                      .educationInfo.push(item.educationInfo[0]);
                  }
                });

                const keys_1 = Array.from(ksea_data_map.keys());
                const keys_2 = Array.from(work_data_map.keys());
                const keys_3 = Array.from(edu_data_map.keys());

                keys_2.forEach((key) => {
                  if (!ksea_data_map.get(key)) {
                    ksea_data_map.set(key, work_data_map.get(key));
                  }
                });
                keys_3.forEach((key) => {
                  if (!ksea_data_map.get(key)) {
                    ksea_data_map.set(key, edu_data_map.get(key));
                  }
                });

                keys_1.forEach((key) => {
                  if (work_data_map.get(key)) {
                    ksea_data_map.get(key).jobHistory =
                      work_data_map.get(key).jobHistory;
                  }
                  if (edu_data_map.get(key)) {
                    ksea_data_map.get(key).educationInfo =
                      edu_data_map.get(key).educationInfo;
                  }
                });

                const keys = Array.from(ksea_data_map.keys());

                const result: any[] = [];

                keys.forEach((key) => {
                  result.push(ksea_data_map.get(key));
                });

                const list: any[] = [];

                for (let i = 0; i < result.length; i = i + 50) {
                  const newList = result.slice(i, i + 50);
                  list.push(newList);
                }

                this.processArray2(list);
              });
          });
      });
  }

  loadPaymentData(): void {
    this.loading = false;
    this.http
      .get('assets/data/additionalData/payhistory.json', {
        responseType: 'text',
      })
      .subscribe((data) => {
        const payHistoryData: any[] = JSON.parse(data);

        let myMap = new Map();

        payHistoryData.forEach((item: any) => {
          if (myMap.get(item.id)) {
            if (!myMap.get(item.id).paymentHistory)
              myMap.get(item.id).paymentHistory = [];
            myMap.get(item.id).paymentHistory.push(item.paymentHistory[0]);

            const oldDate = Date.parse(myMap.get(item.id).expirationDate);
            const newDate = Date.parse(item.expirationDate);

            if (newDate > oldDate) {
              myMap.get(item.id).numberOfPayments = item.numberOfPayments;
              myMap.get(item.id).type = item.type;
              myMap.get(item.id).expirationDate = item.expirationDate;
            }
          } else {
            myMap.set(item.id, item);
          }
        });

        const keys = Array.from(myMap.keys());

        const result: any[] = [];

        keys.forEach((key) => {
          result.push(myMap.get(key));
        });

        const list: any[] = [];

        for (let i = 0; i < result.length; i = i + 50) {
          const newList = result.slice(i, i + 50);
          list.push(newList);
        }

        this.processArray1(list);
      });
  }

  async processArray1(list: any[]) {
    let index = 1;
    for (const item of list) {
      await this.delayedPushMessage1(item);
      console.log(index + '/' + list.length, item);
      index = index + 1;
    }
    alert('Your message has been sent.');
  }

  async processArray2(list: any[]) {
    let index = 1;
    for (const item of list) {
      // if (index === 321 || index === 329 || index === 333) {
      await this.delayedPushMessage2(item);
      console.log(index + '/' + list.length, item);
      // }
      index = index + 1;
    }
    alert('Your message has been sent.');
  }

  async delayedPushMessage1(data: any) {
    await this.myDelay();

    this.membershipService
      .batchMemberships(data)
      .subscribe((res) => console.log(res));
  }

  async delayedPushMessage2(data: any) {
    await this.myDelay();

    this.userInfoService
      .batchUserInfos(data)
      .subscribe((res) => console.log(res));
  }

  myDelay() {
    return new Promise((resolve) => setTimeout(resolve, 6000));
  }
}
