// models/Hotel.js
const Aerospike = require('aerospike');

module.exports = class Hotel {
  constructor(id, name, location, rating) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.rating = rating;
  }

  // Méthode pour sauvegarder un hôtel
  static async save(hotel) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'hotels', hotel.id);
    const bins = { name: hotel.name, location: hotel.location, rating: hotel.rating };
    await client.put(key, bins);
    client.close();
  }

  // Méthode pour mettre à jour un hôtel
  static async update(id, updatedFields) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'hotels', id);
    await client.put(key, updatedFields);
    client.close();
  }

  // Méthode pour supprimer un hôtel
  static async delete(id) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'hotels', id);
    await client.remove(key);
    client.close();
  }

  // Méthode pour récupérer un hôtel par son ID
  static async findById(id) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'hotels', id);
    const record = await client.get(key);
    client.close();
    return record;
  }

  // Méthode pour récupérer tous les hôtels
  static async findAll() {
    const client = await Aerospike.connect();
    const hotels = [];
    
    const scan = client.scan('test', 'hotels');
    const stream = scan.foreach();

    stream.on('data', (record) => hotels.push(record));
    stream.on('error', (error) => console.error('Scan error:', error));
    stream.on('end', () => client.close());

    return new Promise((resolve) => {
      stream.on('end', () => resolve(hotels));
    });
  }
};

