const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./routes/usersroute');

// configuration
const app = express();
dotenv.config({ path:'config/.env' });


// using app
app.use(cors());
app.use(userRouter);


// port server
app.listen(process.env.PORT, () => {
    console.log(`localhost:${process.env.PORT}`)
});