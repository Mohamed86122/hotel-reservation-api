import { Component } from '@angular/core';
import { Reservation } from '../../models/reservation.model';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent {
  Reservations : Reservation[] =[];

  constructor(private reservationService: ReservationService)
  {
  }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(data => { 
      this.Reservations = data;
    });
  }

}
