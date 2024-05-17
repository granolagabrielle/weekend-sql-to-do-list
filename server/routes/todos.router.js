const router = require('express').Router();
const pool = require('../modules/pool');

// GET to grab data from server
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "todos";`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.error(`ERROR querying: `, error);
      res.status(500).send(error);
    });
});

// POST to post new data to server

// PUT to update item as completed

// DELETE to delete item from database

module.exports = router;
