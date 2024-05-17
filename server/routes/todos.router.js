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
router.post('/', (req, res) => {
  console.log('req.body: ', req.body);
  const queryText = `
    INSERT INTO "todos" ("text")
    VALUES ($1);`;
  pool
    .query(queryText, [req.body.text])
    .then((result) => res.sendStatus(201))
    .catch((error) => {
      console.error(`ERROR posting data to server: `, error);
      res.status(500).send(error);
    });
});

// PUT to update item as completed

// DELETE to delete item from database

module.exports = router;
