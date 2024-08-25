const db = require('../config/db');

const schools = {
  create: async (school) => {
    const sql = 'INSERT INTO schools (Name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    try {
      const [result] = await db.query(sql, [school.Name, school.address, school.latitude, school.longitude]);
      return result;
    } catch (err) {
      console.error('Error adding school:', err);
      throw err;
    }
  },

  find: async () => {
    const sql = 'SELECT * FROM schools';
    try {
      const [results] = await db.query(sql);
      return results;
    } catch (err) {
      console.error('Error retrieving schools:', err);
      throw err;
    }
  }
};

module.exports = schools;
