import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voting-result',
  templateUrl: './voting-result.component.html',
  styleUrls: ['../../css/common-voting.scss', './voting-result.component.scss'],
})
export class VotingResultComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public okay(): void {
    this.router.navigate(['/']);
  }
}
