const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5001;

//* middleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('ema-john practice2 server is running!')
});

app.listen(port, () => {
    console.log(`ema-john practice2 server is running on ${port} port`)
});