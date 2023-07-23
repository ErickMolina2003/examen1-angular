import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { MainNavBarComponent } from './components/main-nav-bar/main-nav-bar.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, MainNavBarComponent, MainFooterComponent, MainLayoutComponent, ChatComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
