const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//ROUTES BELOW//

//Get Array of Workouts//
app.get('/api/workouts', (req, res) => {
    
    db.Workout.find({})
    .then(dbWorkout => {
      console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
})

//Get Single Workout//
app.get('/exercise', (req, res) => {
  console.log(req.body);
  db.Workout
  .find({
    where: {_id: req.params.id}
  })
  .then(dbWorkouts => {
    res.json(dbWorkouts);
  })
  .catch(err => {
    res.json(err);
  })  
});

//Post an additional Workout//
app.post('/api/workouts/:id', (req, res) => {
  console.log(req.body);
  db.Workout
  .where({_id: req.params.id})
  .update({ $set:  req.body })
  .then(dbWorkouts => {
    res.json(dbWorkouts);
  })
  .catch(err => {
    res.json(err);
  })  
});

//Port
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
