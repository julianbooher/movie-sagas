const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  console.log('in GET id route movie.router.js', req.body);
  const queryText = `SELECT * FROM movies WHERE id = $1`
  pool.query(queryText, [req.params.id])
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('Error in GET/:id route in movie.router.js', error);
    res.sendStatus(500);
  })
})

router.get('/genres/:id', (req, res) => {
  console.log('in GET genres/id route movie.router.js', req.body);
  const queryText = `SELECT genres.name AS name, genres.id AS id FROM movies
  JOIN movies_genres ON movies_genres.movies_id = movies.id
  JOIN genres ON movies_genres.genres_id = genres.id
  WHERE movies.id=$1;`
  pool.query(queryText, [req.params.id])
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('Error in GET/genres/:id route in movie.router.js', error);
    res.sendStatus(500);
  })
})

router.get('/', (req, res) => {
  console.log('in GET route movie.router.js');
  const queryText = 'SELECT * FROM movies ORDER BY title ASC'
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('Error in GET route movie.router.js');
    res.sendStatus(500);
  });
});


router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Depending on how you make your junction table, this insert COULD change.
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movies_id", "genres_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY MAKES GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

router.put('/', (req, res) => {
  console.log('in put route', req.body);
  // RETURNING "id" will give us back the id of the created movie
  const updateMovieQuery = `
  UPDATE movies
  SET title = $1, poster = $2, description = $3
  WHERE id = $4;`

  // FIRST QUERY MAKES MOVIE
  pool.query(updateMovieQuery, [req.body.title, req.body.poster, req.body.description, req.body.id])
  .then(result => {
    

    // Depending on how you make your junction table, this insert COULD change.
    const insertMovieGenreQuery = `
      UPDATE movies_genres
      SET genres_id = $1
      WHERE movies_id = $2;
      `
      // SECOND QUERY MAKES GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [req.body.genre_id, req.body.id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;