import mongoose, { Schema, Document, Types } from "mongoose";

export interface IShotTiming extends Document {
    name: string;
    runs: Types.ObjectId[]; // one-to-many (array of BattingCard IDs)
    createdAt: Date;
    updatedAt: Date;
}

const ShotTimingSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        runs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Run", // model name as defined below
            },
        ],
    },
    {
        timestamps: true,
    }
);

const ShotTiming = mongoose.model<IShotTiming>(
    "ShotTiming",
    ShotTimingSchema
);
export default ShotTiming;
