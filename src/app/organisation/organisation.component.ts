import { Component, OnInit } from '@angular/core';
import { OrganisationService } from './organisation.service';
import { UserService } from './user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css'],
})
export class OrganisationComponent implements OnInit {
  users: any;
  organisation = {
    name: ''
  };
  res: any;

  constructor(private userService: UserService, private organisationService: OrganisationService) {}

  ngOnInit(): void {
    this.organisation.name = '';
    var decoded: any = jwt_decode(localStorage.getItem('token')!);
    this.organisationService.get(decoded.organisationId).subscribe((response) => {
      this.res = response;
      this.organisation.name = this.res.name
      this.userService.getAll().subscribe((response) => {
        this.users = response;
      });
    });
  }

  setActive(id: number) {
    this.userService.setActive(id).subscribe((response) => {
      this.users.find((user: any) => user.id == id).isActive = true;
    });
  }

  setInactive(id: number) {
    this.userService.setInactive(id).subscribe((response) => {
      this.users.find((user: any) => user.id == id).isActive = false;
    });
  }

  filter(state?: boolean) {
    this.userService.getAll().subscribe((response) => {
      this.users = response;
      switch (state) {
        case true:
          this.users = this.users.filter((user: any) => user.isActive === true);
          break;
        case false:
          this.users = this.users.filter((user: any) => user.isActive === false);
          break;
        default:
          break;
      }
    });
  }
}
