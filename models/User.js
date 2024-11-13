// models/User.js
const Aerospike = require('aerospike');

module.exports = class User {
  constructor(userId, firstName, lastName, email, password, dateCreated) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.dateCreated = dateCreated;
  }

  static async save(user) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'users', user.userId);
    const bins = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      dateCreated: user.dateCreated
    };
    try {
      await client.put(key, bins);
    } finally {
      client.close();
    }
  }

  static async update(userId, updatedFields) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'users', userId);
    try {
      await client.put(key, updatedFields);
    } finally {
      client.close();
    }
  }

  static async delete(userId) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'users', userId);
    try {
      await client.remove(key);
    } finally {
      client.close();
    }
  }

  static async findById(userId) {
    const client = await Aerospike.connect();
    const key = new Aerospike.Key('test', 'users', userId);
    try {
      const record = await client.get(key);
      return record.bins;
    } finally {
      client.close();
    }
  }

  static async findAll() {
    const client = await Aerospike.connect();
    const users = [];
    const scan = client.scan('test', 'users');
    const stream = scan.foreach();

    return new Promise((resolve, reject) => {
      stream.on('data', (record) => users.push(record.bins));
      stream.on('error', (error) => reject(error));
      stream.on('end', () => {
        client.close();
        resolve(users);
      });
    });
  }
};
