import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateItemComponent } from './create/create-item/create-item.component';
import { AllItemsComponent } from './read/all-items/all-items.component';
import { OneItemComponent } from './read/one-item/one-item.component';

export const routes: Routes = [
    { path: 'auth/signin', component: SigninComponent },
    { path: 'auth/signup', component: SignupComponent },
    { path: 'item/new', component: CreateItemComponent}, 
    { path: 'item/:id', component: OneItemComponent}, 
    { path: 'all-items', component: AllItemsComponent },
    { path: 'item', component: OneItemComponent },
];

//TODO
//log out button
//edit component