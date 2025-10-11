import mongoose, { Schema, Document } from "mongoose";

export interface IRun extends Document {
    name: string;
    value: number;
    key: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "SIX" | "WICKET";
    createdAt: Date;
    updatedAt: Date;
}

const RunSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        value: {
            type: Number,
            required: true,
        },
        key: {
            type: String,
            required: true,
            enum: ["ZERO", "ONE", "TWO", "THREE", "FOUR", "SIX", "WICKET"],
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
);

const Run = mongoose.model<IRun>("Run", RunSchema);
export default Run;