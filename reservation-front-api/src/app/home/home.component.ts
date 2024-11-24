import { Component, OnInit } from '@angular/core';
import { Hotel } from '../models/hotel.model';
import { HotelService } from '../services/hotel.service';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  rooms: Room[] = [];
  hotel:Hotel | null = null;

  constructor(private roomService : RoomService,private hotelService : HotelService) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data;
    });
    this.hotelService.getHotelById("781ac1b4-c57b-4cfd-b0af-e8d85c9c9eaf").subscribe((data) => {
      this.hotel = data;
    });
  }
}
