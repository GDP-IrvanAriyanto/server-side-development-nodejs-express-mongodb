const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://root:rootpassword@localhost:27017";

const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

connect.then((db) => {
  console.log("Connected correctly to server");

  Dishes.create({
    name: "Uthapissssasd2",
    description: "test",
  })
    .then((dish) => {
      console.log(dish);
      return Dishes.findByIdAndUpdate(
        dish._id,
        {
          $set: { description: "Updated test" },
        },
        {
          new: true,
        }
      ).exec();
    })
    .then((dish) => {
      console.log(dish);
      dish.comments.push({
        rating: 5,
        comment: "testing comment",
        author: "Leonardo",
      });

      return dish.save();
    })
    .then((dish) => {
      console.log(dish);
      return Dishes.deleteOne({});
    })
    .then(() => {
      return mongoose.connections.close;
    })
    .catch((err) => {
      console.log(err);
    });
});
