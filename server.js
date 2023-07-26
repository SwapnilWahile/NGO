const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { default: mongoose } = require("mongoose");
const uri =
  "mongodb+srv://tejashere693:Zuw3jV7NaCBG16Is@projectngo.7f1ngdv.mongodb.net/?retryWrites=true&w=majority";

const app = express();
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("once", () => {
  console.log("connected db");
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first: { type: String },
  amount: { type: Number },
});

const User = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  res.send(caller(req));
});

function caller(req) {
  response = {
    first: req.query.first,
    amount: req.query.amount
  };
  const newuser = new User(response);
  console.log(response);
  newuser.save().then(() => console.log("saved"));

  return response;
}
