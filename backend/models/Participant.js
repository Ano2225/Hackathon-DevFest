import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  projectDescription: String,
  projectLeader: {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  otherParticipantsInfo: String,
});

const Participant = mongoose.model('Participant', participantSchema);

export default Participant;
