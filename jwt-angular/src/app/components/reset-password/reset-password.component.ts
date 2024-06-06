import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  newPassword: string = '';
  token: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  resetPassword() {
    this.authService.resetPassword(this.token, this.newPassword).subscribe(success => {
      if (success) {
        alert('Password has been reset successfully');
        this.router.navigate(['/login']);
      } else {
        alert('Failed to reset password');
      }
    });
  }
}