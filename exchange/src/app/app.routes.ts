import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateItemComponent } from './create/create-item/create-item.component';
import { AllItemsComponent } from './read/all-items/all-items.component';
import { OneItemComponent } from './read/one-item/one-item.component';
import { OwnFilesComponent } from './read/own-files/own-files.component';
import { UpdateItemComponent } from './create/update-item/update-item.component';
import { CreateNameComponent } from './auth/create-name/create-name.component';

export const routes: Routes = [
    { path: 'auth/signin', component: SigninComponent },
    { path: 'auth/signup', component: SignupComponent },
    { path: 'auth/new-name/:id', component: CreateNameComponent },
    { path: 'item/new', component: CreateItemComponent }, 
    { path: 'item/update/:id', component: UpdateItemComponent }, 
    { path: 'item/:id', component: OneItemComponent}, 
    { path: 'all-items', component: AllItemsComponent },
    { path: 'item', component: OneItemComponent },
    { path: 'user-items/:id', component: OwnFilesComponent}
];

//TODO
//log out button
//edit component