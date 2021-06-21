const express = require("express");

const dishRouter = express.Router();

dishRouter.use(express.json());

dishRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((req, res, next) => {
    res.end("Will send all the dishes to you!");
  })

  .post((req, res, next) => {
    res.end(
      "Will add the dishes: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
  })

  .delete((req, res, next) => {
    res.end("Deleting all the dishes!");
  })

  .get((req, res, next) => {
    res.end("Will send all the dishes to you!");
  });

dishRouter
  .route("/:dishesId")
  .get((req, res, next) => {
    res.end(
      "Will send details of the dish: " + req.params.dishesId + " to you!"
    );
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishesId);
  })

  .put((req, res, next) => {
    res.write("Updating the dish: " + req.params.dishesId);
    res.end(
      " Will update the dish: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })

  .delete((req, res, next) => {
    res.end("Deleting dish: " + req.params.dishesId);
  });

module.exports = dishRouter;
