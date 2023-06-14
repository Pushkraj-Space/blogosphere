const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const indexRouter = require('./routes/index');
app.use('/api', indexRouter);

// Home 
app.get('/', (req, res) => {
    res.status(200).json({message : "Welcome to BlogoSphere Chief"});
})


const port =  process.env._PORT || 3000;
app.listen(port, () => {
    console.log(`Application Running on port ${port}`);
})

