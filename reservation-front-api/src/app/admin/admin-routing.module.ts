import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { AdminGuard } from '../guards/admin.guard';
import { RoomsManagementComponent } from './rooms-management/rooms-management.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [], // Protection pour les routes Admin
    children: [
      { path: 'users', component: ManageUsersComponent },
      { path: 'reservations', component: ManageReservationsComponent },
      { path: 'rooms', component: RoomsManagementComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
