import mongoose, { Schema, Document } from 'mongoose';

interface ITeam extends Document {
  name: string;
  tla: string;
  shortName: string;
  crest: string;
  competition: mongoose.Types.ObjectId;
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true },
  tla: { type: String, required: true },
  shortName: { type: String, required: true },
  crest: { type: String, required: true },
  competition: { type: Schema.Types.ObjectId, ref: 'Competition' }
});

export default mongoose.model<ITeam>('Team', TeamSchema);