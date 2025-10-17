import playerService from "../../services/PlayerService";
import { Player, Team } from "../../database";

jest.mock("../../database", () => ({
    Player: {
        find: jest.fn(),
        create: jest.fn(),
    },
    Team: {
        findByIdAndUpdate: jest.fn(),
    },
}));

describe("Player Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("fetchPlayers", () => {
        it("should fetch players and populate team", async () => {
            const mockPopulate = jest.fn().mockResolvedValue([
                { name: "John", team: { name: "Team A" } },
            ]);
            // @ts-ignore
            Player.find.mockReturnValue({ populate: mockPopulate });

            const result = await playerService.fetchPlayers();

            expect(Player.find).toHaveBeenCalledTimes(1);
            expect(mockPopulate).toHaveBeenCalledWith("team");
            expect(result).toEqual([{ name: "John", team: { name: "Team A" } }]);
        });
    });

    describe("addPlayer", () => {
        it("should create player and update team", async () => {
            const mockPlayer = { _id: "p1", name: "Jane", order: 1, team: "t1" };

            (Player.create as jest.Mock).mockResolvedValue(mockPlayer);
            (Team.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

            const result = await playerService.addPlayer({
                name: "Jane",
                order: 1,
                team: "t1",
            });

            expect(Player.create).toHaveBeenCalledWith({
                name: "Jane",
                order: 1,
                team: "t1",
            });

            expect(Team.findByIdAndUpdate).toHaveBeenCalledWith("t1", {
                $push: { players: "p1" },
            });

            expect(result).toEqual(mockPlayer);
        });
    });
});
