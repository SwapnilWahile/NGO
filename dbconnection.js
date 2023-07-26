
const express = require('express');
const mongoose = require("mongoose");

// create an schema


const app = express();

mongoose
  .connect("mongodb://192.168.0.14:27017/testdb", {})
  .then((result) => console.log("db connected"))
  .catch((err) => console.log(err));

function caller(req){
  response = {
    firstName: req.query.first
  }

  var userSchema = new mongoose.Schema({
    full_name: String,
});

userTable=mongoose.model('users',userSchema);
          
userData= new userTable(response);
userData.save();

  console.log(response);   
  return JSON.stringify(response); 
}

app.get('/', (req, res) => {
  res.send(caller(req));
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});


