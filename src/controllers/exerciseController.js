const User = require('../models/User');
const Exercise = require('../models/Exercise');

exports.addExercise = async (req,res) => {
    try{
        const { _id } = req.params;
        const { description, duration, date } = req.body;

        const user = await User.findById(_id);

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const exercise = new Exercise({
            userId: _id,
            description,
            duration,
            date: date ? new Date(date) : undefined,
        });

        await exercise.save();

        res.status(201).json(exercise);
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getExerciseLog = async (req,res) => {
    try {
        const { _id } = req.params;
        const { from, to, limit } = req.query;

        const user = await User.findById(_id);

        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const query = { userId: _id };  // This query object will be used to find exercises associated with the specified user.

        if(from || to){
            query.date = {};  //If filtering by date is requested, an empty object is created for the date property in the query. This allows us to set date filters.
            if(from) query.date.$gte = new Date(from); //If the 'from' parameter is provided, it sets a filter to include exercises with a date greater than or equal to the from date. 
            if(to) query.date.$lte = new Date(to);  //If the 'to' parameter is provided, it sets a filter to include exercises with a date less than or equal to the to date.
        }

        const exercises = await Exercise.find(query)
            .limit(parseInt(limit, 10) || undefined)
            .sort('-date')
            .select('description duration date -_id');

         // Format the date property as a string using toDateString
        const formattedExercises = exercises.map((exercise) => ({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString(), // Format date as a string
      }));

        const response = {
            _id: user._id,
            username: user.username,
            count: exercises.length,
            log: formattedExercises, //formatted exercise array , cuz date in string format 
        };

        res.status(200).json(response);
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Server error' });
    }
};
