const express = require('express');
const fs = require('fs');
const csv = require('csv-parser')

const apartments = [];

const PORT = 3001;
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

fs.createReadStream('flats_data.csv')
  .pipe(csv())
  .on('data', (data) => apartments.push(data))
  .on('end', () => {});

app.get('/getAparts', (req, res) => {
  res.json(apartments);
})

app.get('/getApartByID', (req, res) => {
  const id = req.query.id;
  const apart = apartments.find(ap => ap.id === id);
  res.json(apart);
})

app.use(express.json());
app.use(express.static('build'));

app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`);
});