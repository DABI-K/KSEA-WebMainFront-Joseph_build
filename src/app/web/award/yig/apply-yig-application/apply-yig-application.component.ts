import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/service/cognito.service';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { MembershipService } from 'src/app/service/membership.service';
import { Membership } from 'src/app/shared/membership';
import { environment } from '../../../../../environments/environment';
import { bool } from 'aws-sdk/clients/signer';


@Component({
  selector: 'app-apply-yig-application',
  templateUrl: './apply-yig-application.component.html',
  styleUrls: [
    '../../../../css/common.scss',
    './apply-yig-application.component.scss',
  ],
})
export class ApplyYigApplicationComponent implements OnInit {
  @ViewChild('myTranscriptFileInput') myInputVariable: ElementRef | undefined;
  @ViewChild('myCVFileInput') myCVFileInput: ElementRef | undefined;
  @ViewChild('myDOCFileInput') myDOCFileInput: ElementRef | undefined;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  loading = false;
  cvFileloading = false;
  apiURL = environment.apiURLs.file_api_URL;
  yigDefId = environment.webConfig.yigDefId;
  emailCC = environment.webConfig.emailCC;
  yigFileUrl = environment.external_urls.s3_Yig;
  yigResultUrl = environment.apiURLs.yig_api_URL;
  yigDef: any;
  membership: Membership;
  user: any = null;
  token: string = '';
  result: any = {};
  flag: boolean = false;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private membershipService: MembershipService,
    private kseaInfoService: KseaInfoService,
    private http: HttpClient
  ) {
    this.membership = {} as Membership;
  }

  ngOnInit(): void {
    this.loading = false;
    this.result = {};
    this.result.answers = [];
    this.result.grades = [];
    this.kseaInfoService.getEventDef(this.yigDefId).subscribe((res) => {
      this.yigDef = res.Item;
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
              this.yigResultUrl + '/ksea-yig/result/' + this.user.username
            )
            .subscribe((res) => {
              if (res && res.Item) this.result = res.Item;
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

              if (this.result.fileURL) this.flag = true;
            });
        } else this.router.navigateByUrl('/signIn?next=yigApply');
      })
      .catch(() => {
        this.router.navigateByUrl('/signIn?next=yigApply');
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
      errors.push('TG is required.');
    if (!this.result.answers || !this.result.answers[1])
      errors.push('Application Field is required.');
    if (!this.result.fileURL) errors.push('Aplication PDF is required.');
    if (!this.result.firstRecommenderEmail)
      errors.push('The 1st Recommender Email is required.');
    if (!this.result.secondRecommenderEmail)
      errors.push('The 2nd Recommender Email is required.');
    if (!this.result.thirdRecommenderEmail)
      errors.push('The 3rd Recommender Email is required.');

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
        'Your scholarship application cannot be processed. Please check the error(s): ' +
          errorMessage
      );

      this.loading = false;
    } else {
      this.result.id = this.user.username;
      this.result.userInfo = this.user.attributes;

      this.httpOptions.headers =
        this.httpOptions.headers.delete('Authorization');
      this.httpOptions.headers = this.httpOptions.headers.append(
        'Authorization',
        this.token
      );

      let subject = '';
      let emailTemplateURL = '';
      if (!this.flag) {
        subject =
          'Confirmation - 2024 KSEA Young Investigator Grants Application';
        emailTemplateURL =
          'https://ksea-files.s3.us-west-2.amazonaws.com/emailTemplates/YIG_RegistrationConfirmation-2.html';
      } else {
        subject =
          'Confirmation - 2024 KSEA Young Investigator Grants Application Edit';
        emailTemplateURL =
          'https://ksea-files.s3.us-west-2.amazonaws.com/emailTemplates/YIG_RegistrationEditConfirmation-1.html';
      }

      this.http
        .put<any>(
          this.yigResultUrl + '/ksea-yig/result',
          JSON.stringify(this.result),
          this.httpOptions
        )
        .subscribe((res) => {
          alert('Your YIG application has been submitted.');

          this.http
            .get(emailTemplateURL, {
              responseType: 'text',
            })
            .subscribe((data) => {
              const htmlContents = data
                .split('$NAME$')
                .join(this.result.lastName + ', ' + this.result.firstName)
                .split('$DATE$')
                .join(new Date().toDateString());

              const emailData: any = {
                toEmails: [this.user.attributes.email, this.emailCC],
                subject: subject,
                htmlMessage: htmlContents,
              };

              this.http
                .post<any>(
                  environment.apiURLs.email_api_URL + '/sendSimpleEmail',
                  JSON.stringify(emailData),
                  this.httpOptions
                )
                .subscribe((res) => {
                  this.loading = false;
                });
            });
        });
    }
  }

  addApplicationFile(event: any) {
    this.cvFileloading = true;
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      this.token
    );
    const param = {
      bucket: 'ksea-yig',
      username: this.user.username,
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
          this.result.fileURL =
            this.yigFileUrl +
            this.yigDefId +
            '/' +
            this.user.username +
            '/' +
            res.filename;

          if (this.myCVFileInput) this.myCVFileInput.nativeElement.value = '';
          this.cvFileloading = false;
        });
      });
  }

  isMembershipExpired() {
    if (this.membership && this.membership.expirationDate) {
      const expirationDateNum = new Date(
        this.membership.expirationDate
      ).getTime();
      const todayNum = new Date().getTime();

      if (todayNum > expirationDateNum) return true;
    }
    return false;
  }
}
