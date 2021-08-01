const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://" + process.env.DB_USER_PASS +  "@clustersweethome.0pq9k.mongodb.net/sweetHomeDB",
    { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    }
)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log("Failed to connect to MongoDB", err));