const properties = require('./json/properties.json');
const users = require('./json/users.json');
const db = require('../db/index');

module.exports = {

  /// Users}
  
  /**
   * Get a single user from the database given their email.
  * @param {String} email The email of the user.
  * @return {Promise<{}>} A promise to the user.
  */
  getUserWithEmail: function(email) {  
    return db
    .query(
      `SELECT * FROM users WHERE users.email = $1`,
      [email]
    )
    .then(res => 
      res.rows ? res.rows[0] : null
    )
  },

  /**
   * Get a single user from the database given their id.
  * @param {string} id The id of the user.
  * @return {Promise<{}>} A promise to the user.
  */
  getUserWithId: function(id) {
    return db
    .query(
      `SELECT * FROM users WHERE users.id = $1`,
      [id]
    )
    .then(res => {
      if (res) return res.rows[0]
      else return null
    })
  },

  /**
   * Add a new user to the database.
  * @param {{name: string, password: string, email: string}} user
  * @return {Promise<{}>} A promise to the user.
  */
  addUser:  function(user) {
    const queryString = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3) RETURNING *;`
    const values = [user.name, user.email, user.password];
    
    return db.query(queryString, values)
      .then(res => res.row)
  },

  /// Reservations

  /**
   * Get all reservations for a single user.
   * @param {string} guest_id The id of the user.
   * @return {Promise<[{}]>} A promise to the reservations.
   */
  getAllReservations: function(guest_id, limit = 10) {
    const queryString = `
      SELECT reservations.*, properties.*, avg(rating) as average_rating
      FROM reservations
      JOIN properties ON reservations.property_id = properties.id
      JOIN property_reviews ON property_reviews.property_id = properties.id
      WHERE reservations.guest_id = $1
      GROUP BY reservations.id, properties.id
      ORDER BY start_date
      LIMIT $2;`;
    const values = [guest_id, limit]

    return db.query(queryString, values)
      .then(res => res.rows)
  },

  /// Properties

  /**
   * Get all properties.
   * @param {{}} options An object containing query options.
   * @param {*} limit The number of results to return.
   * @return {Promise<[{}]>}  A promise to the properties.
   */
  getAllProperties: function(options, limit = 10) {
    const queryParams = [];
    let queryString = `
      SELECT properties.*, avg(rating) as average_rating
      FROM properties
      JOIN property_reviews ON property_id = properties.id `;

    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }

    if (options.owner_id) {
      queryParams.push(`${options.owner_id}`);
      queryParams.length > 1 ? queryString += `AND ` : queryString += `WHERE `;
      queryString += `owner_id = ${queryParams.length}`
    }

    if (options.minimum_price_per_night && options.maximum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night}`, `${options.maximum_price_per_night}`);
      queryParams.length > 2 ? queryString += `AND ` : queryString += `WHERE `;
      queryString += `cost_per_night BETWEEN $${queryParams.length - 1} AND $${queryParams.length} `;
    }

    if (options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`);
      queryParams.length > 1 ? queryString += `AND ` : queryString += `WHERE `;
      queryString += `rating >= $${queryParams.length}`;
    }

    queryParams.push(limit);
    queryString += `
      GROUP BY properties.id
      ORDER BY cost_per_night
      LIMIT $${queryParams.length};
      `;

    return db.query(queryString, queryParams)
      .then(res => res.rows)
  }, 



  /**
   * Add a property to the database
  * @param {{}} property An object containing all of the property details.
  * @return {Promise<{}>} A promise to the property.
  */
  addProperty: function(property) {
    const queryString = `
      INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;`
    const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night,  property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code];
  
    return db.query(queryString, values)
      .then(res => res.rows)
  }
};