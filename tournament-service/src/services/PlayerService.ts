import { Player, IPlayer, Team } from "../database";

const fetchPlayers = async (): Promise<IPlayer[]> => {
    const users = await Player.find();
    return users;
};

const addPlayer = async (data: any): Promise<IPlayer> => {
    const { name, order, team } = data;

    const player = await Player.create({
        name,
        order,
        team,
    });

    await Team.findByIdAndUpdate(team, { $push: { players: player._id } });

    return player;
};

export default {
    fetchPlayers,
    addPlayer,
};