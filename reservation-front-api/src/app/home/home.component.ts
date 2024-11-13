import { Component, OnInit } from '@angular/core';
import { Hotel } from '../models/hotel.model';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe((data) => {
      this.hotels = data;
    });
  }
}
