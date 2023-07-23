import { Component } from '@angular/core';

@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.css'],
})
export class MainNavBarComponent {
  constructor() {}

  user = JSON.parse(window.localStorage.getItem('team-user') ?? '');
  imagen = this.user.imagen;
  nombre = this.user.nombre;
}
