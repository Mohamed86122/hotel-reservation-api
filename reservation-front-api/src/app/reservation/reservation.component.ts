// src/app/reservation/reservation.component.ts
import { Component } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  reservation: Reservation = new Reservation();

  constructor(private reservationService: ReservationService) {}

  onSubmit(): void {
    this.reservationService.createReservation(this.reservation).subscribe({
      next: (data) => {
        console.log('Reservation created:', data);
      },
      error: (error) => {
        console.error('Error creating reservation:', error);
      }
    });
  }
}
