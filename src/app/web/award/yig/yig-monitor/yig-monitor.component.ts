import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CognitoService } from 'src/app/service/cognito.service';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { MembershipService } from 'src/app/service/membership.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-yig-monitor',
  templateUrl: './yig-monitor.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['../../../../css/common.scss', './yig-monitor.component.scss'],
})
export class YigMonitorComponent implements OnInit {
  @ViewChild('myEmail1FileInput') myEmail1FileInput: ElementRef | undefined;
  @ViewChild('myEmail2FileInput') myEmail2FileInput: ElementRef | undefined;
  @ViewChild('myEmail3FileInput') myEmail3FileInput: ElementRef | undefined;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  loading = false;
  noPermission = true;

  email1Fileloading = false;
  email2Fileloading = false;
  email3Fileloading = false;

  commentsDisplay = false;

  apiURL = environment.apiURLs.file_api_URL;
  yigDefId = environment.webConfig.yigDefId;
  yigFileUrl = environment.external_urls.s3_Yig;
  yigResultUrl = environment.apiURLs.yig_api_URL;

  results: any[] | undefined;
  selectedApplication: any = {};

  user: any = null;
  token: string = '';

  statusOptions: any[];
  degrees: any[];

  readonly = true;

  reviewerNum: number = 0;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private membershipService: MembershipService,
    private userInfoService: UserInfoService,
    private kseaInfoService: KseaInfoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient
  ) {
    this.statusOptions = [
      { label: 'Submitted', value: 'Submitted' },
      { label: 'Complete', value: 'Complete' },
      { label: 'Incomplete', value: 'Incomplete' },
    ];

    this.degrees = [
      { name: 'BA', value: 'BA' },
      { name: 'BS', value: 'BS' },
      { name: 'Master', value: 'Master' },
      { name: 'Ph.D.', value: 'Ph.D.' },
    ];
  }

  ngOnInit(): void {
    this.loading = true;

    this.cognitoService
      .getUser()
      .then((user: any) => {
        this.user = user;
        if (this.user) {
          this.cognitoService.getToken().then((sdata) => {
            this.token = sdata.accessToken.jwtToken;

            if (environment.yigMonitors.includes(this.user.attributes.email)) {
              this.noPermission = false;
              this.getAllYIGResults();
            } else {
              this.noPermission = true;
              this.loading = false;
            }
          });
        } else {
          this.router.navigateByUrl('/signIn?next=yigMonitor');
        }
      })
      .catch(() => {
        this.router.navigateByUrl('/signIn?next=yigMonitor');
      });
  }

  getAllYIGResults() {
    this.http
      .get<any>(this.yigResultUrl + '/ksea-yig/result', this.httpOptions)
      .subscribe((res) => {
        this.results = res.Items;
        if (res.LastEvaluatedKey) {
          this.getNextYIGResults(res.LastEvaluatedKey.id);
        } else {
          this.loading = false;
        }
      });
  }

  getNextYIGResults(key: string) {
    this.http
      .get<any>(
        this.yigResultUrl + '/ksea-yig/result/next/' + key,
        this.httpOptions
      )
      .subscribe((res) => {
        if (this.results) this.results = [...this.results, ...res.Items];
        else this.results = res.Items;

        if (res.LastEvaluatedKey) {
          this.getNextYIGResults(res.LastEvaluatedKey.id);
        } else {
          this.loading = false;
        }
      });
  }

  mergeAddress(address: string, city: string, state: string, zip: string) {
    let fullAddress = '';
    if (address) fullAddress = fullAddress + address;
    if (city) fullAddress = fullAddress + ' ' + city;
    if (state) fullAddress = fullAddress + ' ' + state;
    if (zip) fullAddress = fullAddress + ' ' + zip;
    return fullAddress;
  }

  downloadCSV() {
    // let data = '2023 KSEA yig Sheet\n';
    // data += 'Date:,' + new Date() + '\n\n';
    // data += 'Postdoctor' + '\n';
    // data +=
    //   'Username,First Name,Last Name,Phone Number,Address,Email' +
    //   this.headerForReviewer() +
    //   '\n';
    // this.postDocs?.forEach((item) => {
    //   data += this.replaceCSVValue(item.id);
    //   data += ',' + this.replaceCSVValue(item.firstName);
    //   data += ',' + this.replaceCSVValue(item.lastName);
    //   data += ',' + this.replaceCSVValue(item.phoneNumber);
    //   data += ',' + this.replaceCSVValue(item.address);
    //   data += ',' + this.replaceCSVValue(item.email);
    //   data += this.evaluationForReviewers(item);
    //   data += '\n';
    // });
    // data += '\n\n\n';
    // data += 'Graduate' + '\n';
    // data +=
    //   'Username,First Name,Last Name,Phone Number,Address,Email' +
    //   this.headerForReviewer() +
    //   '\n';
    // this.gradDocs?.forEach((item) => {
    //   data += this.replaceCSVValue(item.id);
    //   data += ',' + this.replaceCSVValue(item.firstName);
    //   data += ',' + this.replaceCSVValue(item.lastName);
    //   data += ',' + this.replaceCSVValue(item.phoneNumber);
    //   data += ',' + this.replaceCSVValue(item.address);
    //   data += ',' + this.replaceCSVValue(item.email);
    //   data += this.evaluationForReviewers(item);
    //   data += '\n';
    // });
    // data += '\n\n\n';
    // data += 'Undergraduate' + '\n';
    // data +=
    //   'Username,First Name,Last Name,Phone Number,Address,Email' +
    //   this.headerForReviewer() +
    //   '\n';
    // this.underDocs?.forEach((item) => {
    //   data += this.replaceCSVValue(item.id);
    //   data += ',' + this.replaceCSVValue(item.firstName);
    //   data += ',' + this.replaceCSVValue(item.lastName);
    //   data += ',' + this.replaceCSVValue(item.phoneNumber);
    //   data += ',' + this.replaceCSVValue(item.address);
    //   data += ',' + this.replaceCSVValue(item.email);
    //   data += this.evaluationForReviewers(item);
    //   data += '\n';
    // });
    // data += '\n\n\n';
    // const a = document.createElement('a');
    // const blob = new Blob([data]);
    // const url = window.URL.createObjectURL(blob);
    // a.href = url;
    // a.download = '2023 yig.csv';
    // a.click();
    // window.URL.revokeObjectURL(url);
    // a.remove();
  }

  editComments(application: any) {
    this.selectedApplication = application;
    if (!application.comments) application.comments = '';
    this.commentsDisplay = true;
  }

  closeComments() {
    this.http
      .put<any>(
        this.yigResultUrl + '/ksea-yig/result',
        JSON.stringify(this.selectedApplication),
        this.httpOptions
      )
      .subscribe((res) => {
        this.commentsDisplay = false;
      });
  }

  addEmailFile(event: any, application: any, num: number) {
    console.log(application, num);
    if (num === 1) application.email1URLLoading = true;
    else if (num === 2) application.email2URLLoading = true;
    else if (num === 3) application.email3URLLoading = true;
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      this.token
    );

    const param = {
      bucket: 'ksea-yig',
      username: application.id,
      defId: this.yigDefId,
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
          application.email1URLLoading = false;
          application.email2URLLoading = false;
          application.email3URLLoading = false;
          if (num === 1) {
            application.email1URL =
              this.yigFileUrl +
              this.yigDefId +
              '/' +
              application.id +
              '/' +
              res.filename;
          } else if (num === 2) {
            application.email2URL =
              this.yigFileUrl +
              this.yigDefId +
              '/' +
              application.id +
              '/' +
              res.filename;
          } else if (num === 3) {
            application.email3URL =
              this.yigFileUrl +
              this.yigDefId +
              '/' +
              application.id +
              '/' +
              res.filename;
          }

          this.http
            .put<any>(
              this.yigResultUrl + '/ksea-yig/result',
              JSON.stringify(application),
              this.httpOptions
            )
            .subscribe((res) => {});

          if (this.myEmail1FileInput)
            this.myEmail1FileInput.nativeElement.value = '';
          if (this.myEmail2FileInput)
            this.myEmail2FileInput.nativeElement.value = '';
          if (this.myEmail3FileInput)
            this.myEmail3FileInput.nativeElement.value = '';
        });
      });
  }
}
