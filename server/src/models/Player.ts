import mongoose, { Schema, Document } from 'mongoose';

interface IPlayer extends Document {
  name: string;
  position: string;
  dateOfBirth: Date;
  nationality: string;
  team: mongoose.Types.ObjectId;
}

const PlayerSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  nationality: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' }
});

export default mongoose.model<IPlayer>('Player', PlayerSchema);