// src/app/user-dashboard/user-dashboard.component.ts
import { Component, OnInit, Injector } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  reservations: Reservation[] = [];
  private reservationService!: ReservationService;

  constructor(private injector: Injector) {
    // Injection différée
    setTimeout(() => this.reservationService = this.injector.get(ReservationService), 0);
  }

  ngOnInit(): void {
    // Assurez-vous que le service est disponible avant d'appeler la méthode
    if (this.reservationService) {
      this.reservationService.getReservations().subscribe((data) => {
        this.reservations = data;
      });
    }
  }
}
