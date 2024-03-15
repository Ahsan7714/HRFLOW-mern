const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000 ;
const {connectDB} = require('./database/database')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const path = require('path');



connectDB();


app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      
      origin: ["http://localhost:5173"],
      
      credentials: true,
    })
  );

const admin = require('./routes/adminRoutes')
app.use('/api/v1',admin)

app.use(express.static(path.join(__dirname, "../client/dist")));


app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});


app.listen(port,()=>{
    console.log(`server is running on localhost ${port}`)
})
