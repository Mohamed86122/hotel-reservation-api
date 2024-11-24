import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { ReservationComponent } from './reservation/reservation.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'rooms/:roomId', component: RoomsComponent },
  { path: 'room-detail/:roomId', component: RoomDetailComponent },
  { path: 'reservation/:roomId', component: ReservationComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: '' }, // Redirection pour les URL non reconnues

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
