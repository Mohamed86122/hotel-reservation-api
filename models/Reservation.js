// models/Reservation.js
const Aerospike = require('aerospike');

module.exports = class Reservation {
  constructor(reservationId, roomId, userId, checkIn, checkOut, totalPrice, isPaid, isCancelled, dateCreated) {
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

  static async save(reservation) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'reservations', reservation.reservationId);
    const bins = {
      roomId: reservation.roomId,
      userId: reservation.userId,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      totalPrice: reservation.totalPrice,
      isPaid: reservation.isPaid,
      isCancelled: reservation.isCancelled,
      dateCreated: reservation.dateCreated
    };
    try {
      await client.put(key, bins);
    } finally {
      client.close();
    }
  }

  static async update(reservationId, updatedFields) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'reservations', reservationId);
    try {
      await client.put(key, updatedFields);
    } finally {
      client.close();
    }
  }

  static async delete(reservationId) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'reservations', reservationId);
    try {
      await client.remove(key);
    } finally {
      client.close();
    }
  }

  static async findById(reservationId) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'reservations', reservationId);
    try {
      const record = await client.get(key);
      return record.bins;
    } finally {
      client.close();
    }
  }

  static async findAll() {
    const client = await Aerospike.connect();
    const reservations = [];
    const scan = client.scan('test', 'reservations');
    const stream = scan.foreach();

    return new Promise((resolve, reject) => {
      stream.on('data', (record) => reservations.push(record.bins));
      stream.on('error', (error) => reject(error));
      stream.on('end', () => {
        client.close();
        resolve(reservations);
      });
    });
  }
};
