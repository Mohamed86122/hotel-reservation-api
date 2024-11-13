export class Reservation {
  reservationId?: number;
  roomId?: number;
  userId?: number;
  checkIn?: Date;
  checkOut?: Date;
  totalPrice?: number;
  isPaid: boolean;
  isCancelled: boolean;
  dateCreated: Date;

  constructor() {
    this.isPaid = false;
    this.isCancelled = false;
    this.dateCreated = new Date();
  }
}
