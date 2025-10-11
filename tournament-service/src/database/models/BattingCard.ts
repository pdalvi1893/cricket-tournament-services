import mongoose, { Schema, Document } from "mongoose";

export interface IBattingCard extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const BattingCardSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true, 
    }
);

const BattingCard = mongoose.model<IBattingCard>("BattingCard", BattingCardSchema);
export default BattingCard;