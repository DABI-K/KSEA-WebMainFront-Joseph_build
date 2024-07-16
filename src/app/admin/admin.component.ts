import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../service/cognito.service';
import { KseaInfoService } from '../service/ksea-info.service';
import { MembershipService } from '../service/membership.service';
import { UserInfoService } from '../service/user-info.service';
import { Membership } from '../shared/membership';
import { JobInfo } from '../shared/userinfo';
import { environment } from 'src/environments/environment';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../css/common.scss', './admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @ViewChild('myFileInput') myInputVariable: ElementRef | undefined;
  apiURL = environment.apiURLs.email_api_URL;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cognitoService: CognitoService,
    private membershipService: MembershipService,
    private userInfoService: UserInfoService,
    private kseaInfoService: KseaInfoService,
    private paymentService: PaymentService
  ) {}

  apsData: any;
  groupData: any;
  chapterData: any;
  basicOptions: any;
  asOfDate: string | undefined;
  emailForRefund: string | undefined;
  logs: string | undefined;

  user: any = null;
  token: string = '';
  membershipDataloading: boolean = false;
  userInfoDataloading: boolean = false;
  editDisplay: boolean = false;
  readOnly: boolean = false;
  emailDisplay: boolean = false;

  grandAllData: any[] = [];
  filteredValues: any[] = [];
  grandAllData_map = new Map();
  membershipAllData: any[] = [];
  userInfoAllData: any[] = [];

  selectedData: any = null;
  newJobInfo: any = null;
  newEduInfo: any = null;
  newPaymentItem: any = null;

  kseaInfo: any;

  permission: any;

  membershipDataProgressValue: number = 0;
  userInfoDataProgressValue: number = 0;

  fileList: any[] = [];
  subject: string | undefined;
  content: string | undefined;
  emailSending: boolean = false;
  name: string | undefined;
  email: string | undefined;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public ngOnInit(): void {
    this.asOfDate = undefined;
    this.logs = '';
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: 'rgb(0, 0, 0)',
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'rgb(0, 0, 0)',
          },
          grid: {
            color: 'rgb(220, 220, 220)',
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: 'rgb(0, 0, 0)',
          },
          grid: {
            color: 'rgb(220, 220, 220)',
            drawBorder: false,
          },
        },
      },
    };

    this.membershipAllData = [];
    this.userInfoAllData = [];
    this.grandAllData = [];
    this.grandAllData_map = new Map();
    this.fileList = [];
    this.subject = undefined;
    this.content = undefined;
    this.emailSending = false;
    this.name = undefined;
    this.email = undefined;

    this.emailDisplay = false;
    this.editDisplay = false;

    this.permission = null;

    this.kseaInfoService.getKSEAInfo().subscribe((res) => {
      this.kseaInfo = res.Item;

      console.log(this.kseaInfo);
      this.kseaInfoService.setKSEAInfo(res);
    });

    this.cognitoService
      .getUser()
      .then((user: any) => {
        this.user = user;
        const newMemberShip: Membership = {} as Membership;
        this.cognitoService.getToken().then((sdata) => {
          this.token = sdata.accessToken.jwtToken;
          this.paymentService
            .retrieveSubscription(this.token, 'sub_1OVFWhI3X7wnyEeCPPONAg24')
            .subscribe((result) => {
              console.log(result.status);
            });
          if (this.user && this.user.attributes && this.user.attributes.email) {
            const loggedEmail = this.user.attributes.email;

            const founds = environment.adminPermissions.filter(
              (item) => item.email === loggedEmail
            );

            if (founds && founds.length > 0) {
              this.permission = founds[0];
            }
          }

          if (this.permission) {
            this.membershipDataloading = true;
            this.userInfoDataloading = true;
            this.getAllMData();
            this.getAllUData();
          }
        });
      })
      .catch(() => {
        this.router.navigate(['/signIn']);
      });
  }

  refund() {
    if (this.emailForRefund && this.asOfDate) {
      const founds = this.membershipAllData.filter((item: any) => {
        if (item.email === this.emailForRefund) return true;
        return false;
      });

      console.log(founds);

      if (founds.length === 1) {
        const found = founds[0];
        if (found.type === 'Regular') {
          found.numberOfPayments = found.numberOfPayments - 1;
          const asOfDateNum = Date.parse(this.asOfDate);
          found.expirationDate = new Date(asOfDateNum);

          const paymentHistoryItem = {
            action: 'RefundRegularMembership',
            amounts: -35,
            date: found.expirationDate,
            description: 'Regular membership fully refunded',
          };

          found.paymentHistory.push(paymentHistoryItem);

          this.membershipService
            .createMembership(found, this.token)
            .subscribe(() => {
              console.log(this.emailForRefund + ' has been refunded!');
              this.logs =
                this.logs + '\n ' + this.emailForRefund + ' has been refunded!';
            });
        } else {
          found.numberOfPayments = found.numberOfPayments - 1;
          const asOfDateNum = Date.parse(this.asOfDate);
          found.expirationDate = new Date(asOfDateNum);

          const paymentHistoryItem = {
            action: 'RefundGraduateStudentMembership',
            amounts: -15,
            date: found.expirationDate,
            description: 'Graduate Student membership fully refunded',
          };

          found.paymentHistory.push(paymentHistoryItem);

          this.membershipService
            .createMembership(found, this.token)
            .subscribe(() => {
              console.log(this.emailForRefund + ' has been refunded!');
              this.logs =
                this.logs + '\n ' + this.emailForRefund + ' has been refunded!';
            });
        }

        console.log(founds);
      }
    }
  }

  dailyMembershipHandler() {
    if (this.asOfDate) {
      //1. Send email to expiring (2 days remained) users who have subscribed regular
      //2. Change temporary flag for subscription 2 days users
      const asOfDateNum = Date.parse(this.asOfDate);
      const fromDateNum = asOfDateNum + 2 * 86400000;
      const toDateNum = asOfDateNum + 3 * 86400000;
      const founds = this.membershipAllData.filter((item: any) => {
        const expirationDateNum = Date.parse(item.expirationDate);
        if (item.type === 'Regular' && item.subscriptionStatus === 'subscribed')
          if (fromDateNum <= expirationDateNum && expirationDateNum < toDateNum)
            return true;
        return false;
      });
      console.log('1.foundsForExpring', founds);
      this.sendReminderEmails(founds);
      console.log('2.foundsForSubscription', founds);
      this.saveTemporaryFlag(founds);

      //3. make decision for temporary flag users
      const foundsForFlag = this.membershipAllData.filter((item: any) => {
        if (item.temporaryFlag) {
          const aYearBeforeExpiration = new Date(item.expirationDate);
          aYearBeforeExpiration.setFullYear(
            aYearBeforeExpiration.getFullYear() - 1
          );
          const fromDateNum2 = asOfDateNum - 2 * 86400000;
          const toDateNum2 = asOfDateNum - 86400000;
          const expirationDateNum = aYearBeforeExpiration.getTime();
          console.log(fromDateNum2, toDateNum2, expirationDateNum, item.id);
          if (
            fromDateNum2 <= expirationDateNum &&
            expirationDateNum < toDateNum2
          )
            return true;
        }
        return false;
      });
      console.log('3.foundsForFlag', foundsForFlag);
      this.makeDecisionForTemporaryFlag(foundsForFlag);

      //4. Send email to expired users on yesterday.
      const foundsExpired = this.membershipAllData.filter((item: any) => {
        const dateOfExpiration = new Date(item.expirationDate);
        const fromDateNum2 = asOfDateNum - 2 * 86400000;
        const toDateNum2 = asOfDateNum - 86400000;
        const expirationDateNum = dateOfExpiration.getTime();
        if (fromDateNum2 <= expirationDateNum && expirationDateNum < toDateNum2)
          return true;
        return false;
      });
      console.log('4.foundsForExpired', foundsExpired);
      this.sendExpiredEmails(foundsExpired);
    }
  }

  makeDecisionForTemporaryFlag(founds: any[]) {
    founds.forEach((item) => {
      this.paymentService
        .retrieveSubscription(this.token, item.subscriptionId)
        .subscribe((result) => {
          console.log(result.status);

          if (result.status === 'active') {
            item.temporaryFlag = undefined;
            item.numberOfPayments = item.numberOfPayments + 1;

            const aYearBeforeExpiration = new Date(item.expirationDate);
            aYearBeforeExpiration.setFullYear(
              aYearBeforeExpiration.getFullYear() - 1
            );

            const paymentHistoryItem = {
              action: 'PayRegularMembership',
              amounts: 35,
              date: aYearBeforeExpiration,
              description:
                'Regular membership fully paid (' + item.subscriptionId + ')',
            };

            item.paymentHistory.push(paymentHistoryItem);

            this.membershipService
              .createMembership(item, this.token)
              .subscribe(() => {
                this.logs = this.logs + '\n ' + item.email;
                (' : the payment was processed.');
              });
          } else {
            item.temporaryFlag = undefined;
            const aYearBeforeExpiration = new Date(item.expirationDate);
            aYearBeforeExpiration.setFullYear(
              aYearBeforeExpiration.getFullYear() - 1
            );
            item.expirationDate = aYearBeforeExpiration;
            this.membershipService
              .createMembership(item, this.token)
              .subscribe(() => {
                this.logs = this.logs + '\n ' + item.email;
                (' : the payment was NOT processed.');
              });
          }
        });
    });
  }

  saveTemporaryFlag(founds: any[]) {
    founds.forEach((item) => {
      item.temporaryFlag = true;
      const aYearFromExpiration = new Date(item.expirationDate);
      aYearFromExpiration.setFullYear(aYearFromExpiration.getFullYear() + 1);
      item.expirationDate = aYearFromExpiration;
      this.membershipService
        .createMembership(item, this.token)
        .subscribe(() => {
          this.logs =
            this.logs +
            '\n ' +
            'The temporary flag has been saved for ' +
            item.email;
        });
    });
  }
  sendReminderEmails(founds: any[]) {
    founds.forEach((item) => {
      const emailData = {
        toEmails: [item.email],
        subject: 'KSEA Membership Renewal Coming Up Soon!',
        htmlMessage:
          'Dear KSEA member,' +
          '<br/><br/><br/>' +
          'We hope this message finds you well.' +
          '<br/><br/>' +
          "We would like to remind you that your KSEA membership subscription is scheduled for renewal in just 2 days. As a valued member, we genuinely appreciate your ongoing support for our organization's mission." +
          '<br/><br/>' +
          'Your card on file will be charged $35 for regular membership, as specified in your profile. Your current membership expiration date is [membership expiration date: ' +
          new Date(item.expirationDate).toDateString() +
          '].' +
          '<br/><br/>' +
          'Please note, if you have activated the subscription feature, your membership will renew automatically. Otherwise, kindly ensure to manually renew your membership after logging in to https://www.ksea.org/signIn?next=profile' +
          '<br/><br/>' +
          'Additionally, we would like to extend an invitation for you to consider becoming a lifetime member, which offers various benefits and helps reduce future expenses. You can learn more about our lifetime membership option by clicking here: https://www.ksea.org/about-membership#lifetime' +
          '<br/><br/>' +
          'Thank you once again for your continued commitment to KSEA. Should you have any questions or need further assistance regarding your membership, feel free to reach out to us.' +
          '<br/><br/><br/>' +
          'Warm regards,' +
          '<br/><br/>' +
          'Korean - American Scientists and Engineers Association (KSEA)' +
          '<br/>' +
          '1952 Gallows Rd. #300' +
          '<br/>' +
          'Vienna, VA 22182' +
          '<br/>' +
          '703-748-1221' +
          '<br/>' +
          'hq@ksea.org',
      };

      this.http
        .post<any>(
          environment.apiURLs.email_api_URL + '/sendSimpleEmail',
          JSON.stringify(emailData),
          this.httpOptions
        )
        .subscribe((res) => {
          this.logs =
            this.logs +
            '\n ' +
            'The renewal notice email has been sent to ' +
            item.email;
        });
    });
  }

  sendExpiredEmails(founds: any[]) {
    founds.forEach((item) => {
      const emailData = {
        toEmails: [item.email],
        subject: 'Notification: Your KSEA Membership Has Been Expired',
        htmlMessage:
          'Dear KSEA member,' +
          '<br/><br/><br/>' +
          'We hope this message finds you well.' +
          '<br/><br/>' +
          'We regret to inform you that your KSEA membership has been expired on [membership expiration date: ' +
          new Date(item.expirationDate).toDateString() +
          '] and did not renew. We apologize for any inconvenience this may have caused.' +
          '<br/><br/>' +
          'We genuinely value your participation and support within our community. Should you reconsider and wish to re-engage with our activities, local chapters, technical groups, and APS (Affiliated Professional Societies), we encourage you to consider rejoining our membership.' +
          '<br/><br/>' +
          'To rejoin our membership and continue enjoying the benefits of being part of our community, simply log in to our website and proceed to pay for membership here: https://www.ksea.org/signIn?next=profile' +
          '<br/><br/>' +
          'Thank you for your previous support, and we sincerely hope to welcome you back as a valued member of KSEA.' +
          '<br/><br/>' +
          "If you have any questions or require assistance, please don't hesitate to reach out to us here: hq@ksea.org" +
          '<br/><br/><br/>' +
          'Best regards,' +
          '<br/><br/>' +
          'Korean - American Scientists and Engineers Association (KSEA)' +
          '<br/>' +
          '1952 Gallows Rd. #300' +
          '<br/>' +
          'Vienna, VA 22182' +
          '<br/>' +
          '703-748-1221' +
          '<br/>' +
          'hq@ksea.org',
      };

      this.http
        .post<any>(
          environment.apiURLs.email_api_URL + '/sendSimpleEmail',
          JSON.stringify(emailData),
          this.httpOptions
        )
        .subscribe((res) => {
          this.logs =
            this.logs +
            '\n ' +
            'The Membership Cancelation notice email has been sent to ' +
            item.email;
        });
    });
  }

  getAllMData() {
    this.membershipService
      .getAllMemberships(this.token)
      .subscribe((data: any) => {
        this.membershipAllData = this.membershipAllData.concat(data.Items);
        this.membershipDataProgressValue =
          Math.round(
            ((this.membershipAllData.length * 100) /
              environment.totalOfMembershipData) *
              100
          ) / 100;
        if (data.LastEvaluatedKey) this.getNextMData(data.LastEvaluatedKey.id);
        else {
          this.membershipAllData.forEach((item: any) => {
            if (!this.grandAllData_map.get(item.id))
              this.grandAllData_map.set(item.id, item);
            else {
              this.grandAllData_map.set(
                item.id,
                Object.assign({}, this.grandAllData_map.get(item.id), item)
              );
            }
          });
          this.membershipDataProgressValue = 100;
          this.membershipDataloading = false;
          this.endDatCollection();
        }
      });
  }

  getNextMData(key: string) {
    this.membershipService
      .getAllMembershipsFromKey(this.token, key)
      .subscribe((data: any) => {
        this.membershipAllData = this.membershipAllData.concat(data.Items);
        this.membershipDataProgressValue =
          Math.round(
            ((this.membershipAllData.length * 100) /
              environment.totalOfMembershipData) *
              100
          ) / 100;
        if (data.LastEvaluatedKey) this.getNextMData(data.LastEvaluatedKey.id);
        else {
          this.membershipAllData.forEach((item: any) => {
            if (!this.grandAllData_map.get(item.id))
              this.grandAllData_map.set(item.id, item);
            else {
              this.grandAllData_map.set(
                item.id,
                Object.assign({}, this.grandAllData_map.get(item.id), item)
              );
            }
          });
          this.membershipDataProgressValue = 100;
          this.membershipDataloading = false;
          this.endDatCollection();
        }
      });
  }

  getAllUData() {
    this.userInfoService.getAllUserInfos(this.token).subscribe((data: any) => {
      this.userInfoAllData = this.userInfoAllData.concat(data.Items);
      this.userInfoDataProgressValue =
        Math.round(
          ((this.userInfoAllData.length * 100) /
            environment.totalOfUserInfoData) *
            100
        ) / 100;
      if (data.LastEvaluatedKey) this.getNextUData(data.LastEvaluatedKey.id);
      else {
        this.userInfoAllData.forEach((item: any) => {
          if (!this.grandAllData_map.get(item.id))
            this.grandAllData_map.set(item.id, item);
          else {
            this.grandAllData_map.set(
              item.id,
              Object.assign({}, this.grandAllData_map.get(item.id), item)
            );
          }
        });
        this.userInfoDataProgressValue = 100;
        this.userInfoDataloading = false;
        this.endDatCollection();
      }
    });
  }

  endDatCollection() {
    console.log(this.permission);

    if (!this.membershipDataloading && !this.userInfoDataloading) {
      if (this.permission.type === 'APS') {
        this.grandAllData = Array.from(
          this.grandAllData_map,
          ([name, value]) => ({ value })
        ).filter((item: any) => {
          if (item && item.value && item.value.kseaInfo) {
            if (item.value.kseaInfo.aps1 === this.permission.value) return true;
            if (item.value.kseaInfo.aps2 === this.permission.value) return true;
            if (item.value.kseaInfo.aps3 === this.permission.value) return true;
          }
          return false;
        });
      } else if (this.permission.type === 'GROUP') {
        this.grandAllData = Array.from(
          this.grandAllData_map,
          ([name, value]) => ({ value })
        ).filter((item: any) => {
          if (item && item.value && item.value.kseaInfo) {
            if (item.value.kseaInfo.group1 === this.permission.value)
              return true;
            if (item.value.kseaInfo.group2 === this.permission.value)
              return true;
          }
          return false;
        });
      } else if (this.permission.type === 'CP') {
        this.grandAllData = Array.from(
          this.grandAllData_map,
          ([name, value]) => ({ value })
        ).filter((item: any) => {
          if (item && item.value && item.value.kseaInfo) {
            if (item.value.kseaInfo.localChapter === this.permission.value)
              return true;
          }
          return false;
        });
      } else {
        this.grandAllData = Array.from(
          this.grandAllData_map,
          ([name, value]) => ({ value })
        );
      }
      this.fixData(this.grandAllData);
      this.filteredValues = this.grandAllData;
      this.genChartData();
    }
  }

  getNextUData(key: string) {
    this.userInfoService
      .getAllUserInfosFromKey(this.token, key)
      .subscribe((data: any) => {
        this.userInfoAllData = this.userInfoAllData.concat(data.Items);
        this.userInfoDataProgressValue =
          Math.round(
            ((this.userInfoAllData.length * 100) /
              environment.totalOfUserInfoData) *
              100
          ) / 100;
        if (data.LastEvaluatedKey) this.getNextUData(data.LastEvaluatedKey.id);
        else {
          this.userInfoAllData.forEach((item: any) => {
            if (!this.grandAllData_map.get(item.id))
              this.grandAllData_map.set(item.id, item);
            else {
              this.grandAllData_map.set(
                item.id,
                Object.assign({}, this.grandAllData_map.get(item.id), item)
              );
            }
          });
          this.userInfoDataProgressValue = 100;
          this.userInfoDataloading = false;
          this.endDatCollection();
        }
      });
  }

  replaceCSVValue(innerValue: string) {
    innerValue = innerValue ? innerValue : '';
    let result = innerValue.replace(/"/g, '""');
    if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
    return result;
  }

  findLastPaymentAction(paymentHistory: any[]) {
    if (paymentHistory) {
      let lastTime = 0;
      let result = '';
      for (let i = 0; i < paymentHistory.length; i++) {
        const item = paymentHistory[i];
        if (lastTime < new Date(item.date).getTime()) {
          if (item.action === 'PayRegularMembership') {
            lastTime = new Date(item.date).getTime();
            result = 'Regular';
          } else if (item.action === 'PayGraduateStudentMembership') {
            lastTime = new Date(item.date).getTime();
            result = 'GraduateStudent';
          } else if (item.action === 'PayUndergraduateStudentMembership') {
            lastTime = new Date(item.date).getTime();
            result = 'UndergraduateStudent';
          }
        }
      }
      return result;
    } else return '';
  }

  downloadCSV() {
    console.log(this.grandAllData);
    let data = '';

    let isLimited = true;
    if (
      this.permission.type === 'APS' ||
      this.permission.type === 'GROUP' ||
      this.permission.type === 'CP'
    )
      isLimited = true;
    else isLimited = false;

    if (isLimited) {
      data =
        'id,email,type,expirationDate,lifetimeDate,given_name,middle_name,family_name,aps1,aps2,aps3,group1,group2,keywords,localChapter,specialty,employer,jobStartDate,jobTitle,job_city,job_state,education\n';
    } else {
      data =
        'id,email,numberOfPayments,type,expirationDate,lifetimeDate,customerId,subscriptionId,subscriptionStatus,given_name,middle_name,family_name,aps1,aps2,aps3,group1,group2,keywords,localChapter,specialty,address,city,state,zipcode,birthdate,phoneNumber,title,ukc,webSite,employer,jobStartDate,jobTitle,job_city,job_state,education,lastPaymentAction\n';
    }

    this.filteredValues.forEach((item) => {
      data = data + this.replaceCSVValue('ID_' + item.value.id);
      data = data + ',' + this.replaceCSVValue('' + item.value.email);
      if (!isLimited)
        data =
          data + ',' + this.replaceCSVValue('' + item.value.numberOfPayments);
      data = data + ',' + this.replaceCSVValue('' + item.value.typeForDisplay);
      if (item.value.expirationDate) {
        data =
          data +
          ',' +
          this.replaceCSVValue(
            item.value.expirationDate.toString().slice(4, 16) //original: (0, 10)
          ); 
      } else {
        data = data + ',';
      }

      if (item.value.lifetimeDate) {
        data =
          data +
          ',' +
          this.replaceCSVValue(item.value.lifetimeDate.toString().slice(4, 16)); //original: (0, 10)
      } else {
        data = data + ',';
      }
      if (!isLimited)
        data = data + ',' + this.replaceCSVValue('' + item.value.customerId);
      if (!isLimited)
        data =
          data + ',' + this.replaceCSVValue('' + item.value.subscriptionId);
      if (!isLimited)
        data =
          data + ',' + this.replaceCSVValue('' + item.value.subscriptionStatus);

      if (item.value.userInfo) {
        data =
          data +
          ',' +
          this.replaceCSVValue('' + item.value.userInfo.given_name);
      } else {
        data = data + ',';
      }

      if (item.value.userInfo) {
        data =
          data +
          ',' +
          this.replaceCSVValue('' + item.value.userInfo.middle_name);
      } else {
        data = data + ',';
      }

      if (item.value.userInfo) {
        data =
          data +
          ',' +
          this.replaceCSVValue('' + item.value.userInfo.family_name);
      } else {
        data = data + ',';
      }

      if (item.value.kseaInfo) {
        data = data + ',' + this.replaceCSVValue(item.value.kseaInfo.aps1);
        data = data + ',' + this.replaceCSVValue(item.value.kseaInfo.aps2);
        data = data + ',' + this.replaceCSVValue(item.value.kseaInfo.aps3);
        data = data + ',' + this.replaceCSVValue(item.value.kseaInfo.group1);
        data = data + ',' + this.replaceCSVValue(item.value.kseaInfo.group2);
        data = data + ',' + this.replaceCSVValue(item.value.kseaInfo.keywords);
        data =
          data + ',' + this.replaceCSVValue(item.value.kseaInfo.localChapter);
        data = data + ',' + this.replaceCSVValue(item.value.kseaInfo.specialty);
      } else {
        data = data + ',';
        data = data + ',';
        data = data + ',';
        data = data + ',';
        data = data + ',';
        data = data + ',';
        data = data + ',';
        data = data + ',';
      }
      if (!isLimited)
        if (item.value.userInfo) {
          data = data + ',' + this.replaceCSVValue(item.value.userInfo.address);
          data = data + ',' + this.replaceCSVValue(item.value.userInfo.city);
          data = data + ',' + this.replaceCSVValue(item.value.userInfo.state);
          data = data + ',' + this.replaceCSVValue(item.value.userInfo.zipcode);

          if (item.value.userInfo.birthdate)
            data =
              data +
              ',' +
              this.replaceCSVValue(
                item.value.userInfo.birthdate.toString().slice(4, 16) //original (0, 10)
              );
          else {
            data = data + ',';
          }

          data =
            data + ',' + this.replaceCSVValue(item.value.userInfo.phone_number);

          data = data + ',' + this.replaceCSVValue(item.value.userInfo.title);
          data = data + ',' + this.replaceCSVValue(item.value.userInfo.ukc);
          data = data + ',' + this.replaceCSVValue(item.value.userInfo.website);
        } else {
          data = data + ',';
          data = data + ',';
          data = data + ',';
          data = data + ',';
          data = data + ',';
          data = data + ',';
          data = data + ',';
          data = data + ',';
          data = data + ',';
        }

      if (item.value.currentJob) {
        data =
          data + ',' + this.replaceCSVValue(item.value.currentJob.employer);
        if (item.value.currentJob.startDate) {
          this.replaceCSVValue(
            item.value.currentJob.startDate.toString().slice(0, 10)
          );
        } else {
          data = data + ',';
        }
        data =
          data + ',' + this.replaceCSVValue(item.value.currentJob.jobTitle);
        data = data + ',' + this.replaceCSVValue(item.value.currentJob.city);
        data = data + ',' + this.replaceCSVValue(item.value.currentJob.state);
      } else {
        data = data + ',';
        data = data + ',';
        data = data + ',';
        data = data + ',';
        data = data + ',';
      }
      if (item.value.educationInfo && item.value.educationInfo.length > 0) {
        let eduStr = '';
        for (const edu of item.value.educationInfo) {
          eduStr +=
            edu.degree +
            '|' +
            edu.major +
            '|' +
            edu.school +
            '|' +
            edu.thesisTitle +
            '|' +
            edu.yearEarned +
            '~';
        }
        data += ',' + this.replaceCSVValue(eduStr);
      } else {
        data = data + ',';
      }
      if (!isLimited)
        data =
          data + ',' + this.findLastPaymentAction(item.value.paymentHistory);
      data = data + '\n';
    });
    const a = document.createElement('a');
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'userList.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  onFilter(event: any, dt: any) {
    this.filteredValues = event.filteredValue;
    this.genChartData();
  }

  fixData(data: any[]) {
    data.forEach((item) => {
      item.value.numberOfPayments = Number(item.value.numberOfPayments);
      if (isNaN(item.value.numberOfPayments)) {
        item.value.numberOfPayments = 0;
      }

      if (item.value.type === 'Student') {
        if (item.value.schoolInfo) {
          item.value.typeForDisplay = item.value.schoolInfo.type;
        } else {
          item.value.type = 'Unpaid';
          item.value.typeForDisplay = 'Unpaid';
        }
      } else item.value.typeForDisplay = item.value.type;

      if (!item.value.type || item.value.type === '') {
        item.value.type = 'Unpaid';
        item.value.typeForDisplay = 'Unpaid';
      }

      if (item.value.kseaInfo) {
        item.value.kseaInfo.apsAll = '';

        if (item.value.kseaInfo.aps1)
          item.value.kseaInfo.apsAll =
            item.value.kseaInfo.apsAll + ' ' + item.value.kseaInfo.aps1;
        if (item.value.kseaInfo.aps2)
          item.value.kseaInfo.apsAll =
            item.value.kseaInfo.apsAll + ' ' + item.value.kseaInfo.aps2;
        if (item.value.kseaInfo.aps3)
          item.value.kseaInfo.apsAll =
            item.value.kseaInfo.apsAll + ' ' + item.value.kseaInfo.aps3;

        item.value.kseaInfo.groups = '';
        if (item.value.kseaInfo.group1)
          item.value.kseaInfo.groups =
            item.value.kseaInfo.groups + ' ' + item.value.kseaInfo.group1;
        if (item.value.kseaInfo.group2)
          item.value.kseaInfo.groups =
            item.value.kseaInfo.groups + ' ' + item.value.kseaInfo.group2;
      }

      if (item.value.expirationDate)
        item.value.expirationDate = new Date(item.value.expirationDate);

      if (item.value.lifetimeDate)
        item.value.lifetimeDate = new Date(item.value.lifetimeDate);

      if (item.value.currentJob && item.value.currentJob.startDate)
        item.value.currentJob.startDate = new Date(
          item.value.currentJob.startDate
        );

      if (!item.value.schoolInfo) item.value.schoolInfo = {};
      if (!item.value.userInfo) item.value.userInfo = {};
      if (!item.value.kseaInfo) item.value.kseaInfo = {};
      if (!item.value.currentJob) item.value.currentJob = {};

      if (item.value.userInfo.birthdate)
        item.value.userInfo.birthdate = new Date(item.value.userInfo.birthdate);
    });
  }

  genChartData() {
    this.apsData = {
      labels: this.kseaInfo.aps.map((value: any) => value.code),
      datasets: [
        {
          label: 'APS',
          data: this.kseaInfo.aps.map((value: any) => 0),
          backgroundColor: this.kseaInfo.aps.map(
            (value: any) =>
              '#' + Math.floor(Math.random() * 16777215).toString(16)
          ),
          borderColor: this.kseaInfo.aps.map(
            (value: any) =>
              '#' + Math.floor(Math.random() * 16777215).toString(16)
          ),
          borderWidth: 1,
        },
      ],
    };

    this.groupData = {
      labels: this.kseaInfo.groups.map((value: any) => value.code),
      datasets: [
        {
          label: 'TG',
          data: this.kseaInfo.groups.map((value: any) => 0),
          backgroundColor: this.kseaInfo.groups.map(
            (value: any) =>
              '#' + Math.floor(Math.random() * 16777215).toString(16)
          ),
          borderColor: this.kseaInfo.groups.map(
            (value: any) =>
              '#' + Math.floor(Math.random() * 16777215).toString(16)
          ),
          borderWidth: 1,
        },
      ],
    };

    this.chapterData = {
      labels: this.kseaInfo.chapters.map((value: any) => value.name),
      datasets: [
        {
          label: 'Chapter',
          data: this.kseaInfo.chapters.map((value: any) => 0),
          backgroundColor: this.kseaInfo.chapters.map(
            (value: any) =>
              '#' + Math.floor(Math.random() * 16777215).toString(16)
          ),
          borderColor: this.kseaInfo.chapters.map(
            (value: any) =>
              '#' + Math.floor(Math.random() * 16777215).toString(16)
          ),
          borderWidth: 1,
        },
      ],
    };

    this.filteredValues.forEach((item) => {
      if (item.value.kseaInfo && item.value.kseaInfo.apsAll) {
        const list = this.kseaInfo.aps.map((value: any) => value.code);

        for (let i = 0; i < list.length; i++) {
          if (item.value.kseaInfo.apsAll.includes(list[i])) {
            this.apsData.datasets[0].data[i] =
              this.apsData.datasets[0].data[i] + 1;
          }
        }
      }

      if (item.value.kseaInfo && item.value.kseaInfo.groups) {
        const list = this.kseaInfo.groups.map((value: any) => value.code);

        for (let i = 0; i < list.length; i++) {
          if (item.value.kseaInfo.groups.includes(list[i])) {
            this.groupData.datasets[0].data[i] =
              this.groupData.datasets[0].data[i] + 1;
          }
        }
      }

      if (item.value.kseaInfo && item.value.kseaInfo.localChapter) {
        const list = this.kseaInfo.chapters.map((value: any) => value.name);

        for (let i = 0; i < list.length; i++) {
          if (item.value.kseaInfo.localChapter === list[i]) {
            this.chapterData.datasets[0].data[i] =
              this.chapterData.datasets[0].data[i] + 1;
          }
        }
      }
    });
  }

  showDialogForEmail() {
    this.resetEmailForm();

    if (this.filteredValues) {
      this.email = this.filteredValues
        .map((item) => item.value.email)
        .join(',');
    }

    this.emailDisplay = true;
  }

  closeEmailForm() {
    this.emailDisplay = false;
  }

  resetEmailForm() {
    this.fileList = [];
    this.subject = undefined;
    this.content = undefined;
    this.emailSending = false;
    this.name = undefined;
    this.email = undefined;
    if (this.filteredValues) {
      this.email = this.filteredValues
        .map((item) => item.value.email)
        .join(',');
    }
  }

  showDialogForEdit(data: any, readOnly: boolean) {
    this.editDisplay = true;
    this.readOnly = readOnly;

    this.selectedData = JSON.parse(JSON.stringify(data));
    this.newJobInfo = {} as JobInfo;
    this.newEduInfo = {} as any;
    this.newPaymentItem = {} as any;

    if (this.selectedData.value.paymentHistory) {
      this.selectedData.value.paymentHistory.forEach((item: any) => {
        if (item.date) {
          item.date = item.date.slice(0, 10);
        }
      });
    }

    if (this.selectedData.value.expirationDate) {
      this.selectedData.value.expirationDate =
        this.selectedData.value.expirationDate.toString().slice(0, 10);
    }

    if (this.selectedData.value.lifetimeDate)
      this.selectedData.value.lifetimeDate =
        this.selectedData.value.lifetimeDate.toString().slice(0, 10);

    if (this.selectedData.value.userInfo.birthdate)
      this.selectedData.value.userInfo.birthdate =
        this.selectedData.value.userInfo.birthdate.toString().slice(0, 10);

    if (
      this.selectedData.value.currentJob &&
      this.selectedData.value.currentJob.startDate
    )
      this.selectedData.value.currentJob.startDate =
        this.selectedData.value.currentJob.startDate.toString().slice(0, 10);

    console.log(this.selectedData);
  }

  delJobHistory(item: JobInfo): void {
    this.selectedData.value.jobHistory =
      this.selectedData.value.jobHistory.filter((obj: JobInfo) => {
        return obj !== item;
      });
  }

  delEducationItem(item: any): void {
    this.selectedData.value.educationInfo =
      this.selectedData.value.educationInfo.filter((obj: any) => {
        return obj !== item;
      });
  }

  delPaymentHistory(item: any): void {
    this.selectedData.value.paymentHistory =
      this.selectedData.value.paymentHistory.filter((obj: any) => {
        return obj !== item;
      });
  }

  addEduInfo() {
    if (!this.selectedData.value.educationInfo) {
      this.selectedData.value.educationInfo = [];
    }
    this.selectedData.value.educationInfo.push(
      JSON.parse(JSON.stringify(this.newEduInfo))
    );
    this.newEduInfo = {} as any;
  }

  addJobInfo() {
    if (!this.selectedData.value.jobHistory) {
      this.selectedData.value.jobHistory = [];
    }
    this.selectedData.value.jobHistory.push(
      JSON.parse(JSON.stringify(this.newJobInfo))
    );
    this.newJobInfo = {} as JobInfo;
    this.sortJobInfo();
  }

  addNewPaymentInfo() {
    if (!this.selectedData.value.paymentHistory) {
      this.selectedData.value.paymentHistory = [];
    }
    this.selectedData.value.paymentHistory.push(
      JSON.parse(JSON.stringify(this.newPaymentItem))
    );
    this.newPaymentItem = {} as any;
  }

  public sortJobInfo(): void {
    this.selectedData.value.jobHistory =
      this.selectedData.value.jobHistory.sort((a: JobInfo, b: JobInfo) =>
        a.startDate > b.startDate ? -1 : 1
      );
  }

  cancelEdit() {
    this.editDisplay = false;
    this.selectedData = null;
    this.newJobInfo = {} as JobInfo;
    this.newEduInfo = {} as any;
    this.newPaymentItem = {} as any;
  }

  saveAndCloseEdit() {
    let userInfoData = {} as any;

    userInfoData.id = this.selectedData.value.id;
    userInfoData.email = this.selectedData.value.email;

    userInfoData.userInfo = this.selectedData.value.userInfo;
    userInfoData.currentJob = this.selectedData.value.currentJob;
    userInfoData.kseaInfo = this.selectedData.value.kseaInfo;
    userInfoData.jobHistory = this.selectedData.value.jobHistory;
    userInfoData.educationInfo = this.selectedData.value.educationInfo;

    let membershipData = {} as any;

    this.selectedData.value.numberOfPayments = this.count(
      this.selectedData.value.paymentHistory
    );

    membershipData.id = this.selectedData.value.id;
    membershipData.email = this.selectedData.value.email;

    membershipData.customerId = this.selectedData.value.customerId;
    membershipData.expirationDate = this.selectedData.value.expirationDate;
    membershipData.lifetimeDate = this.selectedData.value.lifetimeDate;
    membershipData.paymentHistory = this.selectedData.value.paymentHistory;
    membershipData.subscriptionId = this.selectedData.value.subscriptionId;
    membershipData.subscriptionStatus =
      this.selectedData.value.subscriptionStatus;
    membershipData.type = this.selectedData.value.type;
    membershipData.schoolInfo = this.selectedData.value.schoolInfo;
    membershipData.numberOfPayments = this.selectedData.value.numberOfPayments;

    this.userInfoService.createUserInfo(userInfoData).subscribe(() => {
      let foundInGrandAllData = this.grandAllData.filter(
        (item) => item.value.id === this.selectedData.value.id
      );
      if (foundInGrandAllData && foundInGrandAllData.length > 0) {
        foundInGrandAllData[0].value.userInfo =
          this.selectedData.value.userInfo;
        foundInGrandAllData[0].value.currentJob =
          this.selectedData.value.currentJob;
        foundInGrandAllData[0].value.kseaInfo =
          this.selectedData.value.kseaInfo;
        foundInGrandAllData[0].value.jobHistory =
          this.selectedData.value.jobHistory;
        foundInGrandAllData[0].value.educationInfo =
          this.selectedData.value.educationInfo;
      }

      this.membershipService
        .createMembership(membershipData, this.token)
        .subscribe(() => {
          if (foundInGrandAllData && foundInGrandAllData.length > 0) {
            foundInGrandAllData[0].value.customerId =
              this.selectedData.value.customerId;
            foundInGrandAllData[0].value.expirationDate =
              this.selectedData.value.expirationDate;
            foundInGrandAllData[0].value.lifetimeDate =
              this.selectedData.value.lifetimeDate;
            foundInGrandAllData[0].value.subscriptionId =
              this.selectedData.value.subscriptionId;
            foundInGrandAllData[0].value.subscriptionStatus =
              this.selectedData.value.subscriptionStatus;
            foundInGrandAllData[0].value.type = this.selectedData.value.type;
            foundInGrandAllData[0].value.schoolInfo =
              this.selectedData.value.schoolInfo;
            foundInGrandAllData[0].value.numberOfPayments =
              this.selectedData.value.numberOfPayments;
            foundInGrandAllData[0].value.paymentHistory =
              this.selectedData.value.paymentHistory;
          }

          this.editDisplay = false;
          this.selectedData = null;
          this.newJobInfo = {};
          this.newEduInfo = {} as any;
          this.newPaymentItem = {} as any;
          this.fixData(this.grandAllData);
        });
    });
  }

  count(paymentHistory: any[]) {
    let num = 0;

    if (paymentHistory && paymentHistory.length > 0) {
      for (const item of paymentHistory) {
        if (
          item.action === 'PayRegularMembership' ||
          item.action === 'PayLifetimeMembership' ||
          item.action === 'PayGraduateStudentMembership'
        )
          num = num + 1;
      }
    }

    return num;
  }

  addFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = reader.result
        ?.toString()
        .substring(reader.result?.toString().indexOf('base64,') + 7);
      const fileName = file.name;

      this.fileList.push({
        filename: fileName,
        content: base64Data,
        encoding: 'base64',
      });
      if (this.myInputVariable) this.myInputVariable.nativeElement.value = '';
    };
  }

  deleteFile(toBeDeleted: any) {
    this.fileList = this.fileList.filter(
      (item) => item.filename != toBeDeleted.filename
    );
  }

  sendSingleEmail(splitedValidEmailArrayList: any[]) {
    if (this.fileList && this.fileList.length > 0) {
      const data: any = {
        toEmails: splitedValidEmailArrayList[0],
        subject: this.subject,
        htmlMessage: this.content,
        attachments: this.fileList,
      };

      this.http
        .post<any>(
          this.apiURL + '/sendEmailWithAttachment',
          JSON.stringify(data),
          this.httpOptions
        )
        .subscribe(
          (res) => {
            console.log(res);
            if (splitedValidEmailArrayList.length > 1) {
              setTimeout(
                () => this.sendSingleEmail(splitedValidEmailArrayList.slice(1)),
                environment.adminConfig.sendingWaitingTime
              );
            } else {
              this.emailSending = false;
            }
          },
          (err) => {
            console.log(err);
            if (splitedValidEmailArrayList.length > 1) {
              setTimeout(
                () => this.sendSingleEmail(splitedValidEmailArrayList.slice(1)),
                environment.adminConfig.sendingWaitingTime
              );
            } else {
              this.emailSending = false;
            }
          }
        );
    } else {
      const data: any = {
        toEmails: splitedValidEmailArrayList[0],
        subject: this.subject,
        htmlMessage: this.content,
      };

      this.http
        .post<any>(
          this.apiURL + '/sendSimpleEmail',
          JSON.stringify(data),
          this.httpOptions
        )
        .subscribe(
          (res) => {
            console.log(res);
            if (splitedValidEmailArrayList.length > 1) {
              setTimeout(
                () => this.sendSingleEmail(splitedValidEmailArrayList.slice(1)),
                environment.adminConfig.sendingWaitingTime
              );
            } else {
              this.emailSending = false;
            }
          },
          (err) => {
            console.log(err);
            if (splitedValidEmailArrayList.length > 1) {
              setTimeout(
                () => this.sendSingleEmail(splitedValidEmailArrayList.slice(1)),
                environment.adminConfig.sendingWaitingTime
              );
            } else {
              this.emailSending = false;
            }
          }
        );
    }
  }

  sendEmail() {
    const expression: RegExp =
      /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

    if (this.name && this.email && this.subject && this.content) {
      this.emailSending = true;
      const emailsList = this.email.replace(/\s/g, '').split(',');

      const validEmailList: string[] = [];

      emailsList.forEach((email) => {
        if (expression.test(email)) validEmailList.push(email);
        else console.log(email);
      });
      validEmailList.push('hq@ksea.org');
      validEmailList.push('database@ksea.org');
      validEmailList.push('finance@ksea.org');
      validEmailList.push('itm@ksea.org');
      validEmailList.push('it@ksea.org');
      validEmailList.push('sejong@ksea.org');
      validEmailList.push('sent@ksea.org');

      console.log('I will send ' + validEmailList.length + ' emails.');

      const chunk = environment.adminConfig.numberOfEmailsPerSending;
      const splitedValidEmailArrayList = this.splitIntoChunk(
        validEmailList,
        chunk
      );

      this.sendSingleEmail(splitedValidEmailArrayList);
    }
  }

  splitIntoChunk(arr: any[], chunk: number) {
    const result = [];
    for (let index = 0; index < arr.length; index += chunk) {
      let tempArray;
      tempArray = arr.slice(index, index + chunk);
      result.push(tempArray);
    }
    return result;
  }
}
