import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ukc-registeration-list',
  templateUrl: './ukc-registeration-list.component.html',
  styleUrls: [
    '../../../../css/common.scss',
    './ukc-registeration-list.component.scss',
  ],
})
export class UkcRegisterationListComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  loading = false;
  results: any[] | undefined;
  listRegistration: any[] | undefined;
  ukc_registration_api_URL = environment.apiURLs.ukc_registration_api_URL;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loading = true;
    this.results = undefined;
    this.listRegistration = [];

    this.getAllResults();
  }

  getAllResults() {
    this.http
      .get<any>(this.ukc_registration_api_URL + '/ksea-ukc/registration')
      .subscribe((res) => {
        if (res && res.Items && res.Items.length > 0) {
          this.results = res.Items;

          if (res.LastEvaluatedKey) {
            this.getNextResults(res.LastEvaluatedKey.id);
          } else {
            this.popItems();
          }
        }
        this.loading = false;
      });
  }

  getNextResults(lastEvaluatedKey: string) {
    this.http
      .get<any>(
        this.ukc_registration_api_URL +
          '/ksea-ukc/registration/next/' +
          lastEvaluatedKey
      )
      .subscribe((res) => {
        if (this.results) this.results = [...this.results, ...res.Items];
        else this.results = res.Items;

        if (res.LastEvaluatedKey) {
          this.getNextResults(res.LastEvaluatedKey.id);
        } else {
          this.popItems();
        }
      });
  }
  popItems() {
    this.listRegistration = [];
    this.results?.forEach((item) => {
      if (item.list)
        item.list.forEach((r: any) => {
          if (r.status === 'Registered') {
            const found = this.listRegistration?.find(
              (item) =>
                item.title === r.title &&
                item.lastName === r.lastName &&
                item.firstName === r.firstName &&
                item.affiliation === r.affiliation
            );
            if (!found) this.listRegistration?.push(r);
          }
        });
    });
  }
}
