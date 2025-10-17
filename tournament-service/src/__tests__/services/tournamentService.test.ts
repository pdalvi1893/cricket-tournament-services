import tournamentService from "../../services/TournamentService";
import {
    Match,
    Commentary,
    CommentaryMaster,
    ShotTiming,
    IRun,
} from "../../database";
import { getRandomNumber } from "../../utils/helper";

jest.mock("../../database", () => ({
    Match: {
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        create: jest.fn(),
        countDocuments: jest.fn(),
    },
    Commentary: { create: jest.fn(), find: jest.fn() },
    CommentaryMaster: { find: jest.fn().mockReturnValue({ populate: jest.fn() }) },
    ShotTiming: { findById: jest.fn().mockReturnValue({ populate: jest.fn() }) },
}));

jest.mock("../../utils/helper", () => ({
    getRandomNumber: jest.fn(),
    replaceTemplateStrings: jest.fn(),
}));

describe("Tournament Service", () => {
    const mockMatch = { _id: "m1", balls_faced: 0 } as any;
    const mockCommentary = [{ commentary: "1 Run" }];

    beforeEach(() => {
        jest.clearAllMocks();
        (getRandomNumber as jest.Mock).mockReturnValue(0);
    });

    describe("startMatch", () => {
        it("should create a new match", async () => {
            (Match.countDocuments as jest.Mock).mockResolvedValue(0);
            (Match.create as jest.Mock).mockResolvedValue({ _id: "match1" });

            const result = await tournamentService.startMatch();

            expect(Match.countDocuments).toHaveBeenCalledTimes(1);
            expect(Match.create).toHaveBeenCalledWith({
                name: "Match #1",
                balls_faced: 0,
                value: 0,
                opponent_one_runs: 0,
                opponent_two_runs: 0,
                opponent_one_wickets: 0,
                opponent_two_wickets: 0,
            });
            expect(result).toEqual({ _id: "match1" });
        });
    });

    describe("getChallengeOutcome", () => {
        it("should call generateOutcomeForChallengeOne", async () => {
            const mockShotTiming = { runs: [{ key: "RUN", name: "Run", value: 1 }] };
            (Match.findById as jest.Mock).mockResolvedValue({ ...mockMatch, balls_faced: 0 });
            (ShotTiming.findById as jest.Mock).mockReturnValue({ populate: jest.fn().mockResolvedValue(mockShotTiming) });
            (Commentary.create as jest.Mock).mockResolvedValue({});
            (Commentary.find as jest.Mock).mockResolvedValue(mockCommentary);
            (Match.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

            const result = await tournamentService.getChallengeOutcome({
                type: "CHALLENGE_ONE",
                match_id: "m1",
                batting_card: "b1",
                bowling_card: "bw1",
                shot_timing: "st1",
            });

            expect(Match.findById).toHaveBeenCalledWith("m1");
            expect(Commentary.create).toHaveBeenCalled();
            expect(Match.findByIdAndUpdate).toHaveBeenCalledWith("m1", { $inc: { balls_faced: 1 } });
            expect(Commentary.find).toHaveBeenCalledWith({ match: "m1" });
            expect(result).toEqual(mockCommentary);
        });

        it("should return empty array if balls_faced > 10 in CHALLENGE_THREE", async () => {
            (Match.findById as jest.Mock).mockResolvedValue({ ...mockMatch, balls_faced: 11 });
            const result = await tournamentService.getChallengeOutcome({
                type: "CHALLENGE_THREE",
                match_id: "m1",
            });

            expect(result).toEqual([]);
        });
    });
});
