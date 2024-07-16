import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/service/cognito.service';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { MembershipService } from 'src/app/service/membership.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import { Membership } from 'src/app/shared/membership';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['../../css/common.scss', './email.component.scss'],
})
export class EmailComponent implements OnInit {
  @ViewChild('myFileInput') myInputVariable: ElementRef | undefined;
  apiURL = environment.apiURLs.email_api_URL;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cognitoService: CognitoService,
    private membershipService: MembershipService,
    private userInfoService: UserInfoService,
    private kseaInfoService: KseaInfoService
  ) {}

  localChapter: string | undefined;
  aps: string | undefined;
  tg: string | undefined;
  name: string | undefined;
  email: string | undefined;
  subject: string | undefined;
  content: string | undefined;
  fileList: any[] = [];
  token: string = '';
  user: any = null;
  fromDate: string | undefined;
  toDate: string | undefined;

  loading: boolean = false;
  membershipDataloading: boolean = false;
  membershipAllData: any[] = [];
  userInfoDataloading: boolean = false;
  userInfoAllData: any[] = [];
  userCognitoDataloading: boolean = false;
  userCognitoAllData: any[] = [];
  grandAllData: any[] = [];
  filteredData: any[] = [];
  grandAllData_map = new Map();

  kseaInfo: any;

  bucketSize = 500;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public ngOnInit(): void {
    this.localChapter = undefined;
    this.aps = undefined;
    this.tg = undefined;
    this.name = undefined;
    this.email = undefined;
    this.subject = undefined;
    this.content = undefined;
    this.fileList = [];
    this.loading = false;

    this.membershipDataloading = false;
    this.membershipAllData = [];

    this.userInfoDataloading = false;
    this.userInfoAllData = [];
    this.grandAllData = [];
    this.grandAllData_map = new Map();
    this.filteredData = [];

    this.userCognitoDataloading = false;
    this.userCognitoAllData = [];

    this.kseaInfoService.getKSEAInfo().subscribe((res) => {
      this.kseaInfo = res.Item;
      this.kseaInfoService.setKSEAInfo(res);
    });

    this.cognitoService
      .getUser()
      .then((user: any) => {
        this.user = user;
        const newMemberShip: Membership = {} as Membership;
        this.cognitoService.getToken().then((sdata) => {
          this.token = sdata.accessToken.jwtToken;

          this.membershipDataloading = true;
          this.userInfoDataloading = true;
          this.getAllMData();
          this.getAllUData();
          this.getAllCData(null);
        });
      })
      .catch(() => {
        this.router.navigate(['/signIn']);
      });
  }

  getAllCData(token: any) {
    this.userCognitoDataloading = true;
    let tokenData: any = {};
    tokenData.PaginationToken = token;
    this.http
      .put<any>(
        environment.apiURLs.cognito_api_URL + '/ksea-user/listusers',
        JSON.stringify(tokenData),
        this.httpOptions
      )
      .subscribe((data: any) => {
        this.userCognitoAllData = this.userCognitoAllData.concat(data.Users);
        console.log(this.userCognitoAllData.length);
        if (data.PaginationToken) {
          this.getAllCData(data.PaginationToken);
        } else {
          this.userCognitoDataloading = false;
          console.log(this.userCognitoAllData);

          this.userCognitoAllData.forEach((item: any) => {
            if (!this.grandAllData_map.get(item.Username)) {
            } else {
              this.grandAllData_map.set(
                item.Username,
                Object.assign(
                  {},
                  this.grandAllData_map.get(item.Username),
                  item
                )
              );
            }
          });
        }
      });
  }

  getAllMData() {
    this.membershipService
      .getAllMemberships(this.token)
      .subscribe((data: any) => {
        this.membershipAllData = this.membershipAllData.concat(data.Items);
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
          this.membershipDataloading = false;
        }
      });
  }

  getAllUData() {
    this.userInfoService.getAllUserInfos(this.token).subscribe((data: any) => {
      this.userInfoAllData = this.userInfoAllData.concat(data.Items);
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
        this.userInfoDataloading = false;
      }
    });
  }

  getNextMData(key: string) {
    this.membershipService
      .getAllMembershipsFromKey(this.token, key)
      .subscribe((data: any) => {
        this.membershipAllData = this.membershipAllData.concat(data.Items);
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
          this.membershipDataloading = false;
        }
      });
  }

  getNextUData(key: string) {
    this.userInfoService
      .getAllUserInfosFromKey(this.token, key)
      .subscribe((data: any) => {
        this.userInfoAllData = this.userInfoAllData.concat(data.Items);
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
          this.userInfoDataloading = false;
        }
      });
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

  sendSingleEmail(toEmails: any[]) {
    if (this.fileList && this.fileList.length > 0) {
      const data: any = {
        toEmails: toEmails,
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
        .subscribe((res) => {});
    } else {
      const data: any = {
        toEmails: toEmails,
        subject: this.subject,
        htmlMessage: this.content,
      };

      this.http
        .post<any>(
          this.apiURL + '/sendSimpleEmail',
          JSON.stringify(data),
          this.httpOptions
        )
        .subscribe((res) => {});
    }
  }

  sendEmail() {
    const expression: RegExp =
      /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

    if (this.name && this.email && this.subject && this.content) {
      this.loading = true;
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
      alert(validEmailList.length + ' emails ' + 'will be sent.');
      this.sendSingleEmail(validEmailList);
      this.loading = false;
    }
  }

  resetFilter() {
    const keys = Array.from(this.grandAllData_map.keys());
    this.filteredData = [];

    keys.forEach((key) => {
      this.filteredData.push(this.grandAllData_map.get(key));
      this.grandAllData.push(this.grandAllData_map.get(key));
    });

    this.localChapter = undefined;
    this.aps = undefined;
    this.tg = undefined;
    this.fromDate = undefined;
    this.toDate = undefined;
    console.log(this.filteredData);
  }

  setEmail() {
    this.email = this.filteredData.map((item) => item.email).join(',');
  }

  downloadCSV() {
    console.log(this.filteredData);

    let data =
      'id,email,title,gender,family_name,given_name,address,city,state,zipcode,UserStatus,UserCreateDate,UserLastModifiedDate,type,aps1,aps2,aps3,group1,group2,keywords,localChapter,specialty,expirationDate,lifetimeDate,numberOfPayments,employer,jobTitle,job_city,job_state,education,lastPaymentAction\n';
    this.filteredData.forEach((item) => {
      data = data + this.replaceCSVValue(item.id);
      data = data + ',' + this.replaceCSVValue(item.email);
      data = data + ',' + this.getCognitoAttr(item.Attributes, 'custom:title');
      data = data + ',' + this.getCognitoAttr(item.Attributes, 'gender');
      data = data + ',' + this.getCognitoAttr(item.Attributes, 'family_name');
      data = data + ',' + this.getCognitoAttr(item.Attributes, 'given_name');
      data = data + ',' + this.getCognitoAttr(item.Attributes, 'address');
      data = data + ',' + this.getCognitoAttr(item.Attributes, 'custom:city');
      data = data + ',' + this.getCognitoAttr(item.Attributes, 'custom:state');
      data =
        data +
        ',' +
        this.replaceCSVValue(
          'ZIP:' + this.getCognitoAttr(item.Attributes, 'custom:zipcode')
        );
      
      data = data + ',' + this.replaceCSVValue(item.UserStatus);
      data = data + ',' + this.replaceCSVValue(item.UserCreateDate);
      data = data + ',' + this.replaceCSVValue(item.UserLastModifiedDate);
      data = data + ',' + this.replaceCSVValue(item.type);
      if (item.kseaInfo) {
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.aps1);
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.aps2);
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.aps3);
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.group1);
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.group2);
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.keywords);
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.localChapter);
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.specialty);
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



      //Joseph's addition
      // if (item.userInfo) {
      //   data = data + ',' + this.replaceCSVValue(item.userInfo.birthdate);
      //   data = data + ',' + this.replaceCSVValue(item.userInfo.phone_number);
      // } else {
      //   data = data + ',';
      //   data = data + ',';
      // }




      data = data + ',' + this.replaceCSVValue(item.expirationDate);
      data = data + ',' + this.replaceCSVValue(item.lifetimeDate);
      data = data + ',' + this.replaceCSVValue('' + item.numberOfPayments);

      if (item.currentJob) {
        data = data + ',' + this.replaceCSVValue(item.currentJob.employer);
        data = data + ',' + this.replaceCSVValue(item.currentJob.jobTitle);
        data = data + ',' + this.replaceCSVValue(item.currentJob.city);
        data = data + ',' + this.replaceCSVValue(item.currentJob.state);
      } else {
        data = data + ',';
        data = data + ',';
        // data = data + ',';
        // data = data + ',';
      }
      if (item.educationInfo && item.educationInfo.length > 0) {
        let eduStr = '';
        for (const edu of item.educationInfo) {
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

      data = data + ',' + this.findLastPaymentAction(item.paymentHistory);
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

  replaceCSVValue(innerValue: string) {
    innerValue = innerValue ? innerValue : '';
    let result = innerValue.replace(/"/g, '""');
    if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
    return result;
  }

  getCognitoAttr(attrs: any[], name: string) {
    if (attrs) {
      const found = attrs.filter((value) => value.Name === name);
      if (found && found.length > 0)
        return this.replaceCSVValue(found[0].Value);
    }

    return '';
  }

  filterByPayPeriod() {
    if (!this.filteredData || this.filteredData.length === 0)
      this.resetFilter();
    this.filteredData = this.filteredData
      .filter(
        (value) =>
          value.type === 'Lifetime' ||
          (value.expirationDate &&
            this.fromDate &&
            this.toDate &&
            this.checkDate(this.fromDate, this.toDate, value.expirationDate))
      )
      .map((item) => item);
    console.log(this.filteredData);
  }

  unpaidFilter() {
    this.filteredData = this.filteredData
      .filter(
        (value) =>
          value.type !== 'Lifetime' &&
          value.type !== 'Regular' &&
          value.type !== 'Student'
      )
      .map((item) => item);
    console.log(this.filteredData);
  }

  lifetimeFilter() {
    this.filteredData = this.filteredData
      .filter((value) => value.type === 'Lifetime')
      .map((item) => item);
    console.log(this.filteredData);
  }

  regularFilter() {
    this.filteredData = this.filteredData
      .filter((value) => value.type === 'Regular')
      .map((item) => item);
    console.log(this.filteredData);
  }

  graduateFilter() {
    this.filteredData = this.filteredData
      .filter(
        (value) =>
          value.type === 'Student' &&
          value.schoolInfo &&
          value.schoolInfo.type === 'Graduate'
      )
      .map((item) => item);
    console.log(this.filteredData);
  }

  undergraduateFilter() {
    this.filteredData = this.filteredData
      .filter(
        (value) =>
          value.type === 'Student' &&
          value.schoolInfo &&
          value.schoolInfo.type === 'Undergraduate'
      )
      .map((item) => item);
    console.log(this.filteredData);
  }

  chapterFilter() {
    this.filteredData = this.filteredData
      .filter(
        (value) =>
          value.kseaInfo && value.kseaInfo.localChapter === this.localChapter
      )
      .map((item) => item);
    console.log(this.filteredData);
  }

  apsFilter() {
    this.filteredData = this.filteredData
      .filter(
        (value) =>
          value.kseaInfo &&
          (value.kseaInfo.aps1 === this.aps ||
            value.kseaInfo.aps2 === this.aps ||
            value.kseaInfo.aps3 === this.aps)
      )
      .map((item) => item);
    console.log(this.filteredData);
  }

  tgFilter() {
    this.filteredData = this.filteredData
      .filter(
        (value) =>
          value.kseaInfo &&
          (value.kseaInfo.group1 === this.tg ||
            value.kseaInfo.group2 === this.tg)
      )
      .map((item) => item);
    console.log(this.filteredData);
  }

  checkPaymentNumberData() {
    const filtered = this.membershipAllData
      .filter(
        (value) =>
          !value.numberOfPayments ||
          Number(value.numberOfPayments) !== this.count(value.paymentHistory)
      )
      .map((item) => item);

    filtered.forEach((item) => {
      item.numberOfPayments = this.count(item.paymentHistory);
    });

    const list: any[] = [];

    for (let i = 0; i < filtered.length; i = i + 50) {
      const newList = filtered.slice(i, i + 50);
      list.push(newList);
    }

    this.processArray1(list);
    console.log(list);
  }

  checkExpiredUsers() {
    const filtered = this.membershipAllData
      .filter(
        (value) =>
          value.type !== 'Lifetime' &&
          value.type !== 'Unpaid' &&
          value.expirationDate &&
          this.checkExpiringDateByToday(value.expirationDate)
      )
      .map((item) => item);

    filtered.forEach((item) => {
      item.type = 'Unpaid';
    });

    const list: any[] = [];

    for (let i = 0; i < filtered.length; i = i + 50) {
      const newList = filtered.slice(i, i + 50);
      list.push(newList);
    }

    this.processArray1(list);
    console.log(list);
  }

  isGraduate(item: any) {
    let result = false;

    if (item && item.paymentHistory) {
      for (const part of item.paymentHistory) {
        if (part.action === 'PayGraduateStudentMembership') result = true;
      }
    }

    return result;
  }

  updateMembershipData() {
    const found = this.membershipAllData
      .filter(
        (value) =>
          value.type !== 'Lifetime' &&
          value.type !== 'Regular' &&
          value.type !== 'Student'
      )
      .map((item) => item);

    
      console.log(this.membershipAllData);

      found.forEach((item)=>{
        if(item.paymentHistory) {
          let current = 0;
          let action = '';
          item.paymentHistory.forEach((payItem:any)=> {
            const thisDate = Date.parse(payItem.date);
            if(current < thisDate) {
              if(payItem.action === 'PayUndergraduateStudentMembership' || payItem.action === 'PayGraduateStudentMembership' || payItem.action === 'PayRegularMembership') {
                current = thisDate;
                action = payItem.action;
              }
            }
          });
          if(action === 'PayUndergraduateStudentMembership') {
            item.type = 'Student';
            if(!item.schoolInfo) item.schoolInfo = {};
            item.schoolInfo.type = 'Undergraduate';
          }

          if(action === 'PayGraduateStudentMembership') {
            item.type = 'Student';
            if(!item.schoolInfo) item.schoolInfo = {};
            item.schoolInfo.type = 'Graduate';
          }

          if(action === 'PayRegularMembership') {
            item.type = 'Regular';
          }
        }
      });

      console.log(found);

    const list: any[] = [];

    for (let i = 0; i < found.length; i = i + 50) {
      const newList = found.slice(i, i + 50);
      list.push(newList);
    }

    this.processArray1(list);
  }

  updateUserData() {
    this.userCognitoAllData.forEach((item) => {
      let found = this.userInfoAllData.find(element=> element.id === item.Username);
      if(found) {
        found.userInfo = {};
        found.userInfo.address = this.getCognitoAttr(item.Attributes, 'address');
        found.userInfo.birthdate = this.getCognitoAttr(item.Attributes, 'birthdate');
        found.userInfo.city = this.getCognitoAttr(item.Attributes, 'custom:city');
        found.userInfo.state = this.getCognitoAttr(item.Attributes, 'custom:state');
        found.userInfo.title = this.getCognitoAttr(item.Attributes, 'custom:title');
        found.userInfo.zipcode = this.getCognitoAttr(item.Attributes, 'custom:zipcode');
        found.userInfo.family_name = this.getCognitoAttr(item.Attributes, 'family_name');
        found.userInfo.gender = this.getCognitoAttr(item.Attributes, 'gender');
        found.userInfo.given_name = this.getCognitoAttr(item.Attributes, 'given_name');
        found.userInfo.middle_name = this.getCognitoAttr(item.Attributes, 'middle_name');
        found.userInfo.ksea_old_number = this.getCognitoAttr(item.Attributes, 'name');
        found.userInfo.phone_number = this.getCognitoAttr(item.Attributes, 'phone_number');
        found.userInfo.website = this.getCognitoAttr(item.Attributes, 'website');
        found.userInfo.ukc = this.getCognitoAttr(item.Attributes, 'custom:ukc');
      } else {
        found = {};
        found.id = item.Username;
        found.email = this.getCognitoAttr(item.Attributes, 'email');
        found.userInfo = {};
        found.userInfo.address = this.getCognitoAttr(item.Attributes, 'address');
        found.userInfo.birthdate = this.getCognitoAttr(item.Attributes, 'birthdate');
        found.userInfo.city = this.getCognitoAttr(item.Attributes, 'custom:city');
        found.userInfo.state = this.getCognitoAttr(item.Attributes, 'custom:state');
        found.userInfo.title = this.getCognitoAttr(item.Attributes, 'custom:title');
        found.userInfo.zipcode = this.getCognitoAttr(item.Attributes, 'custom:zipcode');
        found.userInfo.family_name = this.getCognitoAttr(item.Attributes, 'family_name');
        found.userInfo.gender = this.getCognitoAttr(item.Attributes, 'gender');
        found.userInfo.given_name = this.getCognitoAttr(item.Attributes, 'given_name');
        found.userInfo.middle_name = this.getCognitoAttr(item.Attributes, 'middle_name');
        found.userInfo.ksea_old_number = this.getCognitoAttr(item.Attributes, 'name');
        found.userInfo.phone_number = this.getCognitoAttr(item.Attributes, 'phone_number');
        found.userInfo.website = this.getCognitoAttr(item.Attributes, 'website');

        this.userInfoAllData.push(found);
      }
    });

    console.log(this.userInfoAllData);

    const list: any[] = [];

    for (let i = 0; i < this.userInfoAllData.length; i = i + 50) {
      const newList = this.userInfoAllData.slice(i, i + 50);
      list.push(newList);
    }

    this.processArray2(list);
  }

  async processArray2(list: any[]) {
    let index = 1;
    for (const item of list) {
      await this.delayedPushMessage2(item);
      console.log(index + '/' + list.length, item);
      index = index + 1;
    }
    alert('Your message has been sent.');
  }

  async delayedPushMessage2(data: any) {
    await this.myDelay();

    this.userInfoService
      .batchUserInfos(data)
      .subscribe((res) => console.log(res));
  }

  checkMembershipType() {
    const filtered = this.membershipAllData
      .filter(
        (value) =>
          value.type === 'Student' ||
          value.type === 'Graduate' ||
          value.type === 'Undergraduate'
      )
      .map((item) => item);

    filtered.forEach((item) => {
      if (this.isGraduate(item)) {
        item.type = 'Student';
        item.schoolInfo = {};
        item.schoolInfo.type = 'Graduate';
        item.currentJob = undefined;
        item.educationInfo = undefined;
        item.kseaInfo = undefined;
      } else {
        item.type = 'Student';
        item.schoolInfo = {};
        item.schoolInfo.type = 'Undergraduate';
        item.currentJob = undefined;
        item.educationInfo = undefined;
        item.kseaInfo = undefined;
      }

      // if (item.type === 'Graduate') {
      //   item.type = 'Student';
      //   item.schoolInfo = {};
      //   item.schoolInfo.type = 'Graduate';
      // } else if (item.type === 'Undergraduate') {
      //   item.type = 'Student';
      //   item.schoolInfo = {};
      //   item.schoolInfo.type = 'Undergraduate';
      // }
    });

    const list: any[] = [];

    for (let i = 0; i < filtered.length; i = i + 50) {
      const newList = filtered.slice(i, i + 50);
      list.push(newList);
    }

    this.processArray1(list);
    console.log(list);
  }

  async processArray1(list: any[]) {
    let index = 1;
    for (const item of list) {
      await this.delayedPushMessage1(item);
      console.log(index + '/' + list.length, item);
      index = index + 1;
    }
    alert('Your message has been sent.');
  }

  async delayedPushMessage1(data: any) {
    await this.myDelay();

    this.membershipService
      .batchMemberships(data)
      .subscribe((res) => console.log(res));
  }

  myDelay() {
    return new Promise((resolve) => setTimeout(resolve, 6000));
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

  checkDate(from: string, to: string, checkDate: string) {
    const fromDateNum = Date.parse(from);
    const toDateNum = Date.parse(to);
    const checkDateNum = Date.parse(checkDate);

    return fromDateNum <= checkDateNum && checkDateNum <= toDateNum;
  }

  checkExpiringDateByToday(expiringDate: string) {
    const expiringDateNum = Date.parse(expiringDate);
    const todayNum = new Date().getTime();
    return expiringDateNum <= todayNum;
  }

  subsidy() {
    let data =
      'Membership Payment Date,Membership Payment Amount, Membership Type, LifetimePayDate,LifetimePayAmount, id,email,title,gender,family_name,given_name,address,city,state,zipcode,UserStatus,UserCreateDate,UserLastModifiedDate,type,aps1,aps2,aps3,group1,group2,keywords,localChapter,specialty,expirationDate,lifetimeDate,numberOfPayments,employer,jobTitle,job_city,job_state,education,lastPaymentAction\n';

    this.grandAllData.forEach((item) => {
      if(item.paymentHistory){
        item.paymentHistory.forEach((pItem:any) => {
          if(pItem.action === 'PayGraduateStudentMembership' || pItem.action === 'PayRegularMembership' || pItem.action === 'PayLifetimeMembership') {
            const paymentDateNum = Date.parse(pItem.date);
            const from = Date.parse("2022-05-01T05:00:00.000Z");
            const to = Date.parse("2023-07-01T08:00:00.000Z");

            if(from < paymentDateNum && paymentDateNum < to) {
              data = data + this.replaceCSVValue(pItem.date);

              if(pItem.action === 'PayGraduateStudentMembership') {
                data = data + ',' + 'GraduateStudent';
              }else if (pItem.action === 'PayRegularMembership'){
                data = data + ',' + 'Regular';
              }else if (pItem.action === 'PayLifetimeMembership'){
                data = data + ',' + 'Lifetime';
              }

              data = data + ',' + this.replaceCSVValue(''+pItem.amounts);
              
              data = data + ',' + this.replaceCSVValue(pItem.date);
              data = data + ',' + this.replaceCSVValue(item.id);
      data = data + ',' + this.replaceCSVValue(item.email);
      data = data + ',' + this.getCognitoAttr(item.Attributes, 'custom:title');
      data = data + ',' + this.getCognitoAttr(item.Attributes, 'gender');
      data = data + ',' + this.getCognitoAttr(item.Attributes, 'family_name');
      data = data + ',' + this.getCognitoAttr(item.Attributes, 'given_name');
      data = data + ',' + this.getCognitoAttr(item.Attributes, 'address');
      data = data + ',' + this.getCognitoAttr(item.Attributes, 'custom:city');
      data = data + ',' + this.getCognitoAttr(item.Attributes, 'custom:state');
      data =
        data +
        ',' +
        this.replaceCSVValue(
          'ZIP:' + this.getCognitoAttr(item.Attributes, 'custom:zipcode')
        );
      data = data + ',' + this.replaceCSVValue(item.UserStatus);
      data = data + ',' + this.replaceCSVValue(item.UserCreateDate);
      data = data + ',' + this.replaceCSVValue(item.UserLastModifiedDate);
      data = data + ',' + this.replaceCSVValue(item.type);
      if (item.kseaInfo) {
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.aps1);
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.aps2);
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.aps3);
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.group1);
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.group2);
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.keywords);
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.localChapter);
        data = data + ',' + this.replaceCSVValue(item.kseaInfo.specialty);
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

      data = data + ',' + this.replaceCSVValue(item.expirationDate);
      data = data + ',' + this.replaceCSVValue(item.lifetimeDate);
      data = data + ',' + this.replaceCSVValue('' + item.numberOfPayments);

      if (item.currentJob) {
        data = data + ',' + this.replaceCSVValue(item.currentJob.employer);
        data = data + ',' + this.replaceCSVValue(item.currentJob.jobTitle);
        data = data + ',' + this.replaceCSVValue(item.currentJob.city);
        data = data + ',' + this.replaceCSVValue(item.currentJob.state);
      } else {
        data = data + ',';
        data = data + ',';
        data = data + ',';
        data = data + ',';
      }
      if (item.educationInfo && item.educationInfo.length > 0) {
        let eduStr = '';
        for (const edu of item.educationInfo) {
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

      data = data + ',' + this.findLastPaymentAction(item.paymentHistory);
      data = data + '\n';
            }
          }
        });
      }
    });

    const a = document.createElement('a');
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'subsidyList.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
