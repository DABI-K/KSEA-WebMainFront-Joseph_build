import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { get } from 'http';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CognitoService } from 'src/app/service/cognito.service';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { MembershipService } from 'src/app/service/membership.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import { environment } from 'src/environments/environment';

interface EvaluationCriteria {
  academicPerformance: number;
  curriculumVitae: number;
  recommendationLetters: number;
  kseaActivities: number;
  essay: number;
}
interface Evaluation {
  [key: number]: EvaluationCriteria;
}
// 기존 selectedApplication 인터페이스 확장
interface Application {
  evaluations: Evaluation;
  // 기타 기존 속성
}
// 평가 항목 초기화
const emptyEvaluationCriteria: EvaluationCriteria = {
  academicPerformance: 0,
  curriculumVitae: 0,
  recommendationLetters: 0,
  kseaActivities: 0,
  essay: 0,
};

@Component({
  selector: 'app-scholarship-monitor',
  templateUrl: './scholarship-monitor.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: [
    '../../../../../css/common.scss',
    './scholarship-monitor.component.scss',
  ],
})
export class ScholarshipMonitorComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  loading = false;
  display = false;

  summaryViewerDisplay = false;
  recommendersViewerDisplay = false;
  gpaInfoViewerDisplay = false;
  actionDisplay = false;
  phoneEditDisaplay = false;
  addressEditDisaplay = false;
  evaluationDisaplay = false;

  apiURL = environment.apiURLs.file_api_URL;
  scholarshipDefId = environment.webConfig.scholarshipDefId;
  scholarshipFileUrl = environment.external_urls.s3_Scholarship;
  scholarshipResultUrl = environment.apiURLs.scholarship_api_URL;

  results: any[] | undefined;
  postDocs: any[] | undefined;
  gradDocs: any[] | undefined;
  underDocs: any[] | undefined;
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
    this.display = false;

    this.postDocs = [];

    this.cognitoService
      .getUser()
      .then((user: any) => {
        this.user = user;
        if (this.user) {
          this.cognitoService.getToken().then((sdata) => {
            this.token = sdata.accessToken.jwtToken;

            if (
              environment.scholarshipMonitors.includes(
                this.user.attributes.email
              ) ||
              environment.scholarshipEvaluator.includes(
                this.user.attributes.email
              )
            ) {
              if (
                environment.scholarshipMonitors.includes(
                  this.user.attributes.email
                )
              )
                this.readonly = false;
              if (
                environment.scholarshipEvaluator.includes(
                  this.user.attributes.email
                )
              ) {
                this.readonly = true;
                this.reviewerNum =
                  environment.scholarshipEvaluator.indexOf(
                    this.user.attributes.email
                  ) + 1;
                console.log(this.reviewerNum);
              }

              this.getAllScholarshipResults();
            }
          });
        } else {
          this.router.navigateByUrl('/signIn?next=scholarship-monitor');
        }
      })
      .catch(() => {
        this.router.navigateByUrl('/signIn?next=scholarship-monitor');
      });
  }

  getAllScholarshipResults() {
    this.http
      .get<any>(
        this.scholarshipResultUrl + '/ksea-scholarship/result',
        this.httpOptions
      )
      .subscribe((res) => {
        this.results = res.Items;

        if (res.LastEvaluatedKey) {
          this.getNextScholarshipResults(res.LastEvaluatedKey.id);
        } else {
          this.postDocs = this.results?.filter(
            (item) =>
              item.answers && item.answers[0] === 'Postdoctor scholarship'
          );

          this.gradDocs = this.results?.filter(
            (item) => item.answers && item.answers[0] === 'Graduate scholarship'
          );

          this.underDocs = this.results?.filter(
            (item) =>
              item.answers && item.answers[0] === 'Undergraduate scholarship'
          );

          this.adjustList(this.postDocs);
          this.adjustList(this.gradDocs);
          this.adjustList(this.underDocs);
          this.loading = false;
        }
      });
  }
  getNextScholarshipResults(key: string) {
    this.http
      .get<any>(
        this.scholarshipResultUrl + '/ksea-scholarship/result/next/' + key,
        this.httpOptions
      )
      .subscribe((res) => {
        if (this.results) this.results = [...this.results, ...res.Items];
        else this.results = res.Items;

        if (res.LastEvaluatedKey) {
          this.getNextScholarshipResults(res.LastEvaluatedKey.id);
        } else {
          this.postDocs = this.results?.filter(
            (item) =>
              item.answers && item.answers[0] === 'Postdoctor scholarship'
          );

          this.gradDocs = this.results?.filter(
            (item) => item.answers && item.answers[0] === 'Graduate scholarship'
          );

          this.underDocs = this.results?.filter(
            (item) =>
              item.answers && item.answers[0] === 'Undergraduate scholarship'
          );

          this.adjustList(this.postDocs);
          this.adjustList(this.gradDocs);
          this.adjustList(this.underDocs);
          this.loading = false;
        }
      });
  }

  adjustList(result: any[] | undefined) {
    console.log(result);
    if (result) {
      result.forEach((item) => {
        if (!item.firstName && item.userInfo.given_name)
          item.firstName = item.userInfo.given_name;
        if (!item.lastName && item.userInfo.family_name)
          item.lastName = item.userInfo.family_name;
        if (!item.email && item.userInfo.email)
          item.email = item.userInfo.email;
        if (!item.username && item.id) item.username = item.id;
        if (!item.phoneNumber && item.userInfo.phone_number)
          item.phoneNumber = item.userInfo.phone_number;
        if (!item.address)
          item.address = this.mergeAddress(
            item.userInfo.address,
            item.userInfo['custom:city'],
            item.userInfo['custom:state'],
            item.userInfo['custom:zipcode']
          );
      });
    }
  }

  mergeAddress(address: string, city: string, state: string, zip: string) {
    let fullAddress = '';
    if (address) fullAddress = fullAddress + address;
    if (city) fullAddress = fullAddress + ' ' + city;
    if (state) fullAddress = fullAddress + ' ' + state;
    if (zip) fullAddress = fullAddress + ' ' + zip;
    return fullAddress;
  }
  //기존코드
  downloadCSV() {
    let data = '2024 KSEA Scholarship Sheet\n';
    data += 'Date:,' + new Date().toLocaleString() + '\n\n';

    const getRecommenderLinks = (recommenders: any[] = []): string => {
      return recommenders.map((rec: any) => this.replaceCSVValue(rec.fileURL)).concat(Array(3).fill('')).slice(0, 3).join(',');
    };

    const createGradeColumns = (grades: any[] = []) => {
      let gradeData = '';
      for (let i = 0; i < 5; i++) {
        if (grades[i] && grades[i].degree && grades[i].graudationYear) {
          gradeData += ",'" + this.replaceCSVValue(grades[i].averageGPA) + "'"; // 작은 따옴표로 감쌈
          gradeData += ',' + this.replaceCSVValue(grades[i].degree.name);
          gradeData += ",'" + this.replaceCSVValue(grades[i].graudationYear) + "'"; // 작은 따옴표로 감쌈
          gradeData += ',' + this.replaceCSVValue(grades[i].major);
          gradeData += ',' + this.replaceCSVValue(grades[i].schoolName);
          gradeData += ',' + this.replaceCSVValue(grades[i].schoolAddress);
          gradeData += ',' + this.replaceCSVValue(grades[i].officialTranscript);
          gradeData += ',' + this.replaceCSVValue(grades[i].transcript);
        } else {
          gradeData += ',,,,,,,,';
        }
      }
      return gradeData;
    };

    data += 'Postdoctor' + '\n';
    data +=
      'Username,First Name,Last Name,Phone Number,Address,Email,Essay,CV Link,Recommender 1,Recommender 2,Recommender 3' +
      ',Average GPA 1,Degree 1,Graduation Year 1,Major 1,School Name 1,School Address 1,Official Transcript 1,Transcript 1' +
      ',Average GPA 2,Degree 2,Graduation Year 2,Major 2,School Name 2,School Address 2,Official Transcript 2,Transcript 2' +
      ',Average GPA 3,Degree 3,Graduation Year 3,Major 3,School Name 3,School Address 3,Official Transcript 3,Transcript 3' +
      ',Average GPA 4,Degree 4,Graduation Year 4,Major 4,School Name 4,School Address 4,Official Transcript 4,Transcript 4' +
      ',Average GPA 5,Degree 5,Graduation Year 5,Major 5,School Name 5,School Address 5,Official Transcript 5,Transcript 5' +
      this.headerForReviewer() +
      '\n';

    this.postDocs?.forEach((item) => {
      data += this.replaceCSVValue(item.id);
      data += ',' + this.replaceCSVValue(item.firstName);
      data += ',' + this.replaceCSVValue(item.lastName);
      data += ',' + this.replaceCSVValue(item.phoneNumber);
      data += ',' + this.replaceCSVValue(item.address);
      data += ',' + this.replaceCSVValue(item.email);
      data += ',' + this.replaceCSVValue(item.answers[2]);
      data += ',' + this.replaceCSVValue(item.cvURL);
      data += ',' + getRecommenderLinks(item.recommenders);
      data += createGradeColumns(item.grades || []);
      data += this.evaluationForReviewers(item);
      data += '\n';
    });
    data += '\n\n\n';

    data += 'Graduate' + '\n';
    data +=
      'Username,First Name,Last Name,Phone Number,Address,Email,Essay,CV Link,Recommender 1,Recommender 2,Recommender 3' +
      ',Average GPA 1,Degree 1,Graduation Year 1,Major 1,School Name 1,School Address 1,Official Transcript 1,Transcript 1' +
      ',Average GPA 2,Degree 2,Graduation Year 2,Major 2,School Name 2,School Address 2,Official Transcript 2,Transcript 2' +
      ',Average GPA 3,Degree 3,Graduation Year 3,Major 3,School Name 3,School Address 3,Official Transcript 3,Transcript 3' +
      ',Average GPA 4,Degree 4,Graduation Year 4,Major 4,School Name 4,School Address 4,Official Transcript 4,Transcript 4' +
      ',Average GPA 5,Degree 5,Graduation Year 5,Major 5,School Name 5,School Address 5,Official Transcript 5,Transcript 5' +
      this.headerForReviewer() +
      '\n';

    this.gradDocs?.forEach((item) => {
      data += this.replaceCSVValue(item.id);
      data += ',' + this.replaceCSVValue(item.firstName);
      data += ',' + this.replaceCSVValue(item.lastName);
      data += ',' + this.replaceCSVValue(item.phoneNumber);
      data += ',' + this.replaceCSVValue(item.address);
      data += ',' + this.replaceCSVValue(item.email);
      data += ',' + this.replaceCSVValue(item.answers[2]);
      data += ',' + this.replaceCSVValue(item.cvURL);
      data += ',' + getRecommenderLinks(item.recommenders);
      data += createGradeColumns(item.grades || []);
      data += this.evaluationForReviewers(item);
      data += '\n';
    });
    data += '\n\n\n';

    data += 'Undergraduate' + '\n';
    data +=
      'Username,First Name,Last Name,Phone Number,Address,Email,Essay,CV Link,Recommender 1,Recommender 2,Recommender 3' +
      ',Average GPA 1,Degree 1,Graduation Year 1,Major 1,School Name 1,School Address 1,Official Transcript 1,Transcript 1' +
      ',Average GPA 2,Degree 2,Graduation Year 2,Major 2,School Name 2,School Address 2,Official Transcript 2,Transcript 2' +
      ',Average GPA 3,Degree 3,Graduation Year 3,Major 3,School Name 3,School Address 3,Official Transcript 3,Transcript 3' +
      ',Average GPA 4,Degree 4,Graduation Year 4,Major 4,School Name 4,School Address 4,Official Transcript 4,Transcript 4' +
      ',Average GPA 5,Degree 5,Graduation Year 5,Major 5,School Name 5,School Address 5,Official Transcript 5,Transcript 5' +
      this.headerForReviewer() +
      '\n';

    this.underDocs?.forEach((item) => {
      data += this.replaceCSVValue(item.id);
      data += ',' + this.replaceCSVValue(item.firstName);
      data += ',' + this.replaceCSVValue(item.lastName);
      data += ',' + this.replaceCSVValue(item.phoneNumber);
      data += ',' + this.replaceCSVValue(item.address);
      data += ',' + this.replaceCSVValue(item.email);
      data += ',' + this.replaceCSVValue(item.answers[2]);
      data += ',' + this.replaceCSVValue(item.cvURL);
      data += ',' + getRecommenderLinks(item.recommenders);
      data += createGradeColumns(item.grades || []);
      data += this.evaluationForReviewers(item);
      data += '\n';
    });
    data += '\n\n\n';

    const a = document.createElement('a');
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = '2024 Scholarship.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }


  replaceCSVValue(innerValue: string) {
    innerValue = innerValue ? innerValue : '';
    let result = innerValue.replace(/"/g, '""');
    if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
    return result;
  }
  

  getRecommenderLinks(recommenders: any[] = []): string {
    return recommenders.map((rec: any) => this.replaceCSVValue(rec.fileURL)).concat(Array(3).fill('')).slice(0, 3).join(',');
  }
  


  // 기존코드  되는코드
  // headerForReviewer() {
  //   let header = '';
  //   environment.scholarshipEvaluator.forEach((reviewer, index) => {
  //     header += ',Reviewer #' + (index + 1);
  //   });
  //   header += ',AVG';
  //   return header;
  // }

  headerForReviewer() {
    let header = '';
    for (let i = 1; i <= 9; i++) {
      header += `,Reviewer #${i} Academic Performance,Reviewer #${i} CV,Reviewer #${i} Recommendation Letters,Reviewer #${i} KSEA Activities,Reviewer #${i} Essay,Reviewer #${i} Average`;
    }
    header += ',Overall Average';
    return header;
  }
  

  // 기존코드
  // evaluationForReviewers(item: any) {
  //   let evaluation = '';
  //   let valued: number[] = [];
  //   environment.scholarshipEvaluator.forEach((reviewer, index) => {
  //     if (item.evaluations) {
  //       if (item.evaluations[index + 1]) {
  //         evaluation += ',' + item.evaluations[index + 1];
  //         valued.push(item.evaluations[index + 1]);
  //       } else {
  //         evaluation += ',';
  //       }
  //     } else {
  //       evaluation += ',';
  //     }
  //   });
  //   evaluation += ',' + eval(valued.join('+')) / valued.length;
  //   return evaluation;
  // }

  evaluationForReviewers(item: any) {
    let evaluation = '';
    let totalScores: number[] = [];
    let overallAverage = 0;
  
    for (let i = 1; i <= 9; i++) {
      const criteria = item.evaluations ? item.evaluations[i] : null;
      if (criteria) {
        const totalScore = criteria.academicPerformance +
          criteria.curriculumVitae +
          criteria.recommendationLetters +
          criteria.kseaActivities +
          criteria.essay;
  
        const averageScore = totalScore / 5;
        evaluation += `,${criteria.academicPerformance},${criteria.curriculumVitae},${criteria.recommendationLetters},${criteria.kseaActivities},${criteria.essay},${averageScore}`;
        totalScores.push(totalScore);
      } else {
        evaluation += ',,,,,,';
      }
    }
  
    if (totalScores.length > 0) {
      overallAverage = totalScores.reduce((a, b) => a + b, 0) / totalScores.length;
    }
    evaluation += `,${overallAverage}`;
    return evaluation;
  }
  
  viewSummary(application: any) {
    this.summaryViewerDisplay = true;
    this.selectedApplication = application;
  }

  viewRecommenders(application: any) {
    this.recommendersViewerDisplay = true;
    this.selectedApplication = application;
  }

  viewGPAInfo(application: any) {
    this.gpaInfoViewerDisplay = true;
    this.selectedApplication = application;
  }

  viewAction(application: any) {
    this.actionDisplay = true;
    this.selectedApplication = application;
  }

  addRecFile(event: any, rec: any) {
    rec.recFileloading = true;
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      this.token
    );
    const param = {
      bucket: 'ksea-scholarship',
      username: this.selectedApplication.id,
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
            this.selectedApplication.id +
            '/' +
            res.filename;

          this.http
            .put<any>(
              this.scholarshipResultUrl + '/ksea-scholarship/result',
              JSON.stringify(this.selectedApplication),
              this.httpOptions
            )
            .subscribe((res) => { });
        });
      });
  }

  addTranscriptFile(event: any, gra: any) {
    gra.transcriptFileloading = true;
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      this.token
    );
    const param = {
      bucket: 'ksea-scholarship',
      username: this.selectedApplication.id,
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
          gra.transcriptFileloading = undefined;
          gra.officialTranscript =
            this.scholarshipFileUrl +
            this.scholarshipDefId +
            '/' +
            this.selectedApplication.id +
            '/' +
            res.filename;

          this.http
            .put<any>(
              this.scholarshipResultUrl + '/ksea-scholarship/result',
              JSON.stringify(this.selectedApplication),
              this.httpOptions
            )
            .subscribe((res) => { });
        });
      });
  }

  saveAndSendEmail() {
    if (!this.readonly && (this.selectedApplication.status === 'Complete' || this.selectedApplication.status === 'Incomplete')) {
      this.http
        .put<any>(
          this.scholarshipResultUrl + '/ksea-scholarship/result',
          JSON.stringify(this.selectedApplication),
          this.httpOptions
        )

        .subscribe((res) => {
          const emailData = {
            toEmails: [this.selectedApplication.userInfo.email],
            subject: 'KSEA Scholarship 2024 - Application Status Updated',
            htmlMessage: `
            <p>Dear applicant,</p>
              <p>${this.selectedApplication.status === 'Incomplete' ? 'Your application is marked as incomplete.<br>To proceed, kindly review your submission for any missing information and update accordingly.<br>' : '<p>Your application is complete.</p><p>Thank you for submitting all the required information.<p>'}</p>
              <p>Status Notes: ${this.selectedApplication.statusNotes}</p>
              <p>Please check details from our website: <a href="https://www.ksea.org/scholarshipApply">https://www.ksea.org/scholarshipApply</a></p>
              <p>Thank you,</p>
              <p>KSEA Scholarship Committee</p>
              `
          };
          //original w. mistake: <p>Dear ${this.user.attributes.given_name},</p> This shows the reviewer's 1st name


          this.http
            .post<any>(
              environment.apiURLs.email_api_URL + '/sendSimpleEmail',
              JSON.stringify(emailData),
              this.httpOptions
            )
            .subscribe((res) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Email Sent',
                detail:
                  "The admin notes have been sent via applicant's email",
              });
              this.actionDisplay = false;
            });
        });
    } else {
      this.actionDisplay = false;
    }
  }

  cancelAction() {
    this.actionDisplay = false;
    window.location.reload();
  }

  wordCount(text: string) {
    if (text) return text.split(' ').length;
    return 0;
  }

  closeSummary() {
    this.summaryViewerDisplay = false;
    if (!this.readonly) {
      this.http
        .put<any>(
          this.scholarshipResultUrl + '/ksea-scholarship/result',
          JSON.stringify(this.selectedApplication),
          this.httpOptions
        )
        .subscribe((res) => { });
    }
  }

  showEditPhoneNumber(application: any) {
    this.selectedApplication = application;
    this.phoneEditDisaplay = true;
  }

  showEditAddressNumber(application: any) {
    this.selectedApplication = application;
    this.addressEditDisaplay = true;
  }


  //기존코드
  // showEvaluation(application: any) {
  //   this.selectedApplication = application;
  //   if (!application.evaluations) application.evaluations = {};
  //   this.evaluationDisaplay = true;
  // }
  showEvaluation(application: any) {
    this.selectedApplication = application;
    if (!application.evaluations) application.evaluations = {};
    if (!application.evaluations[this.reviewerNum]) {
      application.evaluations[this.reviewerNum] = {
        academicPerformance: 0,
        curriculumVitae: 0,
        recommendationLetters: 0,
        kseaActivities: 0,
        essay: 0,
      };
    }
    this.evaluationDisaplay = true;
  }


  closeEditPhoneNumber() {
    this.phoneEditDisaplay = false;
    if (!this.readonly) {
      this.http
        .put<any>(
          this.scholarshipResultUrl + '/ksea-scholarship/result',
          JSON.stringify(this.selectedApplication),
          this.httpOptions
        )
        .subscribe((res) => { });
    }
  }

  closeEditAddressNumber() {
    this.addressEditDisaplay = false;
    if (!this.readonly) {
      this.http
        .put<any>(
          this.scholarshipResultUrl + '/ksea-scholarship/result',
          JSON.stringify(this.selectedApplication),
          this.httpOptions
        )
        .subscribe((res) => { });
    }
  }
  //기존 코드
  // closeEvaluation() {
  //   this.evaluationDisaplay = false;
  //   this.http
  //     .put<any>(
  //       this.scholarshipResultUrl + '/ksea-scholarship/result',
  //       JSON.stringify(this.selectedApplication),
  //       this.httpOptions
  //     )
  //     .subscribe((res) => { });
  // }
  closeEvaluation() {
    this.evaluationDisaplay = false;
    this.http
      .put<any>(
        this.scholarshipResultUrl + '/ksea-scholarship/result',
        JSON.stringify(this.selectedApplication),
        this.httpOptions
      )
      .subscribe((res) => { });
  }
  gpaEditClose() {
    this.gpaInfoViewerDisplay = false;
    if (!this.readonly) {
      this.http
        .put<any>(
          this.scholarshipResultUrl + '/ksea-scholarship/result',
          JSON.stringify(this.selectedApplication),
          this.httpOptions
        )
        .subscribe((res) => { });
    }
  }

  removeScope(application: any) {
    application.evaluations[this.reviewerNum] = undefined;
    this.http
      .put<any>(
        this.scholarshipResultUrl + '/ksea-scholarship/result',
        JSON.stringify(application),
        this.httpOptions
      )
      .subscribe((res) => { });
  }



  // 평가 점수 평균값 계산
  getAverageScore(criteria: EvaluationCriteria): number {
    const total = criteria.academicPerformance + criteria.curriculumVitae + criteria.recommendationLetters + criteria.kseaActivities + criteria.essay;
    return total / 5;
  }


}
