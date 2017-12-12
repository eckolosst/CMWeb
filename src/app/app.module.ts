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
import { EditComponent } from './user/edit.component';
import { MainComponent } from './main/main.component';
import { SectionsComponent } from './sections/sections.component';
import { ExitComponent } from './sections/exit.component';
import { InfoComponent } from './info/info.component';
import { OrdenComponent } from './orden/orden.component';
import { RegistroComponent } from './registro/registro.component';
import { HttpModule } from '@angular/http';
import { QRCodeModule } from 'angular2-qrcode';
import { SortablejsModule } from 'angular-sortablejs';

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
         MatProgressSpinnerModule,
         MatChipsModule
      } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    MainComponent,
    SectionsComponent,
    InfoComponent,
    OrdenComponent,
    RegistroComponent,
    EditComponent,
    ExitComponent
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
    MatChipsModule,
    QuillModule,
    QRCodeModule,
    SortablejsModule,
    routing
  ],
  providers: [appRoutingProviders],
  entryComponents:[EditComponent, ExitComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
