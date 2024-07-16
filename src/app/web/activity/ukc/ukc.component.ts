import { Component, OnInit } from '@angular/core';
import { CognitoService } from 'src/app/service/cognito.service';

@Component({
  selector: 'app-ukc',
  templateUrl: './ukc.component.html',
  styleUrls: ['../../../css/common.scss', './ukc.component.scss'],
})
export class UkcComponent implements OnInit {
  user: any = null;
  token: string = '';
  constructor(private cognitoService: CognitoService) {}

  ngOnInit(): void {
    this.user = null;

    this.cognitoService.getUser().then((user: any) => {
      this.user = user;
      if (this.user) {
        this.cognitoService.getToken().then((sdata) => {
          this.token = sdata.accessToken.jwtToken;
        });
      }
    });
  }
}
