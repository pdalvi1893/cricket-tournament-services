import teamService from "../../services/TeamService";
import { Team } from "../../database";
import { ApiError } from "../../utils";

jest.mock("../../database", () => ({
    Team: {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
    },
}));

describe("Team Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("fetchTeams", () => {
        it("should fetch all teams and populate players", async () => {
            const mockTeams = [
                { _id: "t1", name: "Team A", players: [] },
                { _id: "t2", name: "Team B", players: [] },
            ];

            // Mock populate chain
            (Team.find as jest.Mock).mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockTeams),
            });

            const result = await teamService.fetchTeams();

            expect(Team.find).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockTeams);
        });
    });

    describe("addTeam", () => {
        it("should create a new team if it does not exist", async () => {
            const mockTeam = { _id: "t1", name: "Team A" };
            (Team.findOne as jest.Mock).mockResolvedValue(null);
            (Team.create as jest.Mock).mockResolvedValue(mockTeam);

            const result = await teamService.addTeam({ name: "Team A" });

            expect(Team.findOne).toHaveBeenCalledWith({ name: "Team A" });
            expect(Team.create).toHaveBeenCalledWith({ name: "Team A" });
            expect(result).toEqual(mockTeam);
        });

        it("should throw an error if team already exists", async () => {
            (Team.findOne as jest.Mock).mockResolvedValue({ _id: "t1", name: "Team A" });

            await expect(teamService.addTeam({ name: "Team A" })).rejects.toThrow(
                new ApiError(400, "Team already exists!")
            );

            expect(Team.findOne).toHaveBeenCalledWith({ name: "Team A" });
            expect(Team.create).not.toHaveBeenCalled();
        });
    });
});
