import { ValveEditComponent } from './components/pages/valve-edit/valve-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { MantainanceComponent } from './components/pages/mantainance/mantainance.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { ValveComponent } from './components/pages/valve/valve.component';
import { ValveMovementComponent } from './components/pages/valve-movement/valve-movement.component';
import { ValveTableComponent } from './components/pages/valve-table/valve-table.component';
import { ValvesDetailComponent } from './components/pages/valves/valves-detail/valves-detail.component';
import { ValvesPageComponent } from './components/pages/valves/valves-page/valves-page.component';
import { ValveMovementEditComponent } from './components/pages/valve-movement-edit/valve-movement-edit.component';
import { ManagmentModule } from './components/pages/managment/managment.module';
import { ManageUsersModule } from './components/pages/managment/manage-users/manage-users.module';
import { ManageRolesModule } from './components/pages/managment/manage-roles/manage-roles.module';
import { MapComponent } from './components/pages/map/map.component';


const managmentModule = () => import('./components/pages/managment/managment.module').then(x => x.ManagmentModule);

//En todos los componentes que tengan el canActivate se mostrara la barra de navegacion
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: 'managment', loadChildren: managmentModule, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'valve', canActivate: [AuthGuard],
  children: [
    { path: 'register', component: ValveComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: ValveEditComponent, canActivate: [AuthGuard] },
    { path: 'table', component: ValveTableComponent, canActivate: [AuthGuard] },
    { path: 'Detail/:id', component: ValvesDetailComponent, canActivate: [AuthGuard] },
  ]},
  { path: 'valveMovement', canActivate: [AuthGuard],
  children: [
    { path: 'registervalvesAction/:id', component: ValveMovementComponent, canActivate: [AuthGuard] },
    { path: 'valvesActionEdit/:id', component: ValveMovementEditComponent, canActivate: [AuthGuard] },
  ]},
  { path: 'about', component: AboutComponent },
  { path: 'pagina', component: ValvesPageComponent },
  { path: 'mantainance', component: MantainanceComponent },
  { path: '**', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),
    ManagmentModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
