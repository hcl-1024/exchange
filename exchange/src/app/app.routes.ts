import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateItemComponent } from './create/create-item/create-item.component';
import { AllItemsComponent } from './read/all-items/all-items.component';
import { OneItemComponent } from './read/one-item/one-item.component';
import { UpdateItemComponent } from './create/update-item/update-item.component';
import { CreateNameComponent } from './auth/create-name/create-name.component';
import { SettingsComponent } from './auth/settings/settings.component';
import { OneAccountComponent } from './read/one-account/one-account.component';
import { ViewSignupComponent } from './read/view-signup/view-signup.component';
import { UpdatePasswordComponent } from './auth/update-password/update-password.component';
import { SignupItemComponent } from './read/signup/signup-item.component';

export const routes: Routes = [
    { path: 'auth/signin', component: SigninComponent },
    { path: 'auth/signup', component: SignupComponent },
    { path: 'auth/new-name/:id', component: CreateNameComponent },
    { path: 'auth/update-password', component: UpdatePasswordComponent}, 
    { path: 'item/new', component: CreateItemComponent }, 
    { path: 'item/update/:id', component: UpdateItemComponent }, 
    { path: 'item/:id', component: OneItemComponent}, 
    { path: 'all-items', component: AllItemsComponent },
    { path: 'item/join/:id', component: SignupItemComponent}, 
    { path: 'item/joined/:id', component: ViewSignupComponent}, 
    { path: 'profile/settings', component: SettingsComponent}, 
    { path: 'user/:id', component: OneAccountComponent},
];