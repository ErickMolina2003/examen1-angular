import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usernameValue: string = '';
  passwordValue: string = '';

  constructor(private loginService: LoginService) {}

  onSubmit() {
    if (!this.usernameValue || !this.passwordValue) {
      window.alert('Rellenar los campos');
      return;
    }
    this.loginService.login(this.usernameValue, this.passwordValue);
  }
}
