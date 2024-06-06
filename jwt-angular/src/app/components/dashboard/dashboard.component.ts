import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  username = '';

  constructor(private authService: AuthService) {
    const token = this.authService.getToken();
    const tokenPayload = this.authService.jwtHelper.decodeToken(token);
    this.username = tokenPayload.sub;
  }
  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
