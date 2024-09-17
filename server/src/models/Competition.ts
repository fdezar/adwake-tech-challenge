import mongoose, { Schema, Document } from 'mongoose';

interface ICompetition extends Document {
  name: string;
  code: string;
}

const CompetitionSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true 
    },
  code: { 
    type: String, 
    required: true, 
    unique: true 
    }
});

export default mongoose.model<ICompetition>('Competition', CompetitionSchema);