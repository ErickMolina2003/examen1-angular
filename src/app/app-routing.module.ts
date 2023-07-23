import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainNavBarComponent } from './components/main-nav-bar/main-nav-bar.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
  },
  {
    path: 'chats/:id',
    component: ChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
