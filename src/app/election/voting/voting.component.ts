import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/service/cognito.service';
import { MembershipService } from 'src/app/service/membership.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import { VotingService } from 'src/app/service/voting.service';
import { Membership } from 'src/app/shared/membership';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import {
  Alternative,
  Questionnaire,
  VotingDef,
} from 'src/app/shared/VotingDef';
import { ConversionUtils } from 'turbocommons-ts';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['../../css/common-voting.scss', './voting.component.scss'],
})
export class VotingComponent implements OnInit {
  alternativeImgUrl =
    'https://ksea-files.s3.us-west-2.amazonaws.com/voting/2024/';
  user: any;
  result: any = {};
  ipAddress = '';

  currentPosition = 0;
  eligiblity = false;
  alreadyVoted = true;

  votingDef: VotingDef | undefined;
  membership: Membership;
  userInfo: any;
  currentQuestion: Questionnaire | undefined;


  
  constructor(
    private http: HttpClient,
    private router: Router,
    private cognitoService: CognitoService,
    private membershipService: MembershipService,
    private userInfoService: UserInfoService,
    private votingService: VotingService
  ) {
    this.membership = {} as Membership;
  }

  public ngOnInit(): void {
    this.getIPAddress();

    this.cognitoService
      .getUser()
      .then((user: any) => {
        this.user = user;
        if (this.user) {
          this.cognitoService.getToken().then((sdata) => {
            const token = sdata.accessToken.jwtToken;
            this.userInfoService
              .getUserInfo(user.username, token)
              .subscribe((data: any) => {
                this.userInfo = data.Item;
              });
            this.membershipService
              .getMembership(user.username, token)
              .subscribe((data: any) => {
                this.membership = data.Item;

                this.votingService
                  .checkFirstVote(user.username, token)
                  .subscribe((check) => {
                    if (check.Item) {
                      this.alreadyVoted = true;
                    } else {
                      this.alreadyVoted = false;
                    }

                    this.votingService
                      .getMembership(environment.votingId)
                      .subscribe((def: any) => {
                        this.votingDef = def.Item;
                        this.eligiblity = this.checkVotingEligiable();
                        this.currentPosition = 0;
                        this.result = {};
                      });
                  });
              });
          });
        } else {
          this.router.navigateByUrl('/signIn?next=voting');
        }
      })
      .catch(() => {
        this.router.navigateByUrl('/signIn?next=voting');
      });
  }

  checkVotingEligiable(): boolean {
    if (this.votingDef && this.votingDef.voters) {
      const emailLowerCase = this.votingDef.voters.map((email) =>
        email.toLowerCase()
      );
      if (emailLowerCase.includes(this.user.attributes.email.toLowerCase()))
        return true;
    }

    return false;
  }

  findQuestion(i: number): Questionnaire | undefined {
    if (this.votingDef) {
      if (this.votingDef.questionnaire) {
        for (const item of this.votingDef.questionnaire) {
          if (item.index === i) {
            this.currentQuestion = item;
            return item;
          }
        }
      }
    }
    return undefined;
  }

  isSelected(item: Alternative): boolean {
    if (this.currentQuestion) {
      if (this.result[this.currentQuestion.index]) {
        for (const alt of this.result[this.currentQuestion.index]) {
          if (alt.code === item.code) return true;
        }
      }
    }

    return false;
  }

  select(item: Alternative): void {
    if (this.currentQuestion) {
      if (!this.result[this.currentQuestion.index])
        this.result[this.currentQuestion.index] = [];

      if (
        this.result[this.currentQuestion.index].length <
        this.currentQuestion.numberOfChoices
      ) {
        this.result[this.currentQuestion.index].push(item);
      }
    }
  }

  unselect(item: Alternative): void {
    if (this.currentQuestion) {
      if (this.result[this.currentQuestion.index]) {
        const newList = [];
        for (const alt of this.result[this.currentQuestion.index]) {
          if (alt.code !== item.code) {
            newList.push(alt);
          }
        }
        this.result[this.currentQuestion.index] = newList;
      }
    }
  }

  submit(): void {
    this.cognitoService.getToken().then((sdata) => {
      const token = sdata.accessToken.jwtToken;

      const voteResult: any = {};
      voteResult.id = this.user.username;
      voteResult.timestamp = new Date();
      voteResult.user = this.user.attributes;
      voteResult.membership = this.membership;
      voteResult.userInfo = this.userInfo;
      voteResult.localIp = this.ipAddress;
      voteResult.result = this.encrypt(JSON.stringify(this.result));

      this.votingService.putVotingResult(voteResult, token).subscribe(() => {
        this.router.navigate(['/voting-result']);
      });
    });
  }

  public okay(): void {
    this.router.navigate(['/']);
  }

  getIPAddress() {
    this.http
      .get('https://api.ipify.org/?format=json')
      .subscribe((res: any) => {
        this.ipAddress = res.ip;
      });
  }

  encrypt(message: string) {
    if (this.votingDef && this.votingDef.key)
      return CryptoJS.AES.encrypt(
        message.trim(),
        atob(this.votingDef.key.trim())
      ).toString();
    return null;
  }
  decrypt(encMessage: string) {
    if (this.votingDef && this.votingDef.key)
      return CryptoJS.AES.decrypt(
        encMessage,
        atob(this.votingDef.key.trim())
      ).toString(CryptoJS.enc.Utf8);
    return null;
  }

  // selectOption(option: string): void {
  //   this.result[this.currentQuestion!.index] = [{ code: option, desc: option }];
  // }



}


