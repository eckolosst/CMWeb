import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes de la app
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { MainComponent } from './main/main.component';
import { SectionsComponent } from './sections/sections.component';
import { InfoComponent } from './info/info.component';
import { OrdenComponent } from './orden/orden.component';
import { RegistroComponent } from './registro/registro.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { AntipanicoComponent } from './antipanico/antipanico.component';


const appRoutes: Routes = [
   {path: '',component: HomeComponent},
   {path: 'home',component: HomeComponent},
   {path: 'login',component: LoginComponent},
   {path: 'user',component: UserComponent},
   {path: 'main',component: MainComponent},
   {path: 'sections',component: SectionsComponent},
   {path: 'info',component: InfoComponent},
   {path: 'orden',component: OrdenComponent},
   {path: 'registro', component: RegistroComponent},
   {path: 'seguimiento/:id', component: SeguimientoComponent},
   {path: 'antipanico/:lat/:lng', component: AntipanicoComponent},
   {path: '**', redirectTo: ''}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
