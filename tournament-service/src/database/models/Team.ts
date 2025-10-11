import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITeam extends Document {
    name: string;
    players: Types.ObjectId[]; 
    createdAt: Date;
    updatedAt: Date;
}

const TeamSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        // One-to-many relation
        players: [
            {
                type: Schema.Types.ObjectId,
                ref: "Player", // model name as defined below
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Team = mongoose.model<ITeam>(
    "Team",
    TeamSchema
);
export default Team;
