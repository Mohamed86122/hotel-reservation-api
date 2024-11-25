import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../models/reservation.model';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservation: Reservation = {
    reservationId: 0, // Ce champ sera ignoré, il sera généré par le backend
    roomId: "",
    nomComplet: "",
    mail: "",
    checkIn: new Date(),
    checkOut: new Date(),
    totalPrice: 0,
    isPaid: false,
    isCancelled: false,
    dateCreated: new Date(),
  };
  room: any;
  constructor(
    private reservationService: ReservationService,
    private roomService : RoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la chambre depuis l'URL
    const roomId = this.route.snapshot.paramMap.get('roomId');
    if (roomId) {
      this.roomService.getRoomById(roomId).subscribe(room => {
        this.reservation.roomId = room.roomId;
        console.log('Room:', room);
        this.room = room;
      });

      
      // this.reservation.roomId =roomId;
    }
  }

  calculateTotalPrice(): void {
    const checkInDate = new Date(this.reservation.checkIn);
    const checkOutDate = new Date(this.reservation.checkOut);

    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.reservation.totalPrice = diffDays * 100; // Exemple : Prix fixe de 100 MAD/nuit
    }
  }

  onSubmit(): void {
    this.calculateTotalPrice();
    this.reservationService.createReservation(this.reservation).subscribe({
      next: (data) => {
        console.log('Reservation created:', data);
        alert('Your reservation has been confirmed!');
      },
      error: (error) => {
        console.error('Error creating reservation:', error);
        alert('An error occurred while creating your reservation. Please try again.');
      }
    });
  }
}
