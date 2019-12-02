import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule',  canActivate: [LoginGuardService] },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule', canActivate: [LoginGuardService] },
  { path: 'to-do-list', loadChildren: './to-do-list/to-do-list.module#ToDoListPageModule', canActivate: [AuthGuardService] },
  { path: 'new-to-do', loadChildren: './new-to-do/new-to-do.module#NewToDoPageModule', canActivate: [AuthGuardService] },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate: [AuthGuardService] },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuardService] },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuardService] },
  { path: 'edit-to-do', loadChildren: './edit-to-do/edit-to-do.module#EditToDoPageModule', canActivate: [AuthGuardService] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
