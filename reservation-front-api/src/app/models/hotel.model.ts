import { Room } from "./room.model";

export class Hotel {
  hotelId: string;  // Assurez-vous que cette propriété existe et est de type correct
  name: string;
  address: string;
  city: string;
  country: string;
  rooms: Room[];

  constructor(hotelId: string, name: string, address: string, city: string, country: string, rooms: Room[]) {
    this.hotelId = hotelId;
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;
    this.rooms = rooms;
  }
}
