import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/service/cognito.service';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { MembershipService } from 'src/app/service/membership.service';
import { Membership } from 'src/app/shared/membership';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-apply-scholarship-application',
  templateUrl: './apply-scholarship-application.component.html',
  styleUrls: [
    '../../../../css/common.scss',
    './apply-scholarship-application.component.scss',
  ],
})
export class ApplyScholarshipApplicationComponent implements OnInit {
  @ViewChild('myTranscriptFileInput') myInputVariable: ElementRef | undefined;
  @ViewChild('myCVFileInput') myCVFileInput: ElementRef | undefined;
  @ViewChild('myDOCFileInput') myDOCFileInput: ElementRef | undefined;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  loading = false;
  transcriptFileloading = false;
  cvFileloading = false;
  eviFileloading = false;
  apiURL = environment.apiURLs.file_api_URL;
  scholarshipDefId = environment.webConfig.scholarshipDefId;
  scholarshipFileUrl = environment.external_urls.s3_Scholarship;
  scholarshipResultUrl = environment.apiURLs.scholarship_api_URL;
  scholarshipDef: any;
  membership: Membership;
  user: any = null;
  token: string = '';
  result: any = {};
  newRecommender: any = {};
  newGrade: any = {};

  statusOptions: any[];
  degrees: any[];
  flagNew: boolean = true;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private membershipService: MembershipService,
    private kseaInfoService: KseaInfoService,
    private http: HttpClient
  ) {
    this.membership = {} as Membership;
    this.statusOptions = [
      { label: 'Complete', value: 'Complete' },
      { label: 'Incomplete', value: 'Incomplete' },
    ];
    this.degrees = [
      { name: 'BA', value: 'BA' },
      { name: 'BS', value: 'BS' },
      { name: 'Master', value: 'Master' },
      { name: 'Ph.D', value: 'Ph.D' },
    ];
  }

  ngOnInit(): void {
    this.loading = false;
    this.result = {};
    this.result.answers = [];
    this.result.recommenders = [];
    this.result.grades = [];
    this.newRecommender = {};
    this.newGrade = {};
    this.kseaInfoService.getEventDef(this.scholarshipDefId).subscribe((res) => {
      this.scholarshipDef = res.Item;
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
              });
          });

          this.http
            .get<any>(
              this.scholarshipResultUrl +
              '/ksea-scholarship/result/' +
              this.user.username
            )
            .subscribe((res) => {
              if (res && res.Item) this.result = res.Item;

              if (!this.result.firstName) this.flagNew = true;
              else this.flagNew = false;

              if (!this.result.firstName && this.user.attributes.given_name)
                this.result.firstName = this.user.attributes.given_name;
              if (!this.result.lastName && this.user.attributes.family_name)
                this.result.lastName = this.user.attributes.family_name;
              if (!this.result.email && this.user.attributes.email)
                this.result.email = this.user.attributes.email;
              if (!this.result.username && this.user.username)
                this.result.username = this.user.username;
              if (!this.result.phoneNumber && this.user.attributes.phone_number)
                this.result.phoneNumber = this.user.attributes.phone_number;
              if (!this.result.address)
                this.result.address = this.mergeAddress(
                  this.user.attributes.address,
                  this.user.attributes['custom:city'],
                  this.user.attributes['custom:state'],
                  this.user.attributes['custom:zipcode']
                );
            });
        } else this.router.navigateByUrl('/signIn?next=scholarshipApply');
      })
      .catch(() => {
        this.router.navigateByUrl('/signIn?next=scholarshipApply');
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

  verifyResult() {
    let errors = [];
    if (!this.result.firstName) errors.push('First Name is required.');
    if (!this.result.lastName) errors.push('Last Name is required.');
    if (!this.result.phoneNumber) errors.push('Phone Number is required.');
    if (!this.result.address) errors.push('Address is required.');
    if (!this.result.answers || !this.result.answers[0])
      errors.push('Scholarship type is required.');
    if (!this.result.answers || !this.result.answers[1])
      errors.push('Student type is required.');
    if (!this.result.answers || !this.result.answers[2])
      errors.push('Essay is required.');
    if (this.result.answers && this.wordCount(this.result.answers[2]) > 800)
      errors.push('The number of esssy words exceeds 800');
    if (!this.result.cvURL) errors.push('CV is required.');
    if (!this.result.cvURL) errors.push('CV is required.');
    if (
      this.result.answers &&
      this.result.answers[0] === 'Postdoctor scholarship' &&
      !this.result.doctorURL
    )
      errors.push('Evidence of Doctorial is required.');

    if (
      this.result.answers &&
      (this.result.answers[0] === 'Undergraduate scholarship' ||
        this.result.answers[0] === 'Graduate scholarship') &&
      (!this.result.grades || this.result.grades.length === 0)
    )
      errors.push('One or more GPA info is required. Please press the "ADD" button after providing the information.');
    if (!this.result.recommenders || this.result.recommenders.length === 0)
      errors.push('One or more recommenders info is required. Please press the "ADD" button after providing the information.');

    return errors;
  }

  submit() {
    this.loading = true;

    if (this.verifyResult().length > 0) {
      let errorMessage = '';

      for (let error of this.verifyResult()) {
        errorMessage = errorMessage + '\n * ' + error;
      }
      alert(
        'Your scholarship application cannot be processed. Please check the following error(s): ' +
        errorMessage
      );

      this.loading = false;
    } else {
      this.result.id = this.user.username;
      this.result.userInfo = this.user.attributes;

      if (
        this.result.answers &&
        this.result.answers[0] === 'Postdoctor scholarship'
      ) {
        this.result.grades = undefined;
      }

      if (
        this.result.answers &&
        (this.result.answers[0] === 'Undergraduate scholarship' ||
          this.result.answers[0] === 'Graduate scholarship')
      ) {
        this.result.doctorURL = undefined;
      }

      this.httpOptions.headers =
        this.httpOptions.headers.delete('Authorization');
      this.httpOptions.headers = this.httpOptions.headers.append(
        'Authorization',
        this.token
      );

      console.log(this.result);

      if (this.result.recommenders) {
        this.result.recommenders.forEach((item: any) => {
          this.http
            .get(
              'https://ksea-files.s3.us-west-2.amazonaws.com/emailTemplates/RequestRecommendationLetter.html',
              {
                responseType: 'text',
              }
            )
            .subscribe((data) => {
              const htmlContents = data
                .split('$NAME$')
                .join(item.title + ' ' + item.name)
                .split('$GRANTEE$')
                .join(this.result.firstName + ' ' + this.result.lastName)
                .split('$URL$')
                .join(
                  'https://www.ksea.org/scholarshipRecommender?id=' +
                  this.result.id +
                  '&email=' +
                  item.email
                );

              const emailData: any = {
                toEmails: [item.email, 'scholarship@ksea.org'],
                subject:
                  'Request for recommendation letter for KSEA Scholarship/KSEA Postdoctoral Fellowship for ' +
                  this.result.firstName + ' ' + this.result.lastName,
                htmlMessage: htmlContents,
              };

              this.http
                .post<any>(
                  environment.apiURLs.email_api_URL + '/sendSimpleEmail',
                  JSON.stringify(emailData),
                  this.httpOptions
                )
                .subscribe((res) => { });
            });
        });
      }

      this.http
        .put<any>(
          this.scholarshipResultUrl + '/ksea-scholarship/result',
          JSON.stringify(this.result),
          this.httpOptions
        )
        .subscribe((res) => {
          this.sendConfirmationEmail();
          alert(
            'Your scholarship application has been submitted. This window will be closed.'
          );
          this.loading = false;
          //window.close();
          window.location.reload();
        });
    }
  }
  sendConfirmationEmail() {
    const emailData = {
      toEmails: [this.user.attributes.email],  // 사용자 이메일 주소
      subject: 'Your KSEA Scholarship Application Submission',
      htmlMessage: `
        <p>Dear ${this.user.attributes.given_name},</p>
        <p>Your KSEA scholarship application has been successfully submitted.</p>
        <p>Please check details from our website: <a href="https://www.ksea.org/scholarshipApply">https://www.ksea.org/scholarshipApply</a></p>
        <p>Thank you,</p>
        <p>KSEA Scholarship Committee</p>
      `
    };

    this.http.post<any>(environment.apiURLs.email_api_URL + '/sendSimpleEmail', JSON.stringify(emailData), this.httpOptions)
      .subscribe({
        next: (response) => {
          console.log('Confirmation email sent successfully.');
        },
        error: (error) => {
          console.error('Error sending confirmation email:', error);
        }
      });
  }

  delRecommender(item: any) {
    this.result.recommenders = this.result.recommenders.filter((obj: any) => {
      return obj !== item;
    });
  }
  addRecommender() {
    this.result.recommenders.push(
      JSON.parse(JSON.stringify(this.newRecommender))
    );
    this.newRecommender = {};
  }
  delGrade(item: any) {
    this.result.grades = this.result.grades.filter((obj: any) => {
      return obj !== item;
    });
  }
  addGrade() {
    this.result.grades.push(JSON.parse(JSON.stringify(this.newGrade)));
    this.newGrade = {};
    if (this.myInputVariable) this.myInputVariable.nativeElement.value = '';
  }

  wordCount(text: string) {
    if (text) return text.split(' ').length;
    return 0;
  }
  addCVFile(event: any) {
    this.cvFileloading = true;
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      this.token
    );
    const param = {
      bucket: 'ksea-scholarship',
      username: this.user.username,
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
          this.result.cvURL =
            this.scholarshipFileUrl +
            this.scholarshipDefId +
            '/' +
            this.user.username +
            '/' +
            res.filename;

          if (this.myCVFileInput) this.myCVFileInput.nativeElement.value = '';
          this.cvFileloading = false;
        });
      });
  }

  addDoctoralFile(event: any) {
    this.eviFileloading = true;
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      this.token
    );
    const param = {
      bucket: 'ksea-scholarship',
      username: this.user.username,
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
          this.result.doctorURL =
            this.scholarshipFileUrl +
            this.scholarshipDefId +
            '/' +
            this.user.username +
            '/' +
            res.filename;
          if (this.myDOCFileInput) this.myDOCFileInput.nativeElement.value = '';
          this.eviFileloading = false;
        });
      });
  }

  addTranscriptFile(event: any) {
    this.transcriptFileloading = true;
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      this.token
    );
    const param = {
      bucket: 'ksea-scholarship',
      username: this.user.username,
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
          this.newGrade.transcript =
            this.scholarshipFileUrl +
            this.scholarshipDefId +
            '/' +
            this.user.username +
            '/' +
            res.filename;
          this.transcriptFileloading = false;
        });
      });
  }
}
