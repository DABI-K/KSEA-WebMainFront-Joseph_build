import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.scss'],
})
export class RecommenderComponent {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  apiURL = environment.apiURLs.file_api_URL;
  scholarshipDefId = environment.webConfig.scholarshipDefId;
  scholarshipFileUrl = environment.external_urls.s3_Scholarship;
  scholarshipResultUrl = environment.apiURLs.scholarship_api_URL;
  para1: any;
  para2: any;
  rec: any;
  token: string = '';

  scholarshipItem: any;
  recommenderItem: any;
  constructor(private aroute: ActivatedRoute, private http: HttpClient) {}

  public ngOnInit(): void {
    this.aroute.queryParams.subscribe((params) => {
      this.para1 = params['id'];
      this.para2 = params['email'];
      console.log('ID: ' + this.para1);
      console.log('email: ' + this.para2);

      if (this.para1 && this.para2) {
        this.http
          .get<any>(
            this.scholarshipResultUrl + '/ksea-scholarship/result/' + this.para1
          )
          .subscribe((res) => {
            if (res && res.Item) {
              if (res.Item.recommenders) {
                this.scholarshipItem = res.Item;
                const founds = res.Item.recommenders.filter((item: any) => {
                  return this.para2 === item.email;
                });

                if (founds && founds.length > 0) {
                  this.recommenderItem = founds[0];
                  console.log(founds[0]);
                  console.log(this.scholarshipItem);
                }
              }
            }
          });
      }
    });
  }

  addRecFile(event: any, rec: any) {
    rec.recFileloading = true;

    const param = {
      bucket: 'ksea-scholarship',
      username: this.para1,
      defId: this.scholarshipDefId,
    };

    this.http
      .post<any>(
        this.apiURL + '/presignedUrl',
        JSON.stringify(param),
        this.httpOptions
      )
      .subscribe((res) => {
        let file: File = event.target.files[0];
        this.http.put(res.url, file).subscribe((res2) => {
          rec.recFileloading = undefined;
          rec.fileURL =
            this.scholarshipFileUrl +
            this.scholarshipDefId +
            '/' +
            this.para1 +
            '/' +
            res.filename;

          console.log(this.scholarshipItem);
          this.http
            .put<any>(
              this.scholarshipResultUrl + '/ksea-scholarship/result',
              JSON.stringify(this.scholarshipItem),
              this.httpOptions
            )
            .subscribe((res) => {});
        });
      });
  }
}
