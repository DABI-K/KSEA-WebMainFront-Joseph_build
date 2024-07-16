import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { CognitoService } from 'src/app/service/cognito.service';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-monitor',
  templateUrl: './ukc-monitor.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['../../../../css/common.scss', './ukc-monitor.component.scss'],
})
export class UkcMonitorComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  loading = false;
  readOnly = false;
  user: any = null;
  token: string = '';
  results: any[] | undefined;
  listRegistration: any[] | undefined;
  ukc_registration_api_URL = environment.apiURLs.ukc_registration_api_URL;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private kseaInfoService: KseaInfoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.results = undefined;
    this.listRegistration = [];

    this.cognitoService
      .getUser()
      .then((user: any) => {
        this.user = user;
        if (this.user) {
          if (environment.ukcAdmin.includes(this.user.attributes.email)) {
            this.cognitoService.getToken().then((sdata) => {
              this.token = sdata.accessToken.jwtToken;
              this.getAllResults();
            });
          }
        } else this.router.navigateByUrl('/signIn?next=ukc-monitor');
      })
      .catch(() => {
        this.router.navigateByUrl('/signIn?next=ukc-monitor');
      });
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
          const doc: any = {};
          doc.registration = r;
          doc.username = item.id;
          doc.membership = item.membership;
          doc.userData = item.userData;

          this.listRegistration?.push(doc);
        });
    });
    console.log(this.listRegistration);
  }

  downloadCSV() {
    if (this.listRegistration) {
      let data = '2024 UKC Registration\n';
      data += 'Date:,' + new Date() + '\n\n';
      data +=
        'Registration ID,Date,Status,Title,Name,Affiliation,Email,Phone,Address,ZIP,Country,Technical Symposium,SEED?,FIRE?,Position,UKC Presenter,FIRE Presenter,KSEA Membership?,Waiver Code,Early Bird?,On Site?,Registration Fee,Registration Discounted Fee,Meal Plan Fee,Meal Plan Discounted Fee,Activities Fee,Total Payments,Data Science Workshop (Regular Fee: $70),Data Science Workshop (Student Fee: $25),Program book ($10),Bus ($5),Thursday Breakfast,Thursday Lunch Chicken,Thursday Lunch Veggie,Thursday Lunch Beef,Thursday Gala Beef,Thursday Gala Pork,Thursday Gala Veggie,Friday Breakfast,Friday Lunch Chicken,Friday Lunch Fish,Friday Lunch Veggie,Friday Network Dinner Bulgogi,Friday Network Dinner Spicy Pork,Friday Network Dinner Spicy Squid,Saturday Breakfast\n';
      for (const application of this.listRegistration) {
        data +=
          this.replaceCSVValue('ID-' + application.registration.id) +
          ',' +
          this.replaceCSVValue(application.registration.date) +
          ',' +
          this.replaceCSVValue(application.registration.status) +
          ',' +
          this.replaceCSVValue(application.registration.title) +
          ',' +
          this.replaceCSVValue(
            application.registration.lastName +
              ', ' +
              application.registration.firstName
          ) +
          ',' +
          this.replaceCSVValue(application.registration.affiliation) +
          ',' +
          this.replaceCSVValue(application.userData.email) +
          ',' +
          this.replaceCSVValue(application.registration.phone) +
          ',' +
          this.replaceCSVValue(application.registration.address) +
          ',' +
          this.replaceCSVValue(application.registration.zip) +
          ',' +
          this.replaceCSVValue(application.registration.country) +
          ',' +
          this.replaceCSVValue(application.registration.group) +
          ',' +
          this.replaceCSVValue(application.registration.isSeed ? 'YES' : 'NO') +
          ',' +
          this.replaceCSVValue(application.registration.isFire ? 'YES' : 'NO') +
          ',' +
          this.replaceCSVValue(application.registration.level) +
          ',' +
          this.replaceCSVValue(
            application.registration.isUKCPresenter ? 'YES' : 'NO'
          ) +
          ',' +
          this.replaceCSVValue(
            application.registration.isFIREPresenter ? 'YES' : 'NO'
          ) +
          ',' +
          this.replaceCSVValue(
            application.registration.hasMembership ? 'YES' : 'NO'
          ) +
          ',' +
          this.replaceCSVValue(application.registration.specialDiscountCode) +
          ',' +
          this.replaceCSVValue(
            application.registration.isEarlyBird ? 'YES' : 'NO'
          ) +
          ',' +
          this.replaceCSVValue(
            application.registration.isOnline ? 'Online' : 'OnSite'
          ) +
          ',' +
          this.calRegistrationFee(application.registration) +
          ',' +
          this.calRegistrationDiscountedFee(application.registration) +
          ',' +
          this.calMealPlanFee(application.registration) +
          ',' +
          this.calMealPlanDiscountedFee(application.registration) +
          ',' +
          this.calActivitiesFee(application.registration) +
          ',' +
          this.calTotalPayments(application.registration) +
          ',' +
          application.registration.workshop_regular +
          ',' +
          application.registration.workshop_student +
          ',' +
          application.registration.programBook +
          ',' +
          application.registration.bus +
          ',' +
          application.registration.thursday_breakfast +
          ',' +
          application.registration.thursday_lunch_Chicken +
          ',' +
          application.registration.thursday_lunch_veggie +
          ',' +
          application.registration.thursday_lunch_beef +
          ',' +
          application.registration.thursday_dinner_gala_beef +
          ',' +
          application.registration.thursday_dinner_gala_pork +
          ',' +
          application.registration.thursday_dinner_gala_veggie +
          ',' +
          application.registration.friday_breakfast +
          ',' +
          application.registration.friday_lunch_Chicken +
          ',' +
          application.registration.friday_lunch_fish +
          ',' +
          application.registration.friday_lunch_veggie +
          ',' +
          application.registration.friday_dinner_network_bulgogi +
          ',' +
          application.registration.friday_dinner_network_spicypork +
          ',' +
          application.registration.friday_dinner_network_spicysquid +
          ',' +
          application.registration.saturday_breakfast +
          '\n';
      }
      const a = document.createElement('a');
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = '2024 UKC Registration.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }
  }

  replaceCSVValue(innerValue: string) {
    innerValue = innerValue ? innerValue : '';
    console.log(innerValue);
    let result = innerValue.replace(/"/g, '""');
    if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
    return result;
  }

  calRegistrationFee(application: any) {
    if (application.isOnline) {
      if (
        application.specialDiscountCode === 'F' &&
        application.level === 'Regular'
      ) {
        return 450;
      }
      if (application.level === 'Regular') return 550;
      if (application.level === 'Postdoc') return 400;
      if (application.level === 'Graduate') return 350;
      if (application.level === 'Undergraduate') return 250;
    } else {
      if (
        application.specialDiscountCode === 'F' &&
        application.level === 'Regular'
      ) {
        return 550;
      }
      if (application.level === 'Regular') return 650;
      if (application.level === 'Postdoc') return 500;
      if (application.level === 'Graduate') return 400;
      if (application.level === 'Undergraduate') return 300;
    }

    return 650;
  }

  calRegistrationDiscountedFee(application: any) {
    let fee = this.calRegistrationFee(application);
    if (application.hasMembership) fee = fee - 50;
    if (application.isEarlyBird) fee = fee - 200;
    if (application.isUKCPresenter && !application.isFIREPresenter)
      fee = fee - 100;
    if (!application.isUKCPresenter && application.isFIREPresenter)
      fee = fee - 100;
    if (application.isUKCPresenter && application.isFIREPresenter)
      fee = fee - 100;

    if (application.specialDiscountCode === 'A') return 0;
    if (application.specialDiscountCode === 'B') return 0;
    if (application.specialDiscountCode === 'C') return 0;
    if (application.specialDiscountCode === 'I') fee = fee - 50;

    if (fee < 0) return 0;
    else return fee;
  }

  calMealPlanFee(application: any) {
    return (
      20 *
        (application.thursday_breakfast +
          application.friday_breakfast +
          application.saturday_breakfast) +
      35 *
        (application.thursday_lunch_Chicken +
          application.thursday_lunch_veggie +
          application.thursday_lunch_beef +
          application.friday_lunch_Chicken +
          application.friday_lunch_fish +
          application.friday_lunch_veggie) +
      75 *
        (application.thursday_dinner_gala_beef +
          application.thursday_dinner_gala_pork +
          application.thursday_dinner_gala_veggie) +
      25 *
        (application.friday_dinner_network_bulgogi +
          application.friday_dinner_network_spicypork +
          application.friday_dinner_network_spicysquid)
    );
  }

  calMealPlanDiscountedFee(application: any) {
    let fee = this.calMealPlanFee(application);
    if (application.specialDiscountCode === 'A') {
      if (application.thursday_breakfast > 0) fee = fee - 20;
      if (application.friday_breakfast > 0) fee = fee - 20;
      if (application.saturday_breakfast > 0) fee = fee - 20;

      if (
        application.thursday_lunch_Chicken +
          application.thursday_lunch_veggie +
          application.thursday_lunch_beef >
        0
      )
        fee = fee - 35;
      if (
        application.friday_lunch_Chicken +
          application.friday_lunch_fish +
          application.friday_lunch_veggie >
        0
      )
        fee = fee - 35;

      if (
        application.thursday_dinner_gala_beef +
          application.thursday_dinner_gala_pork +
          application.thursday_dinner_gala_veggie >
        0
      )
        fee = fee - 75;

      if (
        application.friday_dinner_network_bulgogi +
          application.friday_dinner_network_spicypork +
          application.friday_dinner_network_spicysquid >
        0
      )
        fee = fee - 25;
    }
    if (application.specialDiscountCode === 'C') {
      if (application.thursday_breakfast > 0) fee = fee - 20;
      if (application.friday_breakfast > 0) fee = fee - 20;
      if (application.saturday_breakfast > 0) fee = fee - 20;

      if (
        application.thursday_lunch_Chicken +
          application.thursday_lunch_veggie +
          application.thursday_lunch_beef >
        0
      )
        fee = fee - 35;
      if (
        application.friday_lunch_Chicken +
          application.friday_lunch_fish +
          application.friday_lunch_veggie >
        0
      )
        fee = fee - 35;
    }
    if (application.specialDiscountCode === 'D') {
      if (
        application.friday_dinner_network_bulgogi +
          application.friday_dinner_network_spicypork +
          application.friday_dinner_network_spicysquid >
        0
      )
        fee = fee - 25;
    }
    if (application.specialDiscountCode === 'E') {
      if (
        application.friday_dinner_network_bulgogi +
          application.friday_dinner_network_spicypork +
          application.friday_dinner_network_spicysquid >
        0
      )
        fee = fee - 25;
    }

    if (application.isFIREPresenter) {
      if (
        application.friday_dinner_network_bulgogi +
          application.friday_dinner_network_spicypork +
          application.friday_dinner_network_spicysquid >
        0
      )
        fee = fee - 25;
    }
    return fee;
  }

  calActivitiesFee(application: any) {
    return (
      70 * application.workshop_regular +
      25 * application.workshop_student +
      5 * application.bus +
      10 * application.programBook
    );
  }

  calTotalPayments(application: any) {
    return (
      this.calRegistrationDiscountedFee(application) +
      this.calMealPlanDiscountedFee(application) +
      this.calActivitiesFee(application)
    );
  }

  processCancel(application: any) {
    this.confirmationService.confirm({
      message: 'Are you sure to confirm this cancelation?',
      header: 'Descision Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(application);

        console.log(application.username);
        console.log(application.registration.id);

        let selectedDoc = this.results?.find(
          (item) => item.id === application.username
        );

        let selectedRegistration = selectedDoc.list.find(
          (item: any) => item.id === application.registration.id
        );

        selectedRegistration.status = 'Canceled';
        console.log(selectedDoc);
        console.log(selectedRegistration);

        this.http
          .put<any>(
            this.ukc_registration_api_URL + '/ksea-ukc/registration',
            JSON.stringify(selectedDoc),
            this.httpOptions
          )
          .subscribe((res) => {
            this.http
              .get(
                // 'https://ksea-files.s3.us-west-2.amazonaws.com/emailTemplates/CancelConfirmed_Modified.html',
                'https://ksea-files.s3.us-west-2.amazonaws.com/emailTemplates/CancelConfirmed_Modified.html?versionId=3X1Od2b0Eev4r1fHpbz6LTG_5BE.SQky',
                {
                  responseType: 'text',
                }
              )
              .subscribe((data) => {
                const htmlContents = data
                  .split('$NAME$')
                  .join(
                    selectedRegistration.title +
                      ' ' +
                      selectedRegistration.lastName +
                      ', ' +
                      selectedRegistration.firstName
                  )
                  .split('$ITEMID$')
                  .join(selectedRegistration.id);

                const emailData: any = {
                  toEmails: [selectedDoc.userData.email, 'finance@ksea.org', 'it@ksea.org', 'ukc2024@ksea.org'],
                  subject:
                    'UKC 2024 Registration in San Francisco(' +
                    selectedRegistration.id +
                    ') - Confirmation of Cancellation',
                  htmlMessage: htmlContents,
                };

                this.http
                  .post<any>(
                    environment.apiURLs.email_api_URL + '/sendSimpleEmail',
                    JSON.stringify(emailData),
                    this.httpOptions
                  )
                  .subscribe((res) => {});
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
}
