const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExcerciseSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: "Cardio or Resistance Needs to be selected"
    },

    name: {
        type: String,
        required: "A Workout needs to be selected"
    },

    duration: {
        type: Number, 
    },

    weight: {
        type: Number,
    },

    reps: {
        type: Number,
    },

    sets: {
        type: Number,
    },

    distance: {
        type: Number,
    }
})

const Excercise = mongoose.model("Excercise", ExcerciseSchema);

module.exports = Excercise;