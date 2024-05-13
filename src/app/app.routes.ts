import { Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { ProspectComponent } from './page/prospect/prospect.component';
import { ClientComponent } from './page/client/client.component';



export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'prospect', component: ProspectComponent },
    { path: 'client', component: ClientComponent }
];
