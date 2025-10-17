import teamController from "../../controllers/TeamController";
import teamService from "../../services/TeamService";

jest.mock("../../services/TeamService", () => ({
  fetchTeams: jest.fn(),
  addTeam: jest.fn(),
}));

describe("Team Controller", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe("fetchTeams", () => {
    it("should return 200 with list of teams", async () => {
      const mockTeams = [
        { _id: "1", name: "Team A" },
        { _id: "2", name: "Team B" },
      ];

      (teamService.fetchTeams as jest.Mock).mockResolvedValue(mockTeams);

      await teamController.fetchTeams(req, res);

      expect(teamService.fetchTeams).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: "Teams fetched successfully!",
        data: mockTeams,
      });
    });

    it("should return 500 on service error", async () => {
      (teamService.fetchTeams as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await teamController.fetchTeams(req, res);

      expect(res.json).toHaveBeenCalledWith({
        status: 500,
        message: "Database error",
      });
    });
  });

  describe("addTeam", () => {
    it("should create a team and return 200", async () => {
      const mockTeam = { _id: "t1", name: "New Team" };

      req.body = { name: "New Team" };

      (teamService.addTeam as jest.Mock).mockResolvedValue(mockTeam);

      await teamController.addTeam(req, res);

      expect(teamService.addTeam).toHaveBeenCalledWith({ name: "New Team" });

      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: "User registered successfully!",
        data: mockTeam,
      });
    });

    it("should handle errors and return 500", async () => {
      req.body = { name: "Fail Team" };
      (teamService.addTeam as jest.Mock).mockRejectedValue(
        new Error("Something went wrong")
      );

      await teamController.addTeam(req, res);

      expect(res.json).toHaveBeenCalledWith({
        status: 500,
        message: "Something went wrong",
      });
    });
  });
});
