const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//ROUTES BELOW//

//GET Route to render Exercise Page
app.get('/exercise', (req, res) => {
  
  res.sendFile(path.join(__dirname, './public/exercise.html'));
})

//GET Route to render stats Page
app.get('/stats', (req, res) => {
  
  res.sendFile(path.join(__dirname, './public/stats.html'));
})

//Get Array of Workouts//
app.get('/api/workouts', (req, res) => {
    
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
})

//Get Array of Workouts//
app.get('/api/workouts/range', (req, res) => {
    
  db.Workout.aggregate( [
    {
      $addFields: {
       totalDuration: { $sum: "$exercises.duration" }
      }
    }
  ] )
  .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//Get Single Workout//
app.get('/api/workouts/:id', (req, res) => {
  db.Workout.findById(req.params.id)
  .then(dbWorkouts => {
    res.json(dbWorkouts);
  })
  .catch(err => {
    res.json(err);
  })  
});


//Post an additional Workout//
app.put('/api/workouts/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  db.Workout.findOneAndUpdate(
    { _id: req.params.id},
    {$push: {exercises: [req.body]}}, 
  )
  .then(dbWorkouts => {
    res.json(dbWorkouts);
  })
  .catch(err => {
    res.json(err);
  })  
});

//Create a Completely new Workout
app.post('/api/workouts', (req, res) => {
  console.log(req.body)
  db.Workout.create(req.body)
  .then (dbWorkouts => {
    res.json(dbWorkouts);
  })
  .catch (err => {
    res.json(err);
  })
})


//Port
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });

  