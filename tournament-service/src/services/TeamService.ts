import { Team } from "../database";
import { ApiError } from "../utils";

const fetchTeams = async () => {
    const teams = await Team.find().populate("players");
    return teams;
};

const addTeam = async (data: any) => {
    const { name } = data;

    const teamExists = await Team.findOne({ name });
    if (teamExists) {
        throw new ApiError(400, "Team already exists!");
    }

    const team = await Team.create({
        name,
    });

    return team;
};

export default {
    fetchTeams,
    addTeam,
};