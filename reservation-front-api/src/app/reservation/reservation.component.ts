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
  reservation: Reservation = new Reservation(0, 0, 0, new Date(), new Date(), 0, false, false, new Date());

  constructor(
    private reservationService: ReservationService,
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId');
    if (roomId) {
      this.reservation.roomId = parseInt(roomId);
      this.roomService.getRoomById(roomId).subscribe((room) => {
        this.reservation.totalPrice = room.price; // Get price from room
      });
    } else {
      console.error('Room ID is undefined in reservation');
    }
  }

  calculateTotalPrice(): void {
    const checkInDate = new Date(this.reservation.checkIn);
    const checkOutDate = new Date(this.reservation.checkOut);

    if (checkInDate && checkOutDate && this.reservation.totalPrice) {
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.reservation.totalPrice = diffDays * this.reservation.totalPrice;
    }
  }

  onSubmit(): void {
    this.calculateTotalPrice();
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
