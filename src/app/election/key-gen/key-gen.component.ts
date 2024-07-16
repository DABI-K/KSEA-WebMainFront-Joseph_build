import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VotingService } from 'src/app/service/voting.service';
import { environment } from '../../../environments/environment';
import { CognitoService } from 'src/app/service/cognito.service';

@Component({
  selector: 'app-key-gen',
  templateUrl: './key-gen.component.html',
  styleUrls: ['../../css/common-voting.scss', './key-gen.component.scss'],
})
export class KeyGenComponent implements OnInit {
  apiURL = environment.apiURLs.email_api_URL;
  firstKeyHolderEmail: string = '';
  secondKeyHolderEmail: string = '';
  thirdKeyHolderEmail: string = '';
  forthKeyHolderEmail: string = '';
  votingDef: any;
  token: any;
  user: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private votingService: VotingService,
    private cognitoService: CognitoService
  ) {}

  ngOnInit(): void {
    this.firstKeyHolderEmail = '';
    this.secondKeyHolderEmail = '';
    this.thirdKeyHolderEmail = '';
    this.forthKeyHolderEmail = '';
    this.votingService
      .getMembership(environment.votingId)
      .subscribe((def: any) => {
        this.votingDef = def.Item;

        this.cognitoService
          .getUser()
          .then((user: any) => {
            this.user = user;
            if (this.isManager()) {
              this.cognitoService.getToken().then((sdata) => {
                this.token = sdata.accessToken.jwtToken;
              });
            } else {
              this.router.navigate(['/']);
            }
          })
          .catch(() => {
            this.router.navigate(['/signIn']);
          });
      });
  }

  isManager() {
    if (environment.votingManagers.includes(this.user.attributes.email))
      return true;
    return false;
  }

  randomString(length: number) {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  submit() {
    const key = this.randomString(16);
    this.votingDef.key = btoa(key);

    const data: any = {
      toEmails: [this.user.attributes.email],
      subject: 'Full Key',
      htmlMessage: key,
    };

    const data1: any = {
      toEmails: [this.firstKeyHolderEmail, this.thirdKeyHolderEmail],
      subject: 'First Key',
      htmlMessage: key.substring(0, 8),
    };

    const data2: any = {
      toEmails: [this.secondKeyHolderEmail, this.forthKeyHolderEmail],
      subject: 'Second Key',
      htmlMessage: key.substring(8),
    };

    this.http
      .post<any>(
        this.apiURL + '/sendSimpleEmail',
        JSON.stringify(data),
        this.httpOptions
      )
      .subscribe((res) => {
        this.http
          .post<any>(
            this.apiURL + '/sendSimpleEmail',
            JSON.stringify(data1),
            this.httpOptions
          )
          .subscribe((res) => {
            this.http
              .post<any>(
                this.apiURL + '/sendSimpleEmail',
                JSON.stringify(data2),
                this.httpOptions
              )
              .subscribe((res) => {
                this.votingService
                  .putVotingDef(this.votingDef)
                  .subscribe(() => {
                    this.router.navigate(['/']);
                  });
              });
          });
      });
  }
}
