import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPlayer extends Document {
    name: string;
    order: number;
    team: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const PlayerSchema: Schema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name must be provided"],
            minlength: 3,
        },
        order: {
            type: Number,
            required: true,
            trim: true,
        },
        team: {
            type: Schema.Types.ObjectId,
            ref: "Team", // model name as defined below
        },
    },
    {
        timestamps: true,
    }
);

const Player = mongoose.model<IPlayer>("Player", PlayerSchema);
export default Player;
