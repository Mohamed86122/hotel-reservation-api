// home.component.ts
import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { HotelService } from '../services/hotel.service';
import { forkJoin } from 'rxjs';
import { Room } from '../models/room.model';
import { Hotel } from '../models/hotel.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rooms: Room[] = [];
  hotel: Hotel | null = null;

  constructor(
    private roomService: RoomService,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    forkJoin({
      rooms: this.roomService.getRooms(),
      hotel: this.hotelService.getHotelById('781ac1b4-c57b-4cfd-b0af-e8d85c9c9eaf'),
    }).subscribe(({ rooms, hotel }) => {
      console.log(rooms);
      const roomsWithId = rooms.filter(room => room.roomId);
      const roomsWithoutId = rooms.filter(room => !room.roomId);

      if (roomsWithoutId.length > 0) {
        console.error('Chambres sans roomNumber:', roomsWithoutId);
      }

      this.rooms = roomsWithId;
      this.hotel = hotel;
    });
  }
}