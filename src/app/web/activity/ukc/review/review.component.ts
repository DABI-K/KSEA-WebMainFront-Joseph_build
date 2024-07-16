import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { CognitoService } from 'src/app/service/cognito.service';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['../../../../css/common.scss', './review.component.scss'],
})
export class ReviewComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  loading = false;
  display = false;
  readOnly = false;
  summaryViewerDisplay = false;
  reviewerDisplay = false;
  paperFileloading = false;
  user: any = null;
  token: string = '';
  selectedSummary: string = '';
  results: any[] | undefined;
  listPapers: any[] | undefined;
  selectedPaper: any = {};
  selectedApplication: any = {};
  kseaInfo: any = null;
  preferenceOptions: any[];
  statusOptions: any[];
  ukcCall4PaperResultUrl = environment.apiURLs.ukc_c4p_api_URL;
  apiURL = environment.apiURLs.file_api_URL;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private kseaInfoService: KseaInfoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient
  ) {
    this.preferenceOptions = [
      { label: 'Oral', value: 'Oral' },
      { label: 'Poster', value: 'Poster' },
      { label: 'Either one', value: 'Either one' },
    ];

    this.statusOptions = [
      { label: 'Submitted', value: 'Submitted' },
      { label: 'Rejected', value: 'Rejected' },
      { label: 'Accepted', value: 'Accepted' },
      { label: 'Transfered', value: 'Transfered' },
    ];
  }

  ngOnInit(): void {
    this.loading = true;
    this.display = false;
    this.summaryViewerDisplay = false;
    this.reviewerDisplay = false;
    this.results = undefined;
    this.listPapers = [];
    this.kseaInfoService.getKSEAInfo().subscribe((res) => {
      this.kseaInfo = res.Item;
      this.kseaInfoService.setKSEAInfo(res);
    });

    this.cognitoService
      .getUser()
      .then((user: any) => {
        this.user = user;
        if (this.user) {
          const list = environment.ukcReviewers.filter(
            (item) => item.email === this.user.attributes.email
          );

          if (list.length === 1) {
            const filters: any[] = list[0].keys;
            console.log(filters);
            this.cognitoService.getToken().then((sdata) => {
              this.token = sdata.accessToken.jwtToken;

              this.getAllResults(filters);
            });
          }
        } else this.router.navigateByUrl('/signIn?next=ukc-review');
      })
      .catch(() => {
        this.router.navigateByUrl('/signIn?next=ukc-review');
      });
  }
  getAllResults(filters: any[]) {
    this.http
      .get<any>(this.ukcCall4PaperResultUrl + '/ksea-ukc-c4p/result')
      .subscribe((res) => {
        if (res && res.Items && res.Items.length > 0) {
          this.results = res.Items;

          if (res.LastEvaluatedKey) {
            this.getNextResults(res.LastEvaluatedKey.id, filters);
          } else {
            this.popItems(filters);
          }
        }
        this.loading = false;
      });
  }
  getNextResults(lastEvaluatedKey: string, filters: any[]) {
    this.http
      .get<any>(
        this.ukcCall4PaperResultUrl +
          '/ksea-ukc-c4p/result/next/' +
          lastEvaluatedKey
      )
      .subscribe((res) => {
        if (this.results) this.results = [...this.results, ...res.Items];
        else this.results = res.Items;

        if (res.LastEvaluatedKey) {
          this.getNextResults(res.LastEvaluatedKey.id, filters);
        } else {
          this.popItems(filters);
        }
      });
  }

  popItems(filters: any[]) {
    this.listPapers = [];
    this.results?.forEach((item) => {
      if (item.papers)
        item.papers.forEach((p: any) => {
          const doc: any = {};
          doc.paper = p;
          doc.username = item.id;
          doc.membership = item.membership;
          doc.userData = item.userData;
          doc.userInfo = item.userInfo;

          console.log(doc.paper.group.acronym);

          if (filters.includes(doc.paper.group.acronym))
            this.listPapers?.push(doc);
        });
    });
  }

  viewSummary(summary: string) {
    this.summaryViewerDisplay = true;
    this.selectedSummary = summary;
  }

  reviewPaper(paper: any, application: any) {
    this.reviewerDisplay = true;
    this.selectedPaper = paper;
    this.selectedApplication = application;
  }

  confirmPaper() {
    const application = this.selectedApplication;
    this.confirmationService.confirm({
      message: 'Do you want to confirm the descision for this paper?',
      header: 'Descision Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (application.paper.status === 'Transfered') {
          if (!application.paper.transferTo) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Transfer error',
              detail: 'Transfer To (TG) is required.',
            });
          } else {
            const found = this.results?.filter(
              (item) => item.id === application.username
            );

            if (found && found.length > 0) {
              application.paper.isConfirmed = true;
              let clone = JSON.parse(JSON.stringify(application.paper));
              clone.isConfirmed = false;
              clone.group = application.paper.transferTo;
              clone.status = 'Submitted';

              found[0].papers.push(clone);
              this.http
                .put<any>(
                  this.ukcCall4PaperResultUrl + '/ksea-ukc-c4p/result',
                  JSON.stringify(found[0]),
                  this.httpOptions
                )
                .subscribe((res) => {
                  this.messageService.add({
                    severity: 'info',
                    summary: 'Transfered',
                    detail: 'The paper is transfered.',
                  });

                  this.loading = true;
                  this.display = false;
                  this.summaryViewerDisplay = false;
                  this.reviewerDisplay = false;
                  this.results = undefined;
                  this.listPapers = [];

                  this.http
                    .get<any>(
                      this.ukcCall4PaperResultUrl + '/ksea-ukc-c4p/result'
                    )
                    .subscribe((res) => {
                      if (res && res.Items && res.Items.length > 0) {
                        this.results = res.Items;
                        this.listPapers = [];
                        this.results?.forEach((item) => {
                          if (item.papers)
                            item.papers.forEach((p: any) => {
                              const doc: any = {};
                              doc.paper = p;
                              doc.username = item.id;
                              doc.membership = item.membership;
                              doc.userData = item.userData;
                              doc.userInfo = item.userInfo;

                              this.listPapers?.push(doc);
                            });
                        });
                      }
                      this.loading = false;
                      this.reviewerDisplay = false;
                    });
                });
            }
          }
        } else {
          if (application.paper.preference === 'Either one') {
            this.messageService.add({
              severity: 'warn',
              summary: 'Type error',
              detail: 'Type should be Oral or Poster.',
            });
          } else if (application.paper.status === 'Submitted') {
            this.messageService.add({
              severity: 'warn',
              summary: 'Status error',
              detail: 'The status should be Accecpted or Rejected.',
            });
          } else if (
            !application.paper.notes ||
            application.paper.notes.trim() === ''
          ) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Notes error',
              detail: 'The descision note is required.',
            });
          } else {
            const found = this.results?.filter(
              (item) => item.id === application.username
            );

            if (found && found.length > 0) {
              application.paper.isConfirmed = true;
              this.http
                .put<any>(
                  this.ukcCall4PaperResultUrl + '/ksea-ukc-c4p/result',
                  JSON.stringify(found[0]),
                  this.httpOptions
                )
                .subscribe((res) => {
                  let emailData: any = {};
                  if (application.paper.status === 'Accepted') {
                    emailData = {
                      toEmails: [application.userData.email],
                      bccEmails: 'ukc2024@ksea.org',
                      subject:
                        '[UKC2024]Paper acceptance email – ' +
                        application.paper.preference +
                        ' presentation (' +
                        application.paper.id +
                        ')',
                      htmlMessage:
                        '<p dir="ltr">Dear ' +
                        application.userData.given_name +
                        ' ' +
                        application.userData.family_name +
                        '</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">We are pleased to inform you that your paper (' +
                        application.paper.id +
                        ') titled &ldquo;' +
                        application.paper.title +
                        '&ldquo; has been accepted for ' +
                        application.paper.preference +
                        ' presentation at UKC 2024 to be held during Aug 21 &ndash; 24, 2024 at the Hyatt Regency SF Airport, CA.&nbsp;</p>\n<p dir="ltr">Additional information regarding presentation schedule and conference registration will be notified later. Please use the paper number noted above for any future inquiries.</p>\n<p dir="ltr">We look forward to welcoming you to UKC 2024 in August 2024. If you have questions or concerns, please contact us via ukc2024@ksea.org.</p>\n<p dir="ltr">&nbsp;</p>\n<p dir="ltr">Sincerely,&nbsp;</p>\n<p dir="ltr">&nbsp;</p>\n<p dir="ltr">Ohbong Kwon, UKC 2024 Program Chair</p>\n<p dir="ltr">Jayoung Kim, UKC 2024 Program Co-Chair</p>\n<p dir="ltr">Tae(Tom) Oh, UKC 2024 Conference Chair</p>\n<p dir="ltr">Tae Sik Lee, UKC 2024 Conference Co-Chair</p>\n<p>&nbsp;</p>',
                    };
                  } else {
                    emailData = {
                      toEmails: [application.userData.email],
                      bccEmails: 'ukc2024@ksea.org',
                      subject:
                        '[UKC2024]Paper rejection email (' + application.paper.id + ')',
                      htmlMessage:
                        '<p dir="ltr">Dear ' +
                        application.userData.given_name +
                        ' ' +
                        application.userData.family_name +
                        '</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Thank you for submitting your paper (' +
                        application.paper.id +
                        ') titled &ldquo;' +
                        application.paper.title +
                        '&rdquo; to UKC 2024. Symposium Chairs have reviewed your submission, and we appreciate the effort and time you have invested in your work. However, after careful evaluation, we regret to inform you that your paper has not been accepted for presentation.</p>\n<p dir="ltr">We received numerous submissions this year, and the competition was exceptionally high. Unfortunately, we cannot accept all the submissions we receive.</p>\n<p dir="ltr">We appreciate your interest in UKC 2024 and thank you again for submitting your work. We wish you the best of luck with your future research endeavors.&nbsp;</p>\n<p dir="ltr">&nbsp;</p>\n<p dir="ltr">Sincerely,&nbsp;</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Ohbong Kwon, UKC 2024 Program Chair</p>\n<p dir="ltr">Jayoung Kim, UKC 2024 Program Co-Chair</p>\n<p dir="ltr">Tae(Tom) Oh, UKC 2024 Conference Chair</p>\n<p dir="ltr">Tae Sik Lee, UKC 2024 Conference Co-Chair</p>\n<p>&nbsp;</p>',
                    };
                  }

                  this.http
                    .post<any>(
                      environment.apiURLs.email_api_URL + '/sendSimpleEmail',
                      JSON.stringify(emailData),
                      this.httpOptions
                    )
                    .subscribe((res) => {
                      this.messageService.add({
                        severity: 'info',
                        summary: 'Confirmed',
                        detail: 'The paper is confirmed.',
                      });
                      console.log(res);
                      this.reviewerDisplay = false;
                    });
                });
            }
          }
        }
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

  downloadCSV() {
    if (this.listPapers) {
      let data = '2024 UKC Paper Submission\n';
      data += 'Date:,' + new Date() + '\n\n';
      data +=
        'Submission ID,Name,Affiliation,Email,Group,Title,Summary,Paper URL,Date,Type,Status,Notes\n';
      for (const application of this.listPapers) {
        data +=
          this.replaceCSVValue(application.paper.id) +
          ',' +
          this.replaceCSVValue(
            application.userData.family_name +
              ', ' +
              application.userData.given_name
          ) +
          ',' +
          this.replaceCSVValue(application.paper.affiliation) +
          ',' +
          this.replaceCSVValue(application.userData.email) +
          ',' +
          this.replaceCSVValue(application.paper.group.acronym) +
          ',' +
          this.replaceCSVValue(application.paper.title) +
          ',' +
          this.replaceCSVValue(application.paper.summary) +
          ',' +
          this.replaceCSVValue(application.paper.paperURL) +
          ',' +
          this.replaceCSVValue(application.paper.date) +
          ',' +
          this.replaceCSVValue(application.paper.preference) +
          ',' +
          this.replaceCSVValue(application.paper.status) +
          ',' +
          this.replaceCSVValue(application.paper.notes) +
          '\n';
      }
      const a = document.createElement('a');
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = '2024 UKC Paper Submission.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }
  }

  replaceCSVValue(innerValue: string) {
    innerValue = innerValue ? innerValue : '';
    let result = innerValue.replace(/"/g, '""');
    if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
    return result;
  }

  specificFilter(array: any[]) {
    return array.filter((item) => item.code !== 'D-2');
  }

  realodPage() {
    window.location.reload();
  }
}
