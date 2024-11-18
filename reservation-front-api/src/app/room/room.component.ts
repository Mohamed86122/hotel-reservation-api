import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.model';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container page-container">
      <h2 class="mb-4">Available Rooms</h2>

      <div *ngIf="isLoading" class="text-center">
        <p>Loading rooms...</p>
      </div>

      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div *ngIf="!isLoading && rooms.length === 0" class="text-center">
        <p>No rooms available at the moment.</p>
      </div>

      <div class="row" *ngIf="rooms.length > 0">
        <div *ngFor="let room of rooms; trackBy: trackByRoomId" class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Room {{ room.roomNumber }}</h5>
              <p class="card-text">Type: {{ room.type }}</p>
              <p class="card-text">Price: {{ room.price | currency }}/night</p>
              <p class="card-text">
                <span [class]="room.isAvailable ? 'text-success' : 'text-danger'">
                  {{ room.isAvailable ? 'Available' : 'Booked' }}
                </span>
              </p>
              <a [routerLink]="['/rooms', room.roomId]" class="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RoomComponent implements OnInit {
  rooms: Room[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.roomService.getRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching rooms:', error);
        this.error = 'Failed to load rooms. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  trackByRoomId(index: number, room: Room): string {
    return room.roomId;
  }
}
