// room-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.model';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  room: Room | null = null;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    
    const roomNumber = this.route.snapshot.paramMap.get('roomId');

    if (roomNumber) {
      
      this.roomService.getRoomById(roomNumber).subscribe(room => {
        console.log(roomNumber);
        this.room = room;
      });
    }
  }
}