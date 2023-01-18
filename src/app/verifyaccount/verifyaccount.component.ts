import { Component, OnInit } from '@angular/core';
import { VerifyaccountService } from '../verifyaccount.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verifyaccount',
  template: `<div *ngIf="htmlData != ''; else elseBlock">
      <h1>{{ htmlData }}</h1>
    </div>
    <ng-template #elseBlock><app-loading-spinner></app-loading-spinner></ng-template>`,
})
export class VerifyaccountComponent implements OnInit {
  res: any;
  token: string = '';
  _htmlData: string = '';

  constructor(private verifyAccountService: VerifyaccountService, private route: ActivatedRoute) {}

  public get htmlData(): any {
    return this._htmlData;
  }

  public set htmlData(val: any) {
    this._htmlData = val;
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('id') || '';
    this.verifyAccountService.verifyAccount(this.token).subscribe({
      next: (result) => {
        this.res = result;
        this.htmlData = 'U bent succesvol geverifieerd';
      },
      error: (error) => {
        if (error.error.statusCode == 404 || error.error.message == 'Verification token expired') {
          this.htmlData = 'Deze link is niet meer geldig';
        } else {
          this.htmlData = 'Er is iets fout gegaan bij het verifiëren van uw account';
        }
      },
    });
  }
}
