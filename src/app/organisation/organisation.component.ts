import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css'],
})
export class OrganisationComponent implements OnInit {
  users: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((response) => {
      this.users = response;
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
