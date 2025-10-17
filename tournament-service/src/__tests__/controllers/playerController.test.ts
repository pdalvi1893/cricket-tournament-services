import playerController from "../../controllers/PlayerController";
import playerService from "../../services/PlayerService";
import { Request, Response } from "express";

jest.mock("../../services/PlayerService", () => ({
    fetchPlayers: jest.fn(),
    addPlayer: jest.fn(),
}));

describe("Player Controller", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    describe("fetchPlayers", () => {
        it("should return 200 with list of players", async () => {
            const mockPlayers = [
                { _id: "1", name: "Player 1", order: 1, team: "Team A" },
                { _id: "2", name: "Player 2", order: 2, team: "Team B" },
            ];

            (playerService.fetchPlayers as jest.Mock).mockResolvedValue(mockPlayers);

            await playerController.fetchPlayers(req as Request, res as Response);

            expect(playerService.fetchPlayers).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                message: "Players fetched successfully!",
                data: mockPlayers,
            });
        });

        it("should return 500 on service error", async () => {
            (playerService.fetchPlayers as jest.Mock).mockRejectedValue(
                new Error("Service failure")
            );

            await playerController.fetchPlayers(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                message: "Service failure",
            });
        });
    });

    describe("addPlayer", () => {
        it("should add a player and return 200", async () => {
            const mockPlayer = {
                _id: "p1",
                name: "John",
                order: 1,
                team: "Team A",
            };

            req.body = { name: "John", order: 1, team: "Team A" };

            (playerService.addPlayer as jest.Mock).mockResolvedValue(mockPlayer);

            await playerController.addPlayer(req as Request, res as Response);

            expect(playerService.addPlayer).toHaveBeenCalledWith({
                name: "John",
                order: 1,
                team: "Team A",
            });

            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                message: "Player added successfully!",
                data: mockPlayer,
            });
        });

        it("should handle errors and return 500", async () => {
            req.body = { name: "Fail Player", order: 1, team: "Team A" };

            (playerService.addPlayer as jest.Mock).mockRejectedValue(
                new Error("Something went wrong")
            );

            await playerController.addPlayer(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                message: "Something went wrong",
            });
        });
    });
});
