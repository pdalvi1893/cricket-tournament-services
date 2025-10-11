import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBowlingCard extends Document {
    name: string;
    all_shots_applicable: boolean;
    batting_cards: Types.ObjectId[]; // one-to-many (array of BattingCard IDs)
    createdAt: Date;
    updatedAt: Date;
}

const BowlingCardSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        all_shots_applicable: {
            type: Boolean,
            default: false,
        },
        // One-to-many relation
        batting_cards: [
            {
                type: Schema.Types.ObjectId,
                ref: "BattingCard", // model name as defined below
            },
        ],
    },
    {
        timestamps: true,
    }
);

const BowlingCard = mongoose.model<IBowlingCard>(
    "BowlingCard",
    BowlingCardSchema
);
export default BowlingCard;
