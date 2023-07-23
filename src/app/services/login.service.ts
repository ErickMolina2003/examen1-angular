import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  username: string = '';
  password: string = '';

  constructor() {}

  async login(username: string, password: string) {
    this.username = username;
    this.password = password;
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: this.username,
          contrasena: this.password,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        window.localStorage.setItem('team-user', JSON.stringify(data.usuario));
      } else {
        window.alert('Credenciales incorrectas');
      }
    } catch (error) {
      window.alert('Credenciales incorrectas.');
      throw error;
    }
  }
}
