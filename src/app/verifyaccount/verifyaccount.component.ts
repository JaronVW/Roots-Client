import { Component, OnInit } from '@angular/core';
import { VerifyaccountService } from '../verifyaccount.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verifyaccount',
  template: ` <h2>{{res}}</h2> `,
})
export class VerifyaccountComponent implements OnInit {
  res: any;
  token: string = '';
  constructor(private verifyAccountService: VerifyaccountService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('id') || '';
    this.verifyAccountService.verifyAccount(this.token).subscribe((result) => {
      this.res = result;
      console.log(this.res.message)
      // if (res.message.message === 'Account Verified!') {
      //   this.res = 'Account Verified';
      // } else {
      //   this.res = 'Account Not Verified';
      // }
    });
  }
}
