import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes de la app
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { MainComponent } from './main/main.component';
// import { ErrorComponent } from './error/error.component';

//Definimos el arreglo qye relaciona el path con el componente que llama

const appRoutes: Routes = [
   {path: '',component: HomeComponent},
   {path: 'home',component: HomeComponent},
   {path: 'login',component: LoginComponent},
   {path: 'user',component: UserComponent},
   {path: 'main',component: MainComponent},
   // {path: '**',component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
