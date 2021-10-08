const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    date: {
        type: Date,
    },
    exercises: [ 
        
        {
            type: {
                type: String,
                trim: true,
                required: "Cardio or Resistance Needs to be selected"
            },
        },

        {
            name: {
                type: String,
                required: "A Workout needs to be selected"
            },
        },
        
        {
            duration: {
                type: Number, 
            },
        },
    
        {    
            weight: {
                type: Number,
            },
        },
    
        {    
            reps: {
                type: Number,
            },
        },
        
        {
            sets: {
                type: Number,
            },
        },
        
        {
            distance: {
                type: Number,
            }
        }
    ]
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;