import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringMap } from 'aws-sdk/clients/backup';
import { bool } from 'aws-sdk/clients/signer';
import { CognitoService } from 'src/app/service/cognito.service';
import { MembershipService } from 'src/app/service/membership.service';
import { VotingService } from 'src/app/service/voting.service';
import { Membership } from 'src/app/shared/membership';
import { VotingDef } from 'src/app/shared/VotingDef';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['../../css/common.scss', './introduction.component.scss'],
})
export class IntroductionComponent implements OnInit {
  votingDef: any;
  membership: Membership;
  user: any;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private membershipService: MembershipService,
    private votingService: VotingService
  ) {
    this.membership = {} as Membership;
  }

  public ngOnInit(): void {
    this.cognitoService
      .getUser()
      .then((user: any) => {
        if (user) {
          this.user = user;
          const newMemberShip: Membership = {} as Membership;
          this.cognitoService.getToken().then((sdata) => {
            const token = sdata.accessToken.jwtToken;
            this.membershipService
              .getMembership(user.username, token)
              .subscribe((data: any) => {
                this.membership = data.Item;
                this.votingService
                  .getMembership(environment.votingId)
                  .subscribe((def: any) => {
                    this.votingDef = def.Item;
                  });
              });
          });
        } else {
          this.router.navigateByUrl('/signIn?next=voting-2024');
        }
      })
      .catch(() => {
        this.router.navigateByUrl('/signIn?next=voting-2024');
      });
  }

  goToVoting(): void {
    this.router.navigate(['/voting']);
  }

  isMonitor() {
    if (this.votingDef.monitors.includes(this.user.attributes.email))
      return true;
    return false;
  }

  checkVotingEligiable(): boolean {
    const emailLowerCase = this.votingDef.voters.map((email: string) =>
      email.toLowerCase()
    );
    if (emailLowerCase.includes(this.user.attributes.email.toLowerCase()))
      return true;
    return false;
  }
}
