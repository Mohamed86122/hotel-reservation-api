// models/Room.js
const Aerospike = require('aerospike');

module.exports = class Room {
  constructor(roomId, roomNumber, type, price, isAvailable, hotelId) {
    this.roomId = roomId;
    this.roomNumber = roomNumber;
    this.type = type;
    this.price = price;
    this.isAvailable = isAvailable;
    this.hotelId = hotelId;
  }

  static async save(room) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'rooms', room.roomId);
    const bins = {
      roomNumber: room.roomNumber,
      type: room.type,
      price: room.price,
      isAvailable: room.isAvailable,
      hotelId: room.hotelId
    };
    try {
      await client.put(key, bins);
    } finally {
      client.close();
    }
  }

  static async update(roomId, updatedFields) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'rooms', roomId);
    try {
      await client.put(key, updatedFields);
    } finally {
      client.close();
    }
  }

  static async delete(roomId) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'rooms', roomId);
    try {
      await client.remove(key);
    } finally {
      client.close();
    }
  }

  static async findById(roomId) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'rooms', roomId);
    try {
      const record = await client.get(key);
      return record.bins;
    } finally {
      client.close();
    }
  }

  static async findAll() {
    const client = await Aerospike.connect();
    const rooms = [];
    const scan = client.scan('test', 'rooms');
    const stream = scan.foreach();

    return new Promise((resolve, reject) => {
      stream.on('data', (record) => rooms.push(record.bins));
      stream.on('error', (error) => reject(error));
      stream.on('end', () => {
        client.close();
        resolve(rooms);
      });
    });
  }
};
