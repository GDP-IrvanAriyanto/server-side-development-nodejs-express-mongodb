const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://root:rootpassword@localhost:27017";

const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then((db) => {
  console.log("Connected correctly to server");

  var newDish = Dishes({
    name: "Uthapisszza",
    description: "test",
  });

  newDish
    .save()
    .then((dish) => {
      console.log(dish);
      Dishes.find({}).exec();
    })
    .then((dishes) => {
      console.log(dishes);
      return Dishes.deleteOne({});
    })
    .then(() => {
      return mongoose.connections.close;
    })
    .catch((err) => {
      console.log(err);
    });
});
