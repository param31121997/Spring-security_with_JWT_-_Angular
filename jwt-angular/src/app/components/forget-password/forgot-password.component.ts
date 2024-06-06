import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  username: string = '';

  constructor(private authService: AuthService) { }

  forgotPassword() {
    this.authService.forgotPassword(this.username).subscribe(() => {
      alert('A password reset link has been sent to your email');
    }, error => {
      alert('User not found');
    });
  }
}