const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
var cors = require('cors')

 
const ConnectDb = require("./db")


const app = express()
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT || 8080



// // Define Mongoose model
// const DataModel = db.model('Data', dataSchema);

// // Function to handle data insertion
// const insertDataToDB = async (data) => {
//   try {
//     // Create a new document based on the model
//     const newData = new DataModel(data);

//     // Save the document to the database
//     await newData.save();

//     console.log('Data inserted successfully');
//   } catch (error) {
//     console.error('Error:', error);
//     // Handle the error appropriately
//   }
// };

// // insertDataToDB(data);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// MongoDB connection
// ConnectDb(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: 'roboAdvisor',
// });
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'roboAdvisor',
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Define Mongoose schema
const dataSchema = new mongoose.Schema({
  id: Number,
  risk_score: Number,
  nigerian_stock: String,
  foreign_stock: String,
  tech_stock: String,
  emerging_stock: String,
  nigerian_bonds: String,
  foreign_bonds: String,
  commodities: String,
  real_estate: String,
  t_bills: String,
  alternative: String,
}, { collection: 'RoboAdvisor' }); 

// Define Mongoose model
const DataModel = mongoose.model('Data', dataSchema);

// Route to handle GET requests and retrieve data
app.get('/api/data', async (req, res) => {
  try {
    // Fetch data from the "RoboAdvisor" collection in the "RoboAdvisor" database
    const data = await DataModel.find({});

    // Send the data as a JSON response
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// const start = async() => {
//   try{
//     await ConnectDb(process.env.MONGO_URI)
//     app.listen(PORT, () => console.log(`listening on port ${PORT}`))
//   }catch(error){
//     console.log(error)
//   }
// }

// start()



