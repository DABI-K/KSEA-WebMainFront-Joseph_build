import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/service/cognito.service';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import { VotingService } from 'src/app/service/voting.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { VotingDef } from 'src/app/shared/VotingDef';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: [
    '../../css/common.scss',
    '../../css/common-voting.scss',
    './monitor.component.scss',
  ],
})
export class MonitorComponent implements OnInit {
  @ViewChildren(BaseChartDirective) charts:
    | QueryList<BaseChartDirective>
    | undefined;
  user: any;
  token: any;
  votingResult: any[] = [];
  votingDef: any = null;
  stats: any;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private votingService: VotingService,
    private kseaInfoService: KseaInfoService
  ) {}

  ngOnInit(): void {
    this.votingResult = [];
    this.votingService
      .getMembership(environment.votingId)
      .subscribe((def: any) => {
        this.votingDef = { ...def.Item };
        this.stats = { ...def.Item.votersStats };

        this.overviewtData.labels = this.votingDef.votersStats.votingDates.map(
          (a: any) => a.date
        );
        this.overviewtData.datasets[0].data =
          this.votingDef.votersStats.votingDates.map((a: any) => a.count);
        this.apsData.labels = this.votingDef.votersStats.aps.map(
          (a: any) => a.code
        );
        this.apsData.datasets[0].data = this.votingDef.votersStats.aps.map(
          (a: any) => a.count
        );
        this.chapterData.labels = this.votingDef.votersStats.chapters.map(
          (a: any) => a.name
        );
        this.chapterData.datasets[0].data =
          this.votingDef.votersStats.chapters.map((a: any) => a.count);
        this.groupData.labels = this.votingDef.votersStats.groups.map(
          (a: any) => a.code
        );
        this.groupData.datasets[0].data = this.votingDef.votersStats.groups.map(
          (a: any) => a.count
        );

        this.cognitoService
          .getUser()
          .then((user: any) => {
            this.user = user;
            if (this.isMonitor()) {
              this.cognitoService.getToken().then((sdata) => {
                this.token = sdata.accessToken.jwtToken;
                this.getVotingResults(null);
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

  getVotingResults(lastEvaluatedKey: string | null) {
    if (!lastEvaluatedKey) {
      this.votingService.getAllVotingResults(this.token).subscribe((data) => {
        this.votingResult = data.Items;
        if (data.LastEvaluatedKey) {
          this.getVotingResults(data.LastEvaluatedKey.id);
        } else {
          this.countVoting();
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
            this.countVoting();
          }
        });
    }
  }

  countVoting() {
    this.votingResult.forEach((item) => {
      this.countDate(item.timestamp);
      if (item && item.userInfo && item.userInfo.kseaInfo) {
        this.countAPS(item.userInfo.kseaInfo.aps1);
        this.countAPS(item.userInfo.kseaInfo.aps2);
        this.countAPS(item.userInfo.kseaInfo.aps3);
        this.countChapter(item.userInfo.kseaInfo.localChapter);
        this.countGroups(item.userInfo.kseaInfo.group1);
        this.countGroups(item.userInfo.kseaInfo.group2);
      }
    });
    if (this.votingDef) {
      this.overviewtData.datasets[0].data =
        this.votingDef.votersStats.votingDates.map((a: any) => a.count);

      this.apsData.datasets[0].data = this.votingDef.votersStats.aps.map(
        (a: any) => (a.count / a.total) * 100
      );

      this.chapterData.datasets[0].data =
        this.votingDef.votersStats.chapters.map(
          (a: any) => (a.count / a.total) * 100
        );

      this.groupData.datasets[0].data = this.votingDef.votersStats.groups.map(
        (a: any) => (a.count / a.total) * 100
      );

      if (this.charts)
        this.charts.forEach((child) => {
          if (child && child.chart) child.chart.update();
        });
    }
  }

  isMonitor() {
    if (this.votingDef.monitors.includes(this.user.attributes.email))
      return true;
    return false;
  }

  countAPS(apsCode: string) {
    if (apsCode) {
      this.stats.aps
        .filter((value: any) => value.code === apsCode)
        .forEach((item: any) => {
          item.count++;
        });
    }
  }

  countChapter(chapterName: string) {
    if (chapterName) {
      this.stats.chapters
        .filter((value: any) => value.name === chapterName)
        .forEach((item: any) => {
          item.count++;
        });
    }
  }

  countGroups(gCode: string) {
    if (gCode) {
      this.stats.groups
        .filter((value: any) => value.code === gCode)
        .forEach((item: any) => {
          item.count++;
        });
    }
  }

  countDate(timestamp: string) {
    if (timestamp) {
      this.stats.votingDates
        .filter((value: any) => timestamp.startsWith(value.date))
        .forEach((item: any) => {
          item.count++;
        });
    }
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public barChartOptions1: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public overviewtData: ChartData<'bar'> = {
    datasets: [
      {
        data: [0],
        label: 'Number of votes / day',
      },
    ],
  };

  public apsData: ChartData<'bar'> = {
    datasets: [
      {
        data: [0],
        label: 'Rate of votes / APS',
      },
    ],
  };

  public chapterData: ChartData<'bar'> = {
    datasets: [
      {
        data: [0],
        label: 'Rate of votes / Chapter',
      },
    ],
  };

  public groupData: ChartData<'bar'> = {
    datasets: [
      {
        data: [0],
        label: 'Rate of votes / Techinical Group',
      },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }

  downloadCSV() {
    let data = '2024 KSEA Election Statistics\n';
    data += 'Date:,' + new Date() + '\n\n';
    data +=
      'Total voting:,' +
      this.votingResult.length +
      '/' +
      this.votingDef.votersStats.total +
      '(' +
      (this.votingResult.length / this.votingDef.votersStats.total) * 100 +
      '%)' +
      '\n\n';

    data += 'APS Name,Counts,total,Rate(%)\n';
    for (const a of this.stats.aps) {
      data +=
        a.code +
        ',' +
        a.count +
        ',' +
        a.total +
        ',' +
        (a.count / a.total) * 100 +
        '\n';
    }
    data += '\n';
    data += 'Chapter Name,Counts,total,Rate(%)\n';
    for (const a of this.stats.chapters) {
      data +=
        a.name +
        ',' +
        a.count +
        ',' +
        a.total +
        ',' +
        (a.count / a.total) * 100 +
        '\n';
    }

    data += '\n';
    data += 'Group Name,Counts,total,Rate(%)\n';
    for (const a of this.stats.groups) {
      data +=
        a.code +
        ',' +
        a.count +
        ',' +
        a.total +
        ',' +
        (a.count / a.total) * 100 +
        '\n';
    }

    const a = document.createElement('a');
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'votingStats.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
