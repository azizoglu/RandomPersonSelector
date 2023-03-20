const express = require('express');
const fs = require('fs');
const cors = require('cors');

const path = require('path');
const xlsx = require('xlsx');

const app = express();
const PORT = 3000;
const FILE_PATH = 'persons.xlsx';

app.use(cors());

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

app.get('/get-random-person', (req, res) => {
  const workbook = xlsx.readFile(FILE_PATH);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const persons = xlsx.utils.sheet_to_json(worksheet);
  const randomIndex = Math.floor(Math.random() * persons.length);
  const selectedPerson = persons[randomIndex];
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(JSON.stringify(selectedPerson));
});

app.use((req, res) => {
  // 404 hataları için yanıt ver
  res.statusCode = 404;
  res.end('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
