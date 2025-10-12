import { BattingCard, BowlingCard, CommentaryMaster, ShotTiming, Run } from "../database";
import { ApiError } from "../utils";

const fetchItems = async (data: any): Promise<any[]> => {
    const { type } = data;
    let result: any[] = [];

    switch (type) {
        case 'batting-cards':
            result = await BattingCard.find();
            break;
        case 'bowling-cards':
            result = await BowlingCard.find().populate('batting_cards');
            break;
        case 'commentary-master-table':
            result = await CommentaryMaster.find().populate('shot_timing');
            break;
        case 'shot-timing':
            result = await ShotTiming.find().populate('runs');
            break;
        case 'run':
            result = await Run.find();
            break;
        default:
            result = [];
            break;
    };

    return result;
};

const addItem = async (data: any): Promise<any> => {
    const { type } = data;
    let result: any = {};

    switch (type) {
        case 'batting-cards':
            result = await BattingCard.create({
                ...data,
            });
            break;
        case 'bowling-cards':
            const batting_cards = data?.batting_cards?.split(',');
            result = await BowlingCard.create({
                ...data,
                batting_cards,
                all_shots_applicable: data?.all_shots_applicable || false,
            });
        case 'commentary-master-table':
            result = await CommentaryMaster.create({
                ...data,
                is_wicket_template: data?.is_wicket_template || false,
            });
            break;
        case 'shot-timing':
            const runs = data?.runs?.split(',');
            result = await ShotTiming.create({
                ...data,
                runs,
            });
            break;
        case 'run':
            result = await Run.create({
                ...data,
            });
            break;
        default:
            result = [];
            break;
    };

    return result;
};

export default {
    fetchItems,
    addItem,
};