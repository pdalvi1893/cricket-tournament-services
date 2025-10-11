import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICommentaryMaster extends Document {
    template: string;
    secondary_template: string;
    is_wicket_template: boolean;
    extra_filter_tags: "TIE_TEMPLATE" | "WIN_TEMPLATE" | "WIN_TWO_TEMPLATE";
    shot_timing: Types.ObjectId;
    //batting_cards: Types.ObjectId[]; // one-to-many (array of BattingCard IDs)
    createdAt: Date;
    updatedAt: Date;
}

const CommentaryMasterSchema: Schema = new Schema(
    {
        template: {
            type: String,
            required: true,
            trim: true,
        },
        secondary_template: {
            type: String,
            required: true,
            trim: true,
        },
        is_wicket_template: {
            type: Boolean,
            default: false,
        },
        extra_filter_tags: {
            type: String,
            required: true,
            enum: ["TIE_TEMPLATE", "WIN_TEMPLATE", "WIN_TWO_TEMPLATE"],
        },
        shot_timing: {
            type: Schema.Types.ObjectId,
            ref: "ShotTiming", // model name as defined below
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const CommentaryMaster = mongoose.model<ICommentaryMaster>(
    "CommentaryMaster",
    CommentaryMasterSchema
);
export default CommentaryMaster;
