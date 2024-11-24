import { Component, OnInit } from '@angular/core';
import { Hotel } from '../models/hotel.model';
import { HotelService } from '../services/hotel.service';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  rooms: Room[] = [];
  hotel: Hotel | null = null;

  constructor(private roomService: RoomService, private hotelService: HotelService) {}

  ngOnInit(): void {
    forkJoin({
      rooms: this.roomService.getRooms(),
      hotel: this.hotelService.getHotelById('781ac1b4-c57b-4cfd-b0af-e8d85c9c9eaf'),
    }).subscribe(({ rooms, hotel }) => {
      this.rooms = rooms;
      this.hotel = hotel;
    });
  }
}
