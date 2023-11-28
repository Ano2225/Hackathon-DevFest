import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
//Pour pourvoir utiliser le fichier .env
import dotenv from "dotenv";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
dotenv.config()

app.use(cors());

// MongoDB connection
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log('MongoDB database is connected')

    }
    catch(err) {
        console.error('MongoDB database is not connected',err)
    }
}
// Participant Model
import Participant from './models/Participant.js';

// Endpoint to handle participant registration
app.post('/api/participants', async (req, res) => {

  const {
    groupName,
    projectName,
    schoolName,
    email,
    projectLeader,
    projectDescription,
    otherParticipantsInfo,
  } = req.body;

  try {
    // Créer une nouvelle instance de Participant
    const newParticipant = new Participant({
      groupName,
      projectName,
      schoolName,
      email,
      projectLeader,
      projectDescription,
      otherParticipantsInfo,
    });

    // Enregistrer le participant dans la base de données
    await newParticipant.save();
    
    res.status(201).json({
      message: 'Les informations ont bien été reçues. Bonne chance à vous!',
      participant: newParticipant 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req,res) => {
  res.send("Api is working")
})

//Ecoute du port
app.listen(PORT,() => {
    connectDB();
    console.log('Running on port'+ PORT)
})
