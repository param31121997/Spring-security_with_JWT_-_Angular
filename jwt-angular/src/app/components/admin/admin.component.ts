import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  username = '';
  role=''
  constructor(private authService: AuthService) {
    this.authService.username.subscribe(res =>{
      this.username = res;
    })
    this.authService.role.subscribe(res =>{
      if(res === "ROLE_ADMIN"){
        this.role = "Admin"
      }
      else{
        this.role = "User";
      }
    })
  }

  logout() {
    this.authService.logout();
  }
}