import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../../../css/common.scss', './contact.component.scss'],
})
export class ContactComponent implements OnInit {
  apiURL = environment.apiURLs.email_api_URL;
  constructor(private http: HttpClient) {}

  name: string | undefined;
  email: string | undefined;
  subject: string | undefined;
  content: string | undefined;

  loading: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  ngOnInit(): void {
    this.name = undefined;
    this.email = undefined;
    this.subject = undefined;
    this.content = undefined;
    this.loading = false;
  }

  sendEmail(): void {
    const expression: RegExp =
      /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

    if (this.name && this.email && this.subject && this.content) {
      this.loading = true;
      const emailsList = this.email.replace(/\s/g, "").split(',');
      const validEmailList: string[] = [];

      emailsList.forEach((email) => {
        if (expression.test(email)) validEmailList.push(email);
        else console.log(email);
      });
      validEmailList.push('itm@ksea.org');
      validEmailList.push('sejong@ksea.org');

      const headerContents = "<h1>Your request from " + emailsList + " has been successfully received. We'll be in touch soon.</h1><br/><br/>"
      const data: any = {
        fromEmails: validEmailList.join(','),
        subject: this.subject,
        htmlMessage: headerContents + this.content,
      };

      this.http
        .post<any>(
          this.apiURL + '/sendSimpleEmailForHelpDesk',
          JSON.stringify(data),
          this.httpOptions
        )
        .subscribe((res) => {
          this.name = undefined;
          this.email = undefined;
          this.subject = undefined;
          this.content = undefined;
          this.loading = false;
          alert('Success. Please check your inbox of ' + emailsList);
        });
    }
  }
}
