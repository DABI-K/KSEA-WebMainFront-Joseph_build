import { Component, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { CognitoService } from 'src/app/service/cognito.service';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { VotingService } from 'src/app/service/voting.service';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-keyholder',
  templateUrl: './keyholder.component.html',
  styleUrls: [
    '../../css/common.scss',
    '../../css/common-voting.scss',
    './keyholder.component.scss',
  ],
})
export class KeyholderComponent {
  @ViewChildren(BaseChartDirective) charts:
    | QueryList<BaseChartDirective>
    | undefined;
  user: any;
  token: any;
  totalNum = 0;
  votingResult: any[] = [];
  stats: any;
  firstKey: string = '';
  secondKey: string = '';
  votingDef: any = null;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private votingService: VotingService,
    private kseaInfoService: KseaInfoService
  ) {}

  ngOnInit(): void {
    this.votingResult = [];
    this.stats = undefined;

    this.votingService
      .getMembership(environment.votingId)
      .subscribe((def: any) => {
        this.votingDef = def.Item;
        this.totalNum = this.votingDef.votersStats.total;
      });
    this.cognitoService
      .getUser()
      .then((user: any) => {
        this.user = user;
        this.cognitoService.getToken().then((sdata) => {
          this.token = sdata.accessToken.jwtToken;
        });
      })
      .catch(() => {
        this.router.navigate(['/signIn']);
      });
  }

  submit() {
    this.votingResult = [];
    this.stats = undefined;
    this.getVotingResults(null);
  }

  getVotingResults(lastEvaluatedKey: string | null) {
    if (!lastEvaluatedKey) {
      this.votingService.getAllVotingResults(this.token).subscribe((data) => {
        this.votingResult = data.Items;
        if (data.LastEvaluatedKey) {
          this.getVotingResults(data.LastEvaluatedKey.id);
        } else {
          this.genResult();
        }
      });
    } else {
      this.votingService
        .getNextVotingResults(this.token, lastEvaluatedKey)
        .subscribe((data2) => {
          this.votingResult = [...this.votingResult, ...data2.Items];

          if (data2.LastEvaluatedKey) {
            this.getVotingResults(data2.LastEvaluatedKey.id);
          } else {
            this.genResult();
          }
        });
    }
  }

  genResult() {
    this.votingService
      .getMembership(environment.votingId)
      .subscribe((def: any) => {
        this.stats = def.Item.questionnaire;

        this.votingResult.forEach((item) => {
          try {
            const parsedResult = JSON.parse(this.decrypt(item.result));
            const resultMap = new Map<string, any[]>(
              Object.entries(parsedResult)
            );
            let keys = Array.from(resultMap.keys());
            keys.forEach((key: any) => {
              const votes = resultMap.get(key);
              if (votes)
                votes.forEach((vote: any) => {
                  const found = this.stats
                    .filter((value: any) => value.index === Number(key))[0]
                    .listAlternatives.filter(
                      (value: any) => value.code === vote.code
                    )[0];

                  if (!found.count) found.count = 0;

                  found.count++;
                });
            });
          } catch (e) {
            this.votingResult = [];
            this.stats = undefined;
            alert('Key is invalid!');
          }
        });
      });
  }

  decrypt(encMessage: string) {
    return CryptoJS.AES.decrypt(
      encMessage,
      // environment.key.trim()
      this.firstKey.trim() + this.secondKey.trim()
    ).toString(CryptoJS.enc.Utf8);
  }

  downloadCSV() {
    let data = '2024 KSEA Election Results\n';
    data += 'Date:,' + new Date() + '\n\n';

    for (const item of this.stats) {
      data += item.question + ' (How many?:' + item.numberOfChoices + ')\n';
      data += 'Name,Votes,Total,Rate(%)\n';
      for (const a of item.listAlternatives) {
        if (a.count) {
          data +=
            this.replaceCSVValue(a.desc) +
            ',' +
            a.count +
            ',' +
            this.totalNum +
            ',' +
            (a.count / this.totalNum) * 100 +
            '%' +
            '\n';
        } else {
          data +=
            this.replaceCSVValue(a.desc) +
            ',' +
            0 +
            ',' +
            this.totalNum +
            ',' +
            '0%' +
            '\n';
        }
      }
      data += '\n';
    }

    data +=
      'id,ip,email,title,family_name,given_name,address,city,state,zipcode,type,aps1,aps2,aps3,group1,group2,keywords,localChapter,specialty,employer,jobTitle,job_city,job_state\n';
    this.votingResult.forEach((item) => {
      console.log(item);
      data = data + this.replaceCSVValue(item.id);
      data = data + ',' + this.replaceCSVValue(item.localIp);
      data = data + ',' + this.replaceCSVValue(item.user['email']);
      data = data + ',' + this.replaceCSVValue(item.user['custom:title']);
      data = data + ',' + this.replaceCSVValue(item.user['family_name']);
      data = data + ',' + this.replaceCSVValue(item.user['given_name']);
      data = data + ',' + this.replaceCSVValue(item.user['address']);
      data = data + ',' + this.replaceCSVValue(item.user['custom:city']);
      data = data + ',' + this.replaceCSVValue(item.user['custom:state']);
      data =
        data + ',' + 'ZIP:' + this.replaceCSVValue(item.user['custom:zipcode']);

      if (item.membership)
        data = data + ',' + this.replaceCSVValue(item.membership.type);
      else data = data + ',';
      if (item.userInfo && item.userInfo.kseaInfo) {
        data = data + ',' + this.replaceCSVValue(item.userInfo.kseaInfo.aps1);
        data = data + ',' + this.replaceCSVValue(item.userInfo.kseaInfo.aps2);
        data = data + ',' + this.replaceCSVValue(item.userInfo.kseaInfo.aps3);
        data = data + ',' + this.replaceCSVValue(item.userInfo.kseaInfo.group1);
        data = data + ',' + this.replaceCSVValue(item.userInfo.kseaInfo.group2);
        data =
          data + ',' + this.replaceCSVValue(item.userInfo.kseaInfo.keywords);
        data =
          data +
          ',' +
          this.replaceCSVValue(item.userInfo.kseaInfo.localChapter);
        data =
          data + ',' + this.replaceCSVValue(item.userInfo.kseaInfo.specialty);
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

      if (item.userInfo && item.userInfo.currentJob) {
        data =
          data + ',' + this.replaceCSVValue(item.userInfo.currentJob.employer);
        data =
          data + ',' + this.replaceCSVValue(item.userInfo.currentJob.jobTitle);
        data = data + ',' + this.replaceCSVValue(item.userInfo.currentJob.city);
        data =
          data + ',' + this.replaceCSVValue(item.userInfo.currentJob.state);
      } else {
        data = data + ',';
        data = data + ',';
        data = data + ',';
        data = data + ',';
      }
      data = data + '\n';
    });
    const a = document.createElement('a');
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'votingResults.csv';
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
}
