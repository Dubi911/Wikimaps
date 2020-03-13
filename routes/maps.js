/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
module.exports = db => {
  const createNewMarker = function(
    user_id,
    map_id,
    title,
    description,
    image_url,
    address,
    latitude,
    longitude
  ) {
    // 1
    const queryParams = [
      user_id,
      map_id,
      title,
      description,
      image_url,
      address,
      latitude,
      longitude
    ];
    // 2
    let queryString = ` INSERT INTO pointers (user_id, map_id, title, description, image_url, address, latitude, longitude) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) `;
    //5
    console.log(queryString, queryParams);
    // 6
    return db.query(queryString, queryParams).then(res => res.rows[0]);
  };

  router.get("/", (req, res) => {
    const getAllMaps = function(limit) {
      // 1
      console.log("called");
      const queryParams = [];
      // 2
      let queryString = `
          SELECT * FROM maps
          `;

      // if (options.user_id) {
      //   queryParams.push(options.user_id);
      //   queryString += `AND user_id = $${queryParams.length} `;
      // }

      // 4
      queryParams.push(limit);
      queryString += `
        LIMIT $${queryParams.length};
        `;
      //5
      console.log(queryString, queryParams);
      // 6
      return db.query(queryString, queryParams).then(res => res.rows);
    };

    getAllMaps(10)
      .then(maps => {
        res.send({ maps }).catch(err => {
          res.status(500).json({ error: err.message });
        });
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  router.get("/new", (req, res) => {
    res.render("map_form", { foo: "test" });
  });

  router.get("/user", (req, res) => {
    console.log("hello world");

    const getMapsByEmail = function(email, limit) {
      const queryParams = [];
      // 2
      let queryString = `
          SELECT * FROM users
          JOIN maps on maps.user_id = users.id
          WHERE true
          `;

      if (email) {
        queryParams.push(email);
        queryString += `AND user_id = $${queryParams.length} `;
      }

      // 4
      queryParams.push(limit);
      queryString += `
        LIMIT $${queryParams.length};
        `;
      //5
      console.log(queryString, queryParams);
      // 6
      return db.query(queryString, queryParams).then(res => res.rows);
    };
    console.log("cookie is: ", req.cookies["user_id"]);
    getMapsByEmail(Number(req.cookies["user_id"]), 10)
      .then(maps => {
        res.send({ maps }).catch(err => {
          res.status(500).json({ error: err.message });
        });
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  const createNewMap = function(
    user_id,
    title,
    description,
    image_url,
    active
  ) {
    // 1
    const queryParams = [user_id, title, description, image_url, active];
    // 2
    let queryString = ` INSERT INTO maps (user_id, title, description, image_url, active) VALUES ($1,$2,$3,$4,$5) `;
    //5
    console.log(queryString, queryParams);
    // 6
    return db.query(queryString, queryParams).then(res => res.rows[0]);
  };

  router.post("/", (req, res) => {
    console.log("GOT HERE");
    let data = req.body;
    console.log(data);
    let user_id = 1;
    let active = true;
    createNewMap(user_id, data.title, data.description, data.image_url, active);
    // res.redirect("/");
  });

  router.post("/markers", (req, res) => {
    console.log("GOT HERE");
    let data = req.body;
    console.log(data);
    createNewMarker(
      data.user_id,
      data.map_id,
      data.title,
      data.description,
      data.image_url,
      data.address,
      data.latitude,
      data.longitude
    );
    res.send(`<h1> ${data} </h1>`);
  });

  return router;
};
