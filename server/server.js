const express = require('express');
const app = express();
const port = 3000;
const pgp = require('pg-promise')();
const dbUser = process.env.POSTGRES_USER;
const dbPw = process.env.POSTGRES_PASSWORD;
const dbPath = process.env.POSTGRES_DB;
const db = pgp(`postgres://${dbUser}:${dbPw}@db:5432/${dbPath}`);


// TESTING SERVER IS ONLINE
db.one('Select $1 AS value', 123)
  .then(data => console.log('DATA: ', data.value))
  .catch(err => console.log('ERROR: ', error));


app.get('/', (req, res) => {
  db.query('SELECT * FROM team;', (err, dbResponse) => {
    if (err) {
      res.status(400);
      res.send('Database is not connected successfully!');
    }
    res.send(dbResponse);
    db.end();
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// app.get('/products', (req, res) => {
//   let page = req.query.page || 1;
//   let count = req.query.count || 5;
//   db.query(`SELECT * FROM product ORDER BY id ASC LIMIT ${count} OFFSET ${(count * page) - count}`)
//   .then(response => res.send(response))
//   .catch(err => {
//     console.log('error getting products');
//     res.send(err);
//   })
// })

// app.get('/products/:product_id', (req, res) => {
//   let id = req.params.product_id;
//   db.task('get-everything', async t => {
//     const details = await t.one(`SELECT * FROM product WHERE id=${id}`);
//     const features = await t.many(`SELECT feature, value FROM features WHERE product_id=${id}`);
//     details.features = features;
//     return details;
//   })
//   .then(response => {
//     res.send(response);
//   })
//   .catch(err => {
//     console.log('unable to get product id info', err);
//     res.send(err);
//   });
// })

// app.get('/products/:product_id/styles', (req, res) => {
//   let id = req.params.product_id;
//   db.query(`SELECT * FROM styles WHERE productid=${id}`)
//   .then(async styles => {
//     let allStyles = [];
//     for await (style of styles) {
//       await db.task('get-everything', async t => {
//         const skus = await db.query(`SELECT id, size, quantity FROM skus WHERE styleid=${style.id}`);
//         const photos = await db.query(`SELECT thumbnail_url, url FROM photos WHERE styleid=${style.id}`);
//         style.skus = skus;
//         style.photos = photos;
//         allStyles.push(style);
//       })
//     }
//     return allStyles;
//   })
//   .then(response => res.send(response))
//   .catch(err => {
//     console.log('unable to get product id info', err);
//     res.send(err);
//   });
// })

// app.get('/products/:product_id/related', (req, res) => {
//   let id = req.params.product_id;
//   db.query(`SELECT related_product_id FROM related WHERE current_product_id=${id}`)
//   .then(relatedItems => {
//     let result = relatedItems.map(item => item.related_product_id);
//     res.send(result);
//   })
//   .catch(err => {
//     console.log('unable to get product related items', err);
//     res.send(err);
//   })
// });

// app.listen(port, () => {
//   console.log(`app listening at http://localhost:${port}`);
// })