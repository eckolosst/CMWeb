import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { MainComponent } from './main/main.component';
import { SectionsComponent } from './sections/sections.component';
import { HttpModule } from '@angular/http';
import { QRCodeModule } from 'angular2-qrcode';

// Angular Material
import { MatToolbarModule,
         MatInputModule,
         MatCardModule,
         MatButtonModule,
         MatIconModule,
         MatSidenavModule,
         MatListModule,
         MatSnackBarModule,
         MatDialogModule,
         MatSortModule,
         MatExpansionModule,
         MatProgressSpinnerModule
      } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    MainComponent,
    SectionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    QuillModule,
    QRCodeModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
