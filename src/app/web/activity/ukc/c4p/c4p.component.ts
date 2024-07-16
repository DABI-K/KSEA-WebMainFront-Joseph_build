import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { CognitoService } from 'src/app/service/cognito.service';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { MembershipService } from 'src/app/service/membership.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import { Membership } from 'src/app/shared/membership';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-c4p',
  templateUrl: './c4p.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['../../../../css/common.scss', './c4p.component.scss'],
})
export class C4pComponent implements OnInit {
  @ViewChild('myPaperFileInput') myPaperFileInput: ElementRef | undefined;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  loading = false;
  display = false;
  readOnly = false;
  paperFileloading = false;
  membership: Membership;
  userInfo: any;
  user: any = null;
  token: string = '';
  result: any = {};
  selectedPaper: any = {};
  kseaInfo: any = null;
  preferenceOptions: any[];
  ukcCall4PaperResultUrl = environment.apiURLs.ukc_c4p_api_URL;
  apiURL = environment.apiURLs.file_api_URL;

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
    this.membership = {} as Membership;
    this.preferenceOptions = [
      { label: 'Oral', value: 'Oral' },
      { label: 'Poster', value: 'Poster' },
      { label: 'Either one', value: 'Either one' },
    ];
  }

  ngOnInit(): void {
    this.loading = true;
    this.result = undefined;
    this.display = false;
    this.kseaInfoService.getKSEAInfo().subscribe((res) => {
      this.kseaInfo = res.Item;
      this.kseaInfoService.setKSEAInfo(res);
      console.log(this.kseaInfo);
    });

    this.cognitoService
      .getUser()
      .then((user: any) => {
        this.user = user;
        if (this.user) {
          this.cognitoService.getToken().then((sdata) => {
            this.token = sdata.accessToken.jwtToken;
            this.membershipService
              .getMembership(user.username, this.token)
              .subscribe((data: any) => {
                this.membership = data.Item;

                this.userInfoService
                  .getUserInfo(user.username, this.token)
                  .subscribe((uData: any) => {
                    this.userInfo = uData.Item;
                    this.http
                      .get<any>(
                        this.ukcCall4PaperResultUrl +
                          '/ksea-ukc-c4p/result/' +
                          this.user.username
                      )
                      .subscribe((res) => {
                        if (res && res.Item) this.result = res.Item;
                        if (!this.result) {
                          this.result = {
                            id: user.username,
                            userInfo: this.userInfo,
                            membership: this.membership,
                            userData: this.user.attributes,
                            papers: [],
                          };
                        }
                        this.loading = false;
                      });
                  });
              });
          });
        } else this.router.navigateByUrl('/ukc-signIn?next=ukc-call4paper');
      })
      .catch(() => {
        this.router.navigateByUrl('/ukc-signIn?next=ukc-call4paper');
      });
  }

  newSubmission(event: any) {
    this.readOnly = false;
    this.display = true;
    this.selectedPaper = {};
    this.selectedPaper.preference = 'eitherone';
  }

  addPaperFile(event: any) {
    this.paperFileloading = true;
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      this.token
    );
    const param = {
      bucket: 'ksea-ukc',
      username: this.user.username,
      defId: 'Papers2024',
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
          this.selectedPaper.paperURL =
            environment.external_urls.s3_UKC +
            'Papers2024' +
            '/' +
            this.user.username +
            '/' +
            res.filename;

          if (this.myPaperFileInput)
            this.myPaperFileInput.nativeElement.value = '';
          this.paperFileloading = false;
        });
      });
  }

  checkAndSubmit() {
    const errors = this.verifyResult();

    if (errors.length > 0) {
      errors.forEach((e, i) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Error ' + (i + 1),
          detail: e,
        });
      });
    } else {
      this.selectedPaper.status = 'Submitted';
      this.selectedPaper.date = new Date();
      this.selectedPaper.id =
        this.selectedPaper.group.acronym +
        '_' +
        this.user.username +
        '_' +
        this.selectedPaper.date.getTime();
      this.result.papers.push(this.selectedPaper);

      this.httpOptions.headers =
        this.httpOptions.headers.delete('Authorization');
      this.httpOptions.headers = this.httpOptions.headers.append(
        'Authorization',
        this.token
      );

      this.http
        .put<any>(
          this.ukcCall4PaperResultUrl + '/ksea-ukc-c4p/result',
          JSON.stringify(this.result),
          this.httpOptions
        )
        .subscribe((res) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Submmited',
            detail: 'Paper submitted',
          });
          this.display = false;

          const emailData: any = {
            toEmails: [this.user.attributes.email],
            bccEmails: 'ukc2024@ksea.org',
            subject:
              '[UKC2024]Paper submission confirmation email (' +
              this.selectedPaper.id +
              ')',
            htmlMessage:
              '<p dir="ltr">Dear ' +
              this.user.attributes.given_name +
              ' ' +
              this.user.attributes.family_name +
              '</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Thank you for submitting your paper for UKC 2024. This e-mail confirms your submission as following:&nbsp;</p>\n<p dir="ltr">--------------------------------------------------------------------------------------</p>\n<p dir="ltr">&bull; Paper Submission Number: ' +
              this.selectedPaper.id +
              '</p>\n<p dir="ltr">&bull; Presenter Name: ' +
              this.user.attributes.family_name +
              ', ' +
              this.user.attributes.given_name +
              '</p>\n<p dir="ltr">&bull; Date Submitted: ' +
              this.selectedPaper.date +
              '&nbsp;</p>\n<p dir="ltr">&bull; Selected Symposium Code: ' +
              this.selectedPaper.group.code +
              ', ' +
              this.selectedPaper.group.name +
              '</p>\n<p dir="ltr">&bull; Title: ' +
              this.selectedPaper.title +
              '</p>\n<p dir="ltr">&bull; Presentation Type: ' +
              this.selectedPaper.preference +
              '</p>\n<p dir="ltr">&bull; Paper uploaded URL: ' +
              this.selectedPaper.paperURL +
              '&nbsp;</p>\n<p dir="ltr">--------------------------------------------------------------------------------------</p>\n<p dir="ltr">You will be notified about the acceptance or the need for revisions of your paper once the Chair of your symposium completes the review. <br> If you have any inquiries or issues related to your submission, kindly reach out to the Program Chair at ukc2024@ksea.org.<p dir="ltr"><br>Upon receiving your acceptance confirmation, please ensure to register for UKC 2024 to avail of a registration discount.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Sincerely,&nbsp;</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Ohbong Kwon, UKC 2024 Program Chair</p>\n<p dir="ltr">Jayoung Kim, UKC 2024 Program Co-Chair</p>\n<p dir="ltr">Tae (Tom) Oh, UKC 2024 Conference Chair</p>\n<p dir="ltr">Tae Sik Lee, UKC 2024 Conference Co-Chair</p>\n<p>&nbsp;</p>',
          };

          this.http
            .post<any>(
              environment.apiURLs.email_api_URL + '/sendSimpleEmailWithBCC',
              JSON.stringify(emailData),
              this.httpOptions
            )
            .subscribe((res) => {
              console.log(res);
            });
        });
    }
  }

  verifyResult() {
    let errors = [];
    if (!this.selectedPaper.affiliation)
      errors.push('Affiliation is required.');
    if (!this.selectedPaper.group) errors.push('Group is required.');
    if (!this.selectedPaper.title)
      errors.push('Presentation title is required.');
    if (!this.selectedPaper.summary) errors.push('Summary is required.');
    if (!this.selectedPaper.paperURL) errors.push('Please upload your paper.');

    return errors;
  }

  viewPaper(paper: any) {
    this.selectedPaper = paper;
    this.display = true;
    this.readOnly = true;
  }

  withdrawPaper(paper: any) {
    this.confirmationService.confirm({
      message: 'Do you want to withdraw this paper?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        paper.status = 'withdrawn';
        paper.isConfirmed = true;
        this.http
          .put<any>(
            this.ukcCall4PaperResultUrl + '/ksea-ukc-c4p/result',
            JSON.stringify(this.result),
            this.httpOptions
          )
          .subscribe((res) => {
            const emailData: any = {
              toEmails: [this.user.attributes.email],
              bccEmails: 'ukc2024@ksea.org',
              subject:
                '[UKC2024]Paper submission withdrawn email(' + paper.id + ')',
              htmlMessage:
                '<p dir="ltr">Dear ' +
                this.user.attributes.given_name +
                ' ' +
                this.user.attributes.family_name +
                '</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">We have received your request to withdraw the paper titled "' +
                this.selectedPaper.title +
                '" from consideration for presentation at UKC2024.</p>\n<p dir="ltr">-------------------------------------------------------------------------------------------</p>\n<p dir="ltr">&bull; Paper Submission Number: ' +
                this.selectedPaper.id +
                '</p>\n<p dir="ltr">&bull; Presenter Name: ' +
                this.user.attributes.family_name +
                ', ' +
                this.user.attributes.given_name +
                '</p>\n<p dir="ltr">&bull; Date Submitted: ' +
                this.selectedPaper.date +
                '&nbsp;</p>\n<p dir="ltr">&bull; Selected Symposium Code: ' +
                this.selectedPaper.group.code +
                ', ' +
                this.selectedPaper.group.name +
                '</p>\n<p dir="ltr">&bull; Title: ' +
                this.selectedPaper.title +
                '</p>\n<p dir="ltr">&bull; Presentation Type: ' +
                this.selectedPaper.preference +
                '</p>\n<p dir="ltr">&bull; Paper uploaded URL: ' +
                this.selectedPaper.paperURL +
                '&nbsp;</p>\n<p dir="ltr">-------------------------------------------------------------------------------------------</p>\n<p dir="ltr">We acknowledge and respect your decision. Your Withdrawal has been processed, and the paper has been removed from our review system. If you have any further questions or concerns, please contact us via ukc2024@ksea.org. Thank you for your interest in UKC 2024, and we hope to see your submissions in the future.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Sincerely,&nbsp;</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Ohbong Kwon, UKC 2024 Program Chair</p>\n<p dir="ltr">Jayoung Kim, UKC 2024 Program Co-Chair</p>\n<p dir="ltr">Tae (Tom) Oh, UKC 2024 Conference Chair</p>\n<p dir="ltr">Tae Sik Lee, UKC 2024 Conference Co-Chair</p>\n<p>&nbsp;</p>',
            };

            this.http
              .post<any>(
                environment.apiURLs.email_api_URL + '/sendSimpleEmail',
                JSON.stringify(emailData),
                this.httpOptions
              )
              .subscribe((res) => {
                console.log(res);
              });
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Paper withdrawn',
            });
            this.display = false;
          });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      },
    });
  }

  specificFilter(array: any[]) {
    array.forEach((item) => (item.label = '(' + item.code + ') ' + item.name));
    return array.filter((item) => item.code !== 'D-2');
  }
}
