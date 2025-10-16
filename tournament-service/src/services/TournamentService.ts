import { CommentaryMaster, ShotTiming, IRun, Match, IMatch, Commentary } from "../database";
import { getRandomNumber, replaceTemplateStrings } from "../utils/helper";

const getChallengeOutcome = async (data: any): Promise<any[]> => {
    const { type } = data;
    let result: any;

    switch (type) {
        case 'CHALLENGE_ONE':
            result = generateOutcomeForChallengeOne(data);
            break;
        case 'CHALLENGE_TWO':
            result = generateOutcomeForChallengeTwo(data);
            break;
        case 'CHALLENGE_THREE':
            result = getOutcomeForChallengeThree(data);
            break;
        default:
            break;
    };

    return result;
};

const generateOutcomeForChallengeOne = async (data: any) => {
    const {
        match_id,
        challenge_name,
        batting_card,
        bowling_card,
        shot_timing
    } = data;

    const match = await Match.findById(match_id) as IMatch;

    if (match.balls_faced + 1 > 10) return await Commentary.find({ match: match_id });

    const runScored = await getOutcomeFromShotTiming(shot_timing);

    let templateString =
        runScored.run.value === 1
            ? `${runScored.run.value} Run`
            : `${runScored.run.value} Runs`;

    if (runScored.wicket) templateString = `1 Wicket`;

    await Commentary.create({
        commentary: templateString,
        match: match_id,
        batting_card,
        bowling_card,
    });

    await Match.findByIdAndUpdate(match_id, {
        $inc: { balls_faced: 1 }
    });

    const commentary = await Commentary.find({ match: match_id });

    return commentary;
};

const generateOutcomeForChallengeTwo = async (data: any) => {
    const {
        match_id,
        challenge_name,
        batting_card,
        bowling_card,
        shot_timing,
    } = data;

    const match = await Match.findById(match_id) as IMatch;

    if (match.balls_faced + 1 > 10) return [];

    const runScored: any = getOutcomeFromShotTiming(shot_timing);

    let commentaryList = await CommentaryMaster.find({ shot_timing: shot_timing, }).populate('shot_timing');

    if (runScored.wicket) commentaryList = await CommentaryMaster.find({ is_wicket_template: true, }).populate('shot_timing');

    const template = commentaryList[getRandomNumber(commentaryList.length)];

    await Commentary.create({
        commentary: `${template.secondary_template} - ${(runScored.wicket ? "Wicket" : `${runScored.run.value} Runs`)}`,
        match: match_id,
        batting_card,
        bowling_card,
        shot_timing,
    });

    await Match.findByIdAndUpdate(match_id, {
        $inc: { balls_faced: 1 }
    });

    return [];
};

const getOutcomeForChallengeThree = async (data: any) => {
    const {
        match_id,
        challenge_name,
        batting_card,
        bowling_card,
        shot_timing,
    } = data;

    const match = await Match.findById(match_id) as IMatch;

    if (match.balls_faced + 1 > 10) return [];

    const runScored: any = getOutcomeFromShotTiming(shot_timing);

    let commentaryList = await CommentaryMaster.find({ shot_timing: shot_timing, }).populate('shot_timing');

    if (runScored.wicket) commentaryList = await CommentaryMaster.find({ is_wicket_template: true, }).populate('shot_timing');

    const template = commentaryList[getRandomNumber(commentaryList.length)];

    await Commentary.create({
        commentary: `${template.secondary_template} - ${(runScored.wicket ? "Wicket" : `${runScored.run.value} Runs`)}`,
        match: match_id,
        batting_card,
        bowling_card,
        shot_timing,
    });

    await Match.findByIdAndUpdate(match_id, {
        $inc: { balls_faced: 1 }
    });

    return [];
};


const getOutcomeFromShotTiming = async (id: string): Promise<any> => {
    const shotTiming: any = await ShotTiming.findById(id).populate<IRun>('runs');

    const run: any = shotTiming.runs[getRandomNumber(shotTiming.runs.length)];

    const result: any = {
        run: {
            name: run.name,
            value: run.value,
        },
        wicket: false,
    };

    if (run.key === "WICKET") result.wicket = true;

    return result;
};


const startMatch = async () => {
    const count = await Match.countDocuments();

    const match = await Match.create({
        name: `Match #${count + 1}`,
        balls_faced: 0,
        value: 0,
        opponent_one_runs: 0,
        opponent_two_runs: 0,
        opponent_one_wickets: 0,
        opponent_two_wickets: 0,
    });

    return match;
};

export default {
    getChallengeOutcome,
    startMatch,
};