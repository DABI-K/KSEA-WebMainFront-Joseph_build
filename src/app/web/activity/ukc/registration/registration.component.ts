import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Membership } from 'src/app/shared/membership';
import {
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { CognitoService } from 'src/app/service/cognito.service';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { MembershipService } from 'src/app/service/membership.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import { environment } from '../../../../../environments/environment';
import { PaymentService } from 'src/app/service/payment.service';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['../../../../css/common.scss', './registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  membership: Membership;
  loading = false;
  paymentLoading = false;
  display = false;
  readOnly = false;
  registration: any = {};
  kseaInfo: any = null;
  userInfo: any;
  selectedItem: any;
  user: any = null;
  token: string = '';
  titleOptions: any[];
  groupsList: any[];
  countryOptions: any[];
  levelOptions: any[];
  booleanOptions: any[];
  errorMessage: any;
  stepNum = 0;
  ukcRegistrationUrl = environment.apiURLs.ukc_registration_api_URL;
  mobileDisplay = true;

  public innerWidth: any;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private membershipService: MembershipService,
    private userInfoService: UserInfoService,
    private kseaInfoService: KseaInfoService,
    private paymentService: PaymentService,
    private stripeService: StripeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient
  ) {
    this.membership = {} as Membership;
    this.titleOptions = [
      { label: 'Prof.', value: 'Prof.' },
      { label: 'Dr.', value: 'Dr.' },
      { label: 'Mr.', value: 'Mr.' },
      { label: 'Ms.', value: 'Ms.' },
    ];

    this.groupsList = [
      { name: 'NONE', acronym: 'NONE' },
      { name: 'A-1. Physics', acronym: 'PHY' },
      { name: 'A-2. Chemistry', acronym: 'CHM' },
      {
        name: 'A-3. Mathematics, Geology, Meteorology, Statistics',
        acronym: 'MAS',
      },
      {
        name: 'B-1. Medical Science, Pharmaceutical Science, Veterinary Medicine, Physical Education',
        acronym: 'MPS',
      },
      { name: 'B-2. Agriculture, Ecology, Food, Nutrition', acronym: 'FAN' },
      {
        name: 'B-3. Biological and Biomedical Sciences (Biology, Molecular Biology, Cognitive Science, Botany, Zoology, Biomechanics, etc.)',
        acronym: 'BAB',
      },
      {
        name: 'C-1. Bioengineering and Biomedical Engineering',
        acronym: 'BME',
      },
      {
        name: 'C-2. Chemical, Textile, Energy, and Nuclear Engineering',
        acronym: 'CHE',
      },
      {
        name: 'C-3. Mechanical, Aerospace, and Naval Engineering',
        acronym: 'MAN',
      },
      {
        name: 'C-4. Materials Science and Engineering, Nanotechnology',
        acronym: 'MSE',
      },
      {
        name: 'C-5. Civil and Environmental Engineering, Architecture',
        acronym: 'CEA',
      },
      { name: 'C-6. Electrical and Computer Engineering', acronym: 'ECE' },
      { name: 'C-7. Computer and Information Sciences', acronym: 'CIT' },
      {
        name: 'C-8. Industrial, Manufacturing, and Systems Engineering, Management Sciences, Operations Research ',
        acronym: 'IMS',
      },
      {
        name: 'D-1. Education Research, STEM, and Social Sciences',
        acronym: 'ESS',
      },
      {
        name: 'D-2. Technology Entrepreneurship, Financial Engineering, Business Management, Law involving Science and Engineering',
        acronym: 'ENG',
      },
      { name: 'FIRE. Fostering Innovation in Rising Experts', acronym: 'FIR' },
      {
        name: 'IES. Innovation and Entrepreneurship Symposium',
        acronym: 'IES',
      },
    ];

    this.countryOptions = [
      { label: 'United States', value: 'United States' },
      { label: 'Korea, Republic of', value: 'Korea, Republic of' },
      { label: 'Australia', value: 'Australia' },
      { label: 'Austria', value: 'Austria' },
      { label: 'Belgium', value: 'Belgium' },
      { label: 'Canada', value: 'Canada' },
      { label: 'France', value: 'France' },
      { label: 'Germany', value: 'Germany' },
      { label: 'Greece', value: 'Greece' },
      { label: 'Italy', value: 'Italy' },
      { label: 'Japan', value: 'Japan' },
      { label: 'Netherlands', value: 'Netherlands' },
      { label: 'Norway', value: 'Norway' },
      { label: 'Russia', value: 'Russia' },
      { label: 'Spain', value: 'Spain' },
      { label: 'Sweden', value: 'Sweden' },
      { label: 'Switzerland', value: 'Switzerland' },
      { label: 'Turkey', value: 'Turkey' },
      { label: 'Ukraine', value: 'Ukraine' },
      { label: 'United Kingdom', value: 'United Kingdom' },
      { label: 'Uzbekistan', value: 'Uzbekistan' },
      { label: 'Other', value: 'Other' },
    ];

    this.levelOptions = [
      { label: 'Regular', value: 'Regular' },
      { label: 'Postdoc ', value: 'Postdoc' },
      { label: 'Graduate', value: 'Graduate' },
      { label: 'Undergraduate', value: 'Undergraduate' },
    ];

    this.booleanOptions = [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ];
  }

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'auto',
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.loading = true;
    this.registration = undefined;
    this.display = false;
    this.mobileDisplay = false;

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
                if (!this.membership) {
                  this.membership = {} as Membership;
                  this.membership.id = user.username;
                  this.membership.type = 'Unpaid';
                  this.membership.email = user.attributes.email;
                }

                if (!this.membership.customerId) {
                  this.paymentService
                    .createCustomer(
                      user.username,
                      user.attributes.email,
                      this.token
                    )
                    .subscribe((customerData: any) => {
                      this.membership.customerId = customerData.id;
                      this.membershipService
                        .createMembership(this.membership, this.token)
                        .subscribe();
                    });
                }

                this.userInfoService
                  .getUserInfo(user.username, this.token)
                  .subscribe((uData: any) => {
                    this.userInfo = uData.Item;
                    this.http
                      .get<any>(
                        this.ukcRegistrationUrl +
                          '/ksea-ukc/registration/' +
                          this.user.username
                      )
                      .subscribe((res) => {
                        if (res && res.Item) this.registration = res.Item;
                        if (!this.registration) {
                          this.registration = {
                            id: user.username,
                            userInfo: this.userInfo,
                            membership: this.membership,
                            userData: this.user.attributes,
                            list: [],
                          };
                        }
                        // this.registration.specialDiscountCode =
                        //   this.checkCode();
                        this.checkCode();
                        this.registration.userInfo = this.userInfo;
                        this.registration.membership = this.membership;
                        this.registration.userData = this.user.attributes;
                        //this.registration.numberOfCodes = this.getNumberOfCodes();
                        // this.registration.isOnline =
                        //   environment.ukc2023RegistrationConfig.isOnline;
                        // this.registration.isEarlyBird =
                        //   environment.ukc2023RegistrationConfig.isEarlyBird;
                        //this.registration.isOnline = this.selectedItem.isOnline;
                        //this.registration.isEarlyBird = this.selectedItem.isEarlyBird;
                        // this.registration.isUKCPresenter =
                        //   this.checkUKCPresenter();
                        // this.registration.isFIREPresenter =
                        //   this.checkFIREPresenter();
                        this.registration.hasMembership = this.hasMembership();

                        this.loading = false;
                      });
                  });
              });
          });
        } else this.router.navigateByUrl('/ukc-signIn?next=ukc-registration');
      })
      .catch(() => {
        this.router.navigateByUrl('/ukc-signIn?next=ukc-registration');
      });
  }

  newRegistration(event: any) {
    this.readOnly = false;
    if (this.innerWidth < 750) {
      this.mobileDisplay = true;
    } else {
      this.display = true;
    }
    this.selectedItem = {};
    this.selectedItem.level = 'Regular';
    this.selectedItem.isFire = false;
    this.selectedItem.isSeed = false;
    this.selectedItem.isIES = false;
    this.selectedItem.isYGF = false;
    this.selectedItem.isSNU = false;
    this.selectedItem.thursday_breakfast = 0;
    this.selectedItem.friday_breakfast = 0;
    this.selectedItem.saturday_breakfast = 0;
    this.selectedItem.thursday_lunch_Chicken = 0;
    this.selectedItem.thursday_lunch_beef = 0;
    this.selectedItem.thursday_lunch_vegan = 0;
    this.selectedItem.friday_lunch_beef = 0;
    this.selectedItem.friday_lunch_fish = 0;
    this.selectedItem.friday_lunch_vegan = 0;
    this.selectedItem.thursday_dinner_gala_beef = 0;
    this.selectedItem.thursday_dinner_gala_fish = 0;
    this.selectedItem.thursday_dinner_gala_vegan = 0;
    this.selectedItem.friday_dinner_network_beef = 0;
    this.selectedItem.friday_dinner_network_pork = 0;
    this.selectedItem.workshop_regular = 0;
    this.selectedItem.workshop_student = 0;
    this.selectedItem.bus = 0;
    this.selectedItem.programBook = 0;
    this.stepNum = 0;

    this.selectedItem.hasMembership = this.hasMembership();

    // this.selectedItem.isOnline = environment.ukc2023RegistrationConfig.isOnline;
    this.selectedItem.isOnline = this.registration.isOnline;
    // this.selectedItem.isEarlyBird =
    //   environment.ukc2023RegistrationConfig.isEarlyBird;
    this.selectedItem.isEarlyBird = this.registration.isEarlyBird;
    //this.selectedItem.isUKCPresenter = this.checkUKCPresenter();
    this.selectedItem.isUKCPresenter = this.registration.isUKCPresenter;
    //this.selectedItem.isFIREPresenter = this.checkFIREPresenter();
    this.selectedItem.isFIREPresenter = this.registration.isFIREPresenter;
    //this.selectedItem.specialDiscountCode = this.checkCode();
    this.selectedItem.specialDiscountCode =
      this.registration.specialDiscountCode;

    this.selectedItem.date = new Date();
    this.selectedItem.id = this.selectedItem.date.getTime();
  }

  viewRegistration(item: any) {
    this.selectedItem = item;
    if (this.innerWidth < 750) {
      this.mobileDisplay = true;
    } else {
      this.display = true;
    }
    this.readOnly = true;
    this.stepNum = 3;
  }

  downloadReceipt(item: any) {
    this.selectedItem = item;
    if (this.calTotalPrice() > 0) {
      this.http
        .get(
          'https://ksea-files.s3.us-west-2.amazonaws.com/emailTemplates/RegistrationConfirm_priced.html',
          {
            responseType: 'text',
          }
        )
        .subscribe((data) => {
          const htmlContents = data
            .split('$NAME$')
            .join(
              this.selectedItem.title +
                ' ' +
                this.selectedItem.lastName +
                ', ' +
                this.selectedItem.firstName
            )
            .split('$DATE$')
            .join(new Date().toDateString())
            .split('$AMOUNT$')
            .join(
              '' +
                (this.calActPrice() +
                  this.calMealPrice() +
                  this.calRegistrationFee())
            )
            .split('$DISCOUNT$')
            .join(
              '' +
                (this.calActPrice() +
                  this.calMealPrice() +
                  this.calRegistrationFee() -
                  this.calTotalPrice())
            )
            .split('$FEE$')
            .join('' + this.calTotalPrice())
            .split('$LAST4$')
            .join(this.selectedItem.last4);

          const a = document.createElement('a');
          const blob = new Blob([htmlContents]);
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = 'Receipt_' + this.selectedItem.id + '.html';
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        });
    } else {
      this.http
        .get(
          'https://ksea-files.s3.us-west-2.amazonaws.com/emailTemplates/RegistrationConfirm_nopayment.html',
          {
            responseType: 'text',
          }
        )
        .subscribe((data) => {
          const htmlContents = data
            .split('$NAME$')
            .join(
              this.selectedItem.title +
                ' ' +
                this.selectedItem.lastName +
                ', ' +
                this.selectedItem.firstName
            )
            .split('$DATE$')
            .join(new Date().toDateString())
            .split('$AMOUNT$')
            .join(
              '' +
                (this.calActPrice() +
                  this.calMealPrice() +
                  this.calRegistrationFee())
            )
            .split('$DISCOUNT$')
            .join(
              '' +
                (this.calActPrice() +
                  this.calMealPrice() +
                  this.calRegistrationFee() -
                  this.calTotalPrice())
            )
            .split('$FEE$')
            .join('' + this.calTotalPrice());

          const a = document.createElement('a');
          const blob = new Blob([htmlContents]);
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = 'Receipt_' + this.selectedItem.id + '.html';
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        });
    }
  }

  cancelRegistration(item: any) {
    this.confirmationService.confirm({
      message: 'Do you want to request to cancel this registration?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        item.status = 'CancelRequested';
        this.http
          .put<any>(
            this.ukcRegistrationUrl + '/ksea-ukc/registration',
            JSON.stringify(this.registration),
            this.httpOptions
          )
          .subscribe((res) => {
            this.http
              .get(
                'https://ksea-files.s3.us-west-2.amazonaws.com/emailTemplates/2024UKC_CancelRequested.html',
                {
                  responseType: 'text',
                }
              )
              .subscribe((data) => {
                const htmlContents = data
                  .split('$NAME$')
                  .join(
                    item.title + ' ' + item.lastName + ', ' + item.firstName
                  )
                  .split('$ITEMID$')
                  .join(item.id);

                const emailData: any = {
                  toEmails: [this.user.attributes.email, 'finance@ksea.org' ,'it@ksea.org'],
                  subject:
                    'UKC 2024 Registration in San Francisco (' + item.id + ') - CancelRequested',
                  htmlMessage: htmlContents,
                };

                this.http
                  .post<any>(
                    environment.apiURLs.email_api_URL + '/sendSimpleEmail',
                    JSON.stringify(emailData),
                    this.httpOptions
                  )
                  .subscribe((res) => {
                    this.display = false;
                    this.mobileDisplay = false;
                  });
                this.messageService.add({
                  severity: 'info',
                  summary: 'Confirmed',
                  detail: 'Registration cancelRequested.',
                });
              });
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

  calRegistrationFee(): number {
    if (this.selectedItem.isOnline) {
      if (
        this.selectedItem.specialDiscountCode === 'F' &&
        this.selectedItem.level === 'Regular'
      ) {
        return 450;
      }
      if (this.selectedItem.level === 'Regular') return 550;
      if (this.selectedItem.level === 'Postdoc') return 400;
      if (this.selectedItem.level === 'Graduate') return 350;
      if (this.selectedItem.level === 'Undergraduate') return 250;
    } else {
      if (
        this.selectedItem.specialDiscountCode === 'F' &&
        this.selectedItem.level === 'Regular'
      ) {
        return 550;
      }
      if (this.selectedItem.level === 'Regular') return 650;
      if (this.selectedItem.level === 'Postdoc') return 500;
      if (this.selectedItem.level === 'Graduate') return 400;
      if (this.selectedItem.level === 'Undergraduate') return 300;
    }

    return 650;
  }

  calDiscountRegistrationFee() {
    let fee = this.calRegistrationFee();
    if (this.selectedItem.hasMembership) fee = fee - 50;
    if (this.selectedItem.isEarlyBird) fee = fee - 200;
    if (this.selectedItem.isUKCPresenter && !this.selectedItem.isFIREPresenter)
      fee = fee - 100;
    if (!this.selectedItem.isUKCPresenter && this.selectedItem.isFIREPresenter)
      fee = fee - 100;
    if (this.selectedItem.isUKCPresenter && this.selectedItem.isFIREPresenter)
      fee = fee - 100;

    if (this.selectedItem.specialDiscountCode === 'A') return 0;
    if (this.selectedItem.specialDiscountCode === 'B') return 0;
    if (this.selectedItem.specialDiscountCode === 'C') return 0;
    if (this.selectedItem.specialDiscountCode === 'H') return 0;
    if (this.selectedItem.specialDiscountCode === 'G') return 0;
    if (this.selectedItem.specialDiscountCode === 'I') return 0;

    if (fee < 0) return 0;
    else return fee;
  }

  hasMembership() {
    if (
      this.registration &&
      this.registration.membership &&
      this.registration.membership.expirationDate
    ) {
      const current = new Date().getTime();
      const expiration = new Date(
        this.registration.membership.expirationDate
      ).getTime();

      if (expiration > current) return true;
      else {
        if (
          this.registration &&
          this.registration.membership &&
          this.registration.membership.type === 'Lifetime'
        )
          return true;
        else return false;
      }
      return false;
    } else {
      if (
        this.registration &&
        this.registration.membership &&
        this.registration.membership.type === 'Lifetime'
      )
        return true;
      return false;
    }
  }

  calMealPrice() {
    if (!this.selectedItem.thursday_breakfast)
      this.selectedItem.thursday_breakfast = 0;
    if (!this.selectedItem.friday_breakfast)
      this.selectedItem.friday_breakfast = 0;
    if (!this.selectedItem.saturday_breakfast)
      this.selectedItem.saturday_breakfast = 0;

    if (!this.selectedItem.thursday_lunch_Chicken)
      this.selectedItem.thursday_lunch_Chicken = 0;
    if (!this.selectedItem.thursday_lunch_beef)
      this.selectedItem.thursday_lunch_beef = 0;
    if (!this.selectedItem.thursday_lunch_vegan)
      this.selectedItem.thursday_lunch_vegan = 0;

    if (!this.selectedItem.friday_lunch_beef)
      this.selectedItem.friday_lunch_beef = 0;
    if (!this.selectedItem.friday_lunch_fish)
      this.selectedItem.friday_lunch_fish = 0;
    if (!this.selectedItem.friday_lunch_vegan)
      this.selectedItem.friday_lunch_vegan = 0;

    if (!this.selectedItem.thursday_dinner_gala_beef)
      this.selectedItem.thursday_dinner_gala_beef = 0;
    if (!this.selectedItem.thursday_dinner_gala_fish)
      this.selectedItem.thursday_dinner_gala_fish = 0;
    if (!this.selectedItem.thursday_dinner_gala_vegan)
      this.selectedItem.thursday_dinner_gala_vegan = 0;

    if (!this.selectedItem.friday_dinner_network_beef)
      this.selectedItem.friday_dinner_network_beef = 0;
    if (!this.selectedItem.friday_dinner_network_pork)
      this.selectedItem.friday_dinner_network_pork = 0;

    if (this.selectedItem.isOnline) {
      return (
        25 *
          (this.selectedItem.thursday_breakfast +
            this.selectedItem.friday_breakfast +
            this.selectedItem.saturday_breakfast) +
        40 *
          (this.selectedItem.thursday_lunch_Chicken +
            this.selectedItem.thursday_lunch_vegan +
            this.selectedItem.thursday_lunch_beef +
            this.selectedItem.friday_lunch_beef +
            this.selectedItem.friday_lunch_fish +
            this.selectedItem.friday_lunch_vegan) +
        80 *
          (this.selectedItem.thursday_dinner_gala_beef +
            this.selectedItem.thursday_dinner_gala_fish +
            this.selectedItem.thursday_dinner_gala_vegan) +
        30 *
          (this.selectedItem.friday_dinner_network_beef +
            this.selectedItem.friday_dinner_network_pork)
      );
    } else {
      return (
        30 *
          (this.selectedItem.thursday_breakfast +
            this.selectedItem.friday_breakfast +
            this.selectedItem.saturday_breakfast) +
        60 *
          (this.selectedItem.thursday_lunch_Chicken +
            this.selectedItem.thursday_lunch_vegan +
            this.selectedItem.thursday_lunch_beef +
            this.selectedItem.friday_lunch_beef +
            this.selectedItem.friday_lunch_fish +
            this.selectedItem.friday_lunch_vegan) +
        150 *
          (this.selectedItem.thursday_dinner_gala_beef +
            this.selectedItem.thursday_dinner_gala_fish +
            this.selectedItem.thursday_dinner_gala_vegan) +
        100 *
          (this.selectedItem.friday_dinner_network_beef +
            this.selectedItem.friday_dinner_network_pork)
      );
    }
  }

  calDiscountMealPrice() {
    let fee = this.calMealPrice();
    if (
      this.selectedItem.specialDiscountCode === 'A' &&
      this.selectedItem.isOnline
    ) {
      if (this.selectedItem.thursday_breakfast > 0) fee = fee - 25;
      if (this.selectedItem.friday_breakfast > 0) fee = fee - 25;
      if (this.selectedItem.saturday_breakfast > 0) fee = fee - 25;

      if (
        this.selectedItem.thursday_lunch_Chicken +
          this.selectedItem.thursday_lunch_vegan +
          this.selectedItem.thursday_lunch_beef >
        0
      )
        fee = fee - 40;
      if (
        this.selectedItem.friday_lunch_beef +
          this.selectedItem.friday_lunch_fish +
          this.selectedItem.friday_lunch_vegan >
        0
      )
        fee = fee - 40;

      if (
        this.selectedItem.thursday_dinner_gala_beef +
          this.selectedItem.thursday_dinner_gala_fish +
          this.selectedItem.thursday_dinner_gala_vegan >
        0
      )
        fee = fee - 80;

      if (
        this.selectedItem.friday_dinner_network_beef +
          this.selectedItem.friday_dinner_network_pork >
        0
      )
        fee = fee - 30;
    }
    if (
      this.selectedItem.specialDiscountCode === 'A' &&
      !this.selectedItem.isOnline
    ) {
      if (this.selectedItem.thursday_breakfast > 0) fee = fee - 30;
      if (this.selectedItem.friday_breakfast > 0) fee = fee - 30;
      if (this.selectedItem.saturday_breakfast > 0) fee = fee - 30;

      if (
        this.selectedItem.thursday_lunch_Chicken +
          this.selectedItem.thursday_lunch_vegan +
          this.selectedItem.thursday_lunch_beef >
        0
      )
        fee = fee - 60;
      if (
        this.selectedItem.friday_lunch_beef +
          this.selectedItem.friday_lunch_fish +
          this.selectedItem.friday_lunch_vegan >
        0
      )
        fee = fee - 60;

      if (
        this.selectedItem.thursday_dinner_gala_beef +
          this.selectedItem.thursday_dinner_gala_fish +
          this.selectedItem.thursday_dinner_gala_vegan >
        0
      )
        fee = fee - 150;

      if (
        this.selectedItem.friday_dinner_network_beef +
          this.selectedItem.friday_dinner_network_pork >
        0
      )
        fee = fee - 100;
    }

    if (
      this.selectedItem.specialDiscountCode === 'M' &&
      this.selectedItem.isOnline
    ) {
      if (this.selectedItem.thursday_breakfast > 0) fee = fee - 25;
      if (this.selectedItem.friday_breakfast > 0) fee = fee - 25;
      if (this.selectedItem.saturday_breakfast > 0) fee = fee - 25;

      if (
        this.selectedItem.thursday_lunch_Chicken +
          this.selectedItem.thursday_lunch_vegan +
          this.selectedItem.thursday_lunch_beef >
        0
      )
        fee = fee - 40;
      if (
        this.selectedItem.friday_lunch_beef +
          this.selectedItem.friday_lunch_fish +
          this.selectedItem.friday_lunch_vegan >
        0
      )
        fee = fee - 40;

      if (
        this.selectedItem.thursday_dinner_gala_beef +
          this.selectedItem.thursday_dinner_gala_fish +
          this.selectedItem.thursday_dinner_gala_vegan >
        0
      )
        fee = fee - 80;

      if (
        this.selectedItem.friday_dinner_network_beef +
          this.selectedItem.friday_dinner_network_pork >
        0
      )
        fee = fee - 30;
    }
    if (
      this.selectedItem.specialDiscountCode === 'M' &&
      !this.selectedItem.isOnline
    ) {
      if (this.selectedItem.thursday_breakfast > 0) fee = fee - 30;
      if (this.selectedItem.friday_breakfast > 0) fee = fee - 30;
      if (this.selectedItem.saturday_breakfast > 0) fee = fee - 30;

      if (
        this.selectedItem.thursday_lunch_Chicken +
          this.selectedItem.thursday_lunch_vegan +
          this.selectedItem.thursday_lunch_beef >
        0
      )
        fee = fee - 60;
      if (
        this.selectedItem.friday_lunch_beef +
          this.selectedItem.friday_lunch_fish +
          this.selectedItem.friday_lunch_vegan >
        0
      )
        fee = fee - 60;

      if (
        this.selectedItem.thursday_dinner_gala_beef +
          this.selectedItem.thursday_dinner_gala_fish +
          this.selectedItem.thursday_dinner_gala_vegan >
        0
      )
        fee = fee - 150;

      if (
        this.selectedItem.friday_dinner_network_beef +
          this.selectedItem.friday_dinner_network_pork >
        0
      )
        fee = fee - 100;
    }

    if (
      this.selectedItem.specialDiscountCode === 'C' &&
      this.selectedItem.isOnline
    ) {
      if (this.selectedItem.thursday_breakfast > 0) fee = fee - 25;
      if (this.selectedItem.friday_breakfast > 0) fee = fee - 25;
      if (this.selectedItem.saturday_breakfast > 0) fee = fee - 25;

      if (
        this.selectedItem.thursday_lunch_Chicken +
          this.selectedItem.thursday_lunch_vegan +
          this.selectedItem.thursday_lunch_beef >
        0
      )
        fee = fee - 40;
      if (
        this.selectedItem.friday_lunch_beef +
          this.selectedItem.friday_lunch_fish +
          this.selectedItem.friday_lunch_vegan >
        0
      )
        fee = fee - 40;
    }

    if (
      this.selectedItem.specialDiscountCode === 'C' &&
      !this.selectedItem.isOnline
    ) {
      if (this.selectedItem.thursday_breakfast > 0) fee = fee - 30;
      if (this.selectedItem.friday_breakfast > 0) fee = fee - 30;
      if (this.selectedItem.saturday_breakfast > 0) fee = fee - 30;

      if (
        this.selectedItem.thursday_lunch_Chicken +
          this.selectedItem.thursday_lunch_vegan +
          this.selectedItem.thursday_lunch_beef >
        0
      )
        fee = fee - 60;
      if (
        this.selectedItem.friday_lunch_beef +
          this.selectedItem.friday_lunch_fish +
          this.selectedItem.friday_lunch_vegan >
        0
      )
        fee = fee - 60;
    }

    if (
      this.selectedItem.specialDiscountCode === 'G' &&
      this.selectedItem.isOnline
    ) {
      if (
        this.selectedItem.thursday_lunch_Chicken +
          this.selectedItem.thursday_lunch_vegan +
          this.selectedItem.thursday_lunch_beef >
        0
      )
        fee = fee - 40;
      if (
        this.selectedItem.friday_lunch_beef +
          this.selectedItem.friday_lunch_fish +
          this.selectedItem.friday_lunch_vegan >
        0
      )
        fee = fee - 40;

      if (
        this.selectedItem.thursday_dinner_gala_beef +
          this.selectedItem.thursday_dinner_gala_fish +
          this.selectedItem.thursday_dinner_gala_vegan >
        0
      )
        fee = fee - 80;
    }
    if (
      this.selectedItem.specialDiscountCode === 'G' &&
      !this.selectedItem.isOnline
    ) {
      if (
        this.selectedItem.thursday_lunch_Chicken +
          this.selectedItem.thursday_lunch_vegan +
          this.selectedItem.thursday_lunch_beef >
        0
      )
        fee = fee - 60;
      if (
        this.selectedItem.friday_lunch_beef +
          this.selectedItem.friday_lunch_fish +
          this.selectedItem.friday_lunch_vegan >
        0
      )
        fee = fee - 60;

      if (
        this.selectedItem.thursday_dinner_gala_beef +
          this.selectedItem.thursday_dinner_gala_fish +
          this.selectedItem.thursday_dinner_gala_vegan >
        0
      )
        fee = fee - 150;
    }

    if (
      this.selectedItem.specialDiscountCode === 'H' &&
      this.selectedItem.isOnline
    ) {
      if (
        this.selectedItem.thursday_lunch_Chicken +
          this.selectedItem.thursday_lunch_vegan +
          this.selectedItem.thursday_lunch_beef >
        0
      )
        fee = fee - 40;
      if (
        this.selectedItem.friday_lunch_beef +
          this.selectedItem.friday_lunch_fish +
          this.selectedItem.friday_lunch_vegan >
        0
      )
        fee = fee - 40;

      if (
        this.selectedItem.thursday_dinner_gala_beef +
          this.selectedItem.thursday_dinner_gala_fish +
          this.selectedItem.thursday_dinner_gala_vegan >
        0
      )
        fee = fee - 80;

      if (
        this.selectedItem.friday_dinner_network_beef +
          this.selectedItem.friday_dinner_network_pork >
        0
      )
        fee = fee - 30;
    }
    if (
      this.selectedItem.specialDiscountCode === 'H' &&
      !this.selectedItem.isOnline
    ) {
      if (
        this.selectedItem.thursday_lunch_Chicken +
          this.selectedItem.thursday_lunch_vegan +
          this.selectedItem.thursday_lunch_beef >
        0
      )
        fee = fee - 60;
      if (
        this.selectedItem.friday_lunch_beef +
          this.selectedItem.friday_lunch_fish +
          this.selectedItem.friday_lunch_vegan >
        0
      )
        fee = fee - 60;

      if (
        this.selectedItem.thursday_dinner_gala_beef +
          this.selectedItem.thursday_dinner_gala_fish +
          this.selectedItem.thursday_dinner_gala_vegan >
        0
      )
        fee = fee - 150;

      if (
        this.selectedItem.friday_dinner_network_beef +
          this.selectedItem.friday_dinner_network_pork >
        0
      )
        fee = fee - 100;
    }

    if (
      this.selectedItem.specialDiscountCode === 'I' &&
      this.selectedItem.isOnline
    ) {
      if (
        this.selectedItem.thursday_dinner_gala_beef +
          this.selectedItem.thursday_dinner_gala_fish +
          this.selectedItem.thursday_dinner_gala_vegan >
        0
      )
        fee = fee - 80;
    }
    if (
      this.selectedItem.specialDiscountCode === 'I' &&
      !this.selectedItem.isOnline
    ) {
      if (
        this.selectedItem.thursday_dinner_gala_beef +
          this.selectedItem.thursday_dinner_gala_fish +
          this.selectedItem.thursday_dinner_gala_vegan >
        0
      )
        fee = fee - 150;
    }

    if (
      (this.selectedItem.specialDiscountCode === 'D' ||
        this.selectedItem.specialDiscountCode === 'E' ||
        this.selectedItem.specialDiscountCode === 'F') &&
      this.selectedItem.isOnline
    ) {
      if (
        this.selectedItem.friday_dinner_network_beef +
          this.selectedItem.friday_dinner_network_pork >
        0
      )
        fee = fee - 30;
    }

    if (
      (this.selectedItem.specialDiscountCode === 'D' ||
        this.selectedItem.specialDiscountCode === 'E' ||
        this.selectedItem.specialDiscountCode === 'F') &&
      !this.selectedItem.isOnline
    ) {
      if (
        this.selectedItem.friday_dinner_network_beef +
          this.selectedItem.friday_dinner_network_pork >
        0
      )
        fee = fee - 100;
    }

    return fee;
  }

  calActPrice() {
    if (!this.selectedItem.programBook) this.selectedItem.programBook = 0;

    if (this.selectedItem.isOnline) return 10 * this.selectedItem.programBook;
    else return 10 * this.selectedItem.programBook;
  }

  calTotalPrice() {
    return (
      this.calDiscountRegistrationFee() +
      this.calDiscountMealPrice() +
      this.calActPrice()
    );
  }

  payAndSubmit() {
    if (this.calTotalPrice() > 0) {
      this.paymentLoading = true;
      if (this.membership && this.membership.customerId) {
        this.stripeService
          .createToken(this.card.element, { name: this.user.username })
          .subscribe((result) => {
            if (result.token) {
              this.errorMessage = null;
              this.paymentService
                .payOnetime(
                  result.token.id,
                  this.calTotalPrice(),
                  this.user.attributes.email,
                  this.token,
                  '[UKC2024 Registration/Meal]' +
                    '[' +
                    this.selectedItem.id +
                    ']', //+
                  //  this.user.username +
                  //  "'s UKC payment paid: $" +
                  //  this.calTotalPrice(),
                  this.membership.customerId
                )
                .subscribe({
                  next: (paymentResult: any) => {
                    const result = paymentResult;
                    if (result.status === 'succeeded') {
                      this.addRsgistration(result);
                    } else {
                      this.errorMessage = 'The payment is failed.';
                    }
                  },
                  error: (error) => {
                    this.paymentLoading = false;
                    alert(error.error);
                    console.log('oops', error);
                  },
                });
            } else if (result.error) {
              this.paymentLoading = false;
              this.errorMessage = result.error.message;
            }
          });
      }
    } else {
      this.addRsgistration(null);
    }
  }

  addRsgistration(paymentResult: any) {
    this.selectedItem.status = 'Registered';
    this.selectedItem.amount = this.calTotalPrice();
    if (paymentResult)
      this.selectedItem.last4 = paymentResult.payment_method_details.card.last4;
    else this.selectedItem.last4 = 'No Payment';
    this.registration.list.push(this.selectedItem);
    this.http
      .put<any>(
        this.ukcRegistrationUrl + '/ksea-ukc/registration',
        JSON.stringify(this.registration),
        this.httpOptions
      )
      .subscribe((res) => {
        if (this.calTotalPrice() > 0) {
          this.http
            .get(
              'https://ksea-files.s3.us-west-2.amazonaws.com/emailTemplates/RegistrationConfirm_priced.html',
              {
                responseType: 'text',
              }
            )
            .subscribe((data) => {
              const htmlContents = data
                .split('$NAME$')
                .join(
                  this.selectedItem.title +
                    ' ' +
                    this.selectedItem.lastName +
                    ', ' +
                    this.selectedItem.firstName
                )
                .split('$DATE$')
                .join(new Date().toDateString())
                .split('$AMOUNT$')
                .join(
                  '' +
                    (this.calActPrice() +
                      this.calMealPrice() +
                      this.calRegistrationFee())
                )
                .split('$DISCOUNT$')
                .join(
                  '' +
                    (this.calActPrice() +
                      this.calMealPrice() +
                      this.calRegistrationFee() -
                      this.calTotalPrice())
                )
                .split('$FEE$')
                .join('' + this.calTotalPrice())
                .split('$LAST4$')
                .join(this.selectedItem.last4);

              const emailData: any = {
                toEmails: [this.user.attributes.email, 'it@ksea.org', 'ukc2024@ksea.org'],
                subject:
                  'UKC 2024 Registration in San Francisco (' +
                  this.selectedItem.id +
                  ')',
                htmlMessage: htmlContents,
              };

              this.http
                .post<any>(
                  environment.apiURLs.email_api_URL + '/sendSimpleEmail',
                  JSON.stringify(emailData),
                  this.httpOptions
                )
                .subscribe((res) => {
                  this.display = false;
                  this.mobileDisplay = false;
                  this.paymentLoading = false;
                });
              this.messageService.add({
                severity: 'info',
                summary: 'Registration',
                detail: 'Registration Submitted.',
              });
            });
        } else {
          this.http
            .get(
              'https://ksea-files.s3.us-west-2.amazonaws.com/emailTemplates/RegistrationConfirm_nopayment.html',
              {
                responseType: 'text',
              }
            )
            .subscribe((data) => {
              const htmlContents = data
                .split('$NAME$')
                .join(
                  this.selectedItem.title +
                    ' ' +
                    this.selectedItem.lastName +
                    ', ' +
                    this.selectedItem.firstName
                )
                .split('$DATE$')
                .join(new Date().toDateString())
                .split('$AMOUNT$')
                .join(
                  '' +
                    (this.calActPrice() +
                      this.calMealPrice() +
                      this.calRegistrationFee())
                )
                .split('$DISCOUNT$')
                .join(
                  '' +
                    (this.calActPrice() +
                      this.calMealPrice() +
                      this.calRegistrationFee() -
                      this.calTotalPrice())
                )
                .split('$FEE$')
                .join('' + this.calTotalPrice());

              const emailData: any = {
                toEmails: [this.user.attributes.email, 'it@ksea.org', 'ukc2024@ksea.org'],
                subject:
                  'UKC 2024 Registration in San Francisco (' +
                  this.selectedItem.id +
                  ')',
                htmlMessage: htmlContents,
              };

              this.http
                .post<any>(
                  environment.apiURLs.email_api_URL + '/sendSimpleEmail',
                  JSON.stringify(emailData),
                  this.httpOptions
                )
                .subscribe((res) => {
                  this.display = false;
                  this.mobileDisplay = false;
                  this.paymentLoading = false;
                });
              this.messageService.add({
                severity: 'info',
                summary: 'Registration',
                detail: 'Registration Submitted.',
              });
            });
        }
      });
  }

  checkUKCPresenter(): boolean {
    const emailLowerCase =
      environment.ukc2023RegistrationConfig.ukcPresenterEmailList.map(
        (email: string) => email.toLowerCase()
      );
    if (emailLowerCase.includes(this.user.attributes.email.toLowerCase()))
      return true;
    return false;
  }

  checkFIREPresenter(): boolean {
    const emailLowerCase =
      environment.ukc2023RegistrationConfig.firePresenterEmailList.map(
        (email: string) => email.toLowerCase()
      );
    if (emailLowerCase.includes(this.user.attributes.email.toLowerCase()))
      return true;
    return false;
  }

  getNumberOfCodes(): number {
    if (this.registration) {
      if (this.registration.list) {
        let count = 0;
        for (let i = 0; i < this.registration.list.length; i++) {
          if (this.registration.list[i].status === 'Registered')
            count = count + 1;
        }

        if (this.registration.numberOfCodes)
          if (this.registration.numberOfCodes - count > 0)
            return this.registration.numberOfCodes - count;
          else return 0;
        else if (1 - count > 0) return 1 - count;
        else return 0;
      }
    }

    return 0;
  }

  checkCode(): void {
    this.http
      .get<any>(environment.apiURLs.ukc_GroupCode_api_URL, this.httpOptions)
      .subscribe((codeData) => {
        if (codeData.Item) {
          const found: any = codeData.Item.sponsorList.find(
            (item: any) =>
              item.email.toLowerCase() ===
              this.user.attributes.email.toLowerCase()
          );
          const emailLowerCaseukc = codeData.Item.ukcPresenterEmailList.map(
            (email: string) => email.toLowerCase()
          );

          const emailLowerCasefire = codeData.Item.firePresenterEmailList.map(
            (email: string) => email.toLowerCase()
          );

          const emailLowerCaseA = codeData.Item.codeAEmailList.map(
            (email: string) => email.toLowerCase()
          );
          const emailLowerCaseB = codeData.Item.codeBEmailList.map(
            (email: string) => email.toLowerCase()
          );

          const emailLowerCaseC = codeData.Item.codeCEmailList.map(
            (email: string) => email.toLowerCase()
          );
          const emailLowerCaseD = codeData.Item.codeDEmailList.map(
            (email: string) => email.toLowerCase()
          );
          const emailLowerCaseG = codeData.Item.codeGEmailList.map(
            (email: string) => email.toLowerCase()
          );
          const emailLowerCaseH = codeData.Item.codeHEmailList.map(
            (email: string) => email.toLowerCase()
          );
          const emailLowerCaseE = codeData.Item.codeEEmailList.map(
            (email: string) => email.toLowerCase()
          );
          const emailLowerCaseF = codeData.Item.codeFEmailList.map(
            (email: string) => email.toLowerCase()
          );
          const emailLowerCaseI = codeData.Item.codeIEmailList.map(
            (email: string) => email.toLowerCase()
          );
          const emailLowerCaseM = codeData.Item.codeMEmailList.map(
            (email: string) => email.toLowerCase()
          );
          this.registration.isOnline = codeData.Item.isOnline;
          this.registration.isEarlyBird = codeData.Item.isEarlyBird;

          if (
            emailLowerCasefire.includes(
              this.user.attributes.email.toLowerCase()
            )
          )
            this.registration.isFIREPresenter = true;
          else this.registration.isFIREPresenter = false;

          if (
            emailLowerCaseukc.includes(this.user.attributes.email.toLowerCase())
          )
            this.registration.isUKCPresenter = true;
          else this.registration.isUKCPresenter = false;

          this.registration.specialDiscountCode = 'Z'; //Donghun

          if (
            emailLowerCaseA.includes(this.user.attributes.email.toLowerCase())
          )
            this.registration.specialDiscountCode = 'A';
          if (
            emailLowerCaseB.includes(this.user.attributes.email.toLowerCase())
          )
            this.registration.specialDiscountCode = 'B';
          if (
            emailLowerCaseC.includes(this.user.attributes.email.toLowerCase())
          )
            this.registration.specialDiscountCode = 'C';
          if (
            emailLowerCaseD.includes(this.user.attributes.email.toLowerCase())
          )
            this.registration.specialDiscountCode = 'D';
          if (
            emailLowerCaseE.includes(this.user.attributes.email.toLowerCase())
          )
            this.registration.specialDiscountCode = 'E';
          if (
            emailLowerCaseF.includes(this.user.attributes.email.toLowerCase())
          )
            this.registration.specialDiscountCode = 'F';
          if (
            emailLowerCaseG.includes(this.user.attributes.email.toLowerCase())
          )
            this.registration.specialDiscountCode = 'G';
          if (
            emailLowerCaseH.includes(this.user.attributes.email.toLowerCase())
          )
            this.registration.specialDiscountCode = 'H';
          if (
            emailLowerCaseM.includes(this.user.attributes.email.toLowerCase())
          )
            this.registration.specialDiscountCode = 'M';
          if (
            emailLowerCaseI.includes(this.user.attributes.email.toLowerCase())
          )
            this.registration.specialDiscountCode = 'I';
          if (this.registration.specialDiscountCode && found)
            this.registration.numberOfCodes = found.numberOfCodes;
        }
      });
  }

  isInvalid() {
    if (!this.selectedItem) return true;

    if (!this.selectedItem.title) return true;

    if (!this.selectedItem.firstName) return true;

    if (!this.selectedItem.lastName) return true;

    if (!this.selectedItem.address) return true;

    if (!this.selectedItem.country) return true;

    if (!this.selectedItem.zip) return true;

    if (!this.selectedItem.affiliation) return true;

    if (!this.selectedItem.phone) return true;

    if (!this.selectedItem.group) return true;

    return false;
  }

  checkMultiRegistration(): boolean {
    if (this.registration) if (this.registration.numberOfCodes) return true;

    return false;
  }
}
