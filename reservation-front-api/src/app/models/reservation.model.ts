export class Reservation {
  reservationId: number;
  roomId: number;
  userId: number;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  isPaid: boolean;
  isCancelled: boolean;
  dateCreated: Date;

  constructor(
    reservationId: number,
    roomId: number,
    userId: number,
    checkIn: Date,
    checkOut: Date,
    totalPrice: number,
    isPaid: boolean,
    isCancelled: boolean,
    dateCreated: Date
  ) {
    this.reservationId = reservationId;
    this.roomId = roomId;
    this.userId = userId;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.totalPrice = totalPrice;
    this.isPaid = isPaid;
    this.isCancelled = isCancelled;
    this.dateCreated = dateCreated;
  }
}
