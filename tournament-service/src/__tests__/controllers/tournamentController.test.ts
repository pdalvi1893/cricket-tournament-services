import tournamentController from "../../controllers/TournamentController";
import tournamentService from "../../services/TournamentService";
import { Request, Response } from "express";

// Mock the service layer
jest.mock("../../services/TournamentService", () => ({
    getChallengeOutcome: jest.fn(),
    startMatch: jest.fn(),
}));

describe("Tournament Controller", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    describe("getChallengeOutcome", () => {
        it("should return 200 with commentary data", async () => {
            const mockCommentary = [{ ball: 1, outcome: "run" }];

            req.body = { matchId: "m1" };

            (tournamentService.getChallengeOutcome as jest.Mock).mockResolvedValue(
                mockCommentary
            );

            await tournamentController.getChallengeOutcome(req as Request, res as Response);

            expect(tournamentService.getChallengeOutcome).toHaveBeenCalledWith({ matchId: "m1" });
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                message: "Commentary!",
                data: mockCommentary,
            });
        });

        it("should return 500 on service error", async () => {
            req.body = { matchId: "m1" };

            (tournamentService.getChallengeOutcome as jest.Mock).mockRejectedValue(
                new Error("Service error")
            );

            await tournamentController.getChallengeOutcome(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                message: "Service error",
            });
        });
    });

    describe("startMatch", () => {
        it("should start a match and return 200", async () => {
            const mockMatch = { id: "match1", status: "started" };

            (tournamentService.startMatch as jest.Mock).mockResolvedValue(mockMatch);

            await tournamentController.startMatch(req as Request, res as Response);

            expect(tournamentService.startMatch).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                message: "Match started successfully!",
                data: mockMatch,
            });
        });

        it("should return 500 on service error", async () => {
            (tournamentService.startMatch as jest.Mock).mockRejectedValue(
                new Error("Failed to start match")
            );

            await tournamentController.startMatch(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                message: "Failed to start match",
            });
        });
    });
});
