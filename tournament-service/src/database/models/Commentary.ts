import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface ICommentary extends Document {
    commentary: string;
    match: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const CommentarySchema: Schema = new Schema(
    {
        commentary: {
            type: String,
            trim: true,
            minlength: 3,
        },
        match: {
            type: Schema.Types.ObjectId,
            ref: "Match", // model name as defined below
        },
    },
    {
        timestamps: true,
    }
);

const Commentary = mongoose.model<ICommentary>("Commentary", CommentarySchema);
export default Commentary;
