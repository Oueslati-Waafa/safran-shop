const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/about', (req, res) => {
  res.send('About page');
});

const port = 9090; // or any other port you prefer

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});