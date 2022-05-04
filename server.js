const express = require('express');

const apartments = [
  {
    id: 1,
    floor: 1,
    pos_on_floor: 1,
    price: 3,
    rooms: 3,
    area_total: 85.7,
    area_kitchen: 16.8,
    area_live: 46.6,
    layout_image: "src/assets/img.png"
  },
  {
    id: 2,
    floor: 2,
    pos_on_floor: 1,
    price: 3,
    rooms: 3,
    area_total: 85.7,
    area_kitchen: 16.8,
    area_live: 46.6,
    layout_image: "src/assets/img.png"
  },
  {
    id: 3,
    floor: 3,
    pos_on_floor: 1,
    price: 3,
    rooms: 3,
    area_total: 85.7,
    area_kitchen: 16.8,
    area_live: 46.6,
    layout_image: "src/assets/img.png"
  }
];

const PORT = 3001;
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/getAparts', (req, res) => {
  res.json(apartments);
})

app.use(express.json());
app.use(express.static('build'));

app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`);
});