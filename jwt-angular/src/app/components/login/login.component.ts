import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | undefined;
  error: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  submitForm() {
    this.authService.login(this.loginForm.value).subscribe(
      (response:any) => {
        if (response.jwtToken != null) {
          console.log('line number 32')
          console.log(response.roles[0])
          localStorage.setItem('jwtToken', response.jwtToken);
          // if(response.roles[0] === "ROLE_ADMIN"){
            this.authService.username.next(response.name);
            this.authService.role.next(response.roles[0]);
            this.router.navigate(['/admin']);
          // }else{
          //   this.router.navigate(['/admin']);
          // }
        }
      },(error) =>{
        console.log(error)
        this.error = "Incorrect Email id or Password";
      }
    )
  }

}
