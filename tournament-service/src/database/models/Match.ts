import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMatch extends Document {
    name: string;
    team: Types.ObjectId;
    opponent: Types.ObjectId;
    opponent_one_runs: number;
    opponent_two_runs: number;
    opponent_one_wickets: number;
    opponent_two_wickets: number;
    // commentary
    balls_faced: number;
    createdAt: Date;
    updatedAt: Date;
}

const MatchSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        // One-to-many relation
        team: {
            type: Schema.Types.ObjectId,
            ref: "Team", // model name as defined below
            unique: true,
        },
        opponent: {
            type: Schema.Types.ObjectId,
            ref: "Team", // model name as defined below
            unique: true,
        },
        value: {
            type: Number,
            required: true,
        },
        opponent_one_runs: {
            type: Number,
            required: true,
        },
        opponent_two_runs: {
            type: Number,
            required: true,
        },
        opponent_one_wickets: {
            type: Number,
            required: true,
        },
        opponent_two_wickets: {
            type: Number,
            required: true,
        },
        balls_faced: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Match = mongoose.model<IMatch>(
    "Match",
    MatchSchema
);
export default Match;
