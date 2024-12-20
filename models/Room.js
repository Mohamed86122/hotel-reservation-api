// models/Room.js
const Aerospike = require('aerospike');

module.exports = class Room {
  constructor(roomId, roomNumber, type, price, isAvailable,image=null, hotelId) {
    this.roomId = roomId;
    this.roomNumber = roomNumber;
    this.type = type;
    this.price = price;
    this.isAvailable = isAvailable;
    this.image = image;
    this.hotelId = hotelId;
  }

  static async save(room) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'rooms', room.roomId);
    const bins = {
      roomId: room.roomId,
      roomNumber: room.roomNumber,
      type: room.type,
      price: room.price,
      isAvailable: room.isAvailable,
      image: room.image,
      hotelId: room.hotelId
    };
    try {
      await client.put(key, bins);
    } finally {
      client.close();
    }
  }
  static async findByRoomNumber(roomNumber) {
    const client = await Aerospike.connect();
    const query = client.query('test', 'rooms');
    query.where(Aerospike.filter.equal('roomNumber', roomNumber));

    return new Promise((resolve, reject) => {
      const rooms = [];
      const stream = query.foreach();
      stream.on('data', record => {
        rooms.push(record.bins);
      });
      stream.on('end', () => {
        client.close();
        if (rooms.length > 0) {
          resolve(rooms[0]);
        } else {
          resolve(null);
        }
      });
      stream.on('error', error => {
        client.close();
        reject(error);
      });
    });
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
