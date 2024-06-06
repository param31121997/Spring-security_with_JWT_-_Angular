import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: any;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, private router: Router
  ) { 

  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });

    // Add custom validator to check if passwords match
    this.registerForm.setValidators(this.passwordMatchValidator);
  }


  submitForm(): void {
    if (this.registerForm.valid) {
      // Form is valid, handle form submission here
      this.authService.register(this.registerForm.value).subscribe(() => {
        this.router.navigate(['/login']);
      }, error => {
        this.error = error.error;
      });
    }
   else {
      // Form is invalid, mark all fields as touched to display error messages
      this.registerForm.markAllAsTouched();
    }
  }

  // Custom validator function to check if passwords match
  private passwordMatchValidator(formGroup: FormGroup): any {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword').setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword').setErrors(null);
    }
  }
}