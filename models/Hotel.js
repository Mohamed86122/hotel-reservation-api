const Aerospike = require('aerospike');
const { v4: uuidv4 } = require('uuid');

module.exports = class Hotel {
  constructor(hotelId, name, address, city, country,image, rooms = []) {
    this.hotelId = hotelId || uuidv4(); // Assigner un UUID si non fourni
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;
    this.image = image;
    this.rooms = rooms;
  }

  static async save(hotel) {
    console.log('Attempting to save hotel:', hotel);

    if (!hotel.hotelId) {
      throw new Error('hotelId is required and must be defined');
    }

    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'hotels', hotel.hotelId.toString());
    const bins = {
      name: hotel.name,
      address: hotel.address,
      city: hotel.city,
      country: hotel.country,
      image: hotel.image,
      rooms: hotel.rooms
    };

    try {
      await client.put(key, bins);
      console.log('Hotel saved successfully with ID:', hotel.hotelId);
    } catch (error) {
      console.error('Error saving hotel:', error);
      throw error;
    } finally {
      client.close();
    }
  }

  static async update(hotelId, updatedFields) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'hotels', hotelId);

    try {
      await client.put(key, updatedFields);
      console.log(`Hotel with ID ${hotelId} updated successfully.`);
    } catch (error) {
      console.error(`Error updating hotel with ID ${hotelId}:`, error);
      throw error;
    } finally {
      client.close();
    }
  }

  static async delete(hotelId) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'hotels', hotelId);

    try {
      await client.remove(key);
      console.log(`Hotel with ID ${hotelId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting hotel with ID ${hotelId}:`, error);
      throw error;
    } finally {
      client.close();
    }
  }

  static async findById(hotelId) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'hotels', hotelId);

    try {
      const record = await client.get(key);
      console.log(`Hotel with ID ${hotelId} retrieved successfully.`);
      return record.bins;
    } catch (error) {
      console.error(`Error retrieving hotel with ID ${hotelId}:`, error);
      throw error;
    } finally {
      client.close();
    }
  }

  static async findAll() {
    const client = await Aerospike.connect();
    const hotels = [];
    const scan = client.scan('test', 'hotels');
    const stream = scan.foreach();

    return new Promise((resolve, reject) => {
      stream.on('data', (record) => hotels.push(record.bins));
      stream.on('error', (error) => {
        console.error('Error scanning hotels:', error);
        reject(error);
      });
      stream.on('end', () => {
        client.close();
        console.log('All hotels retrieved successfully.');
        resolve(hotels);
      });
    });
  }
};
