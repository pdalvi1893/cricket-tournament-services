import lookupService from "../../services/LookupService";
import {
    BattingCard,
    BowlingCard,
    CommentaryMaster,
    ShotTiming,
    Run,
} from "../../database";

jest.mock("../../database", () => ({
    BattingCard: { find: jest.fn(), create: jest.fn() },
    BowlingCard: { find: jest.fn(), create: jest.fn() },
    CommentaryMaster: { find: jest.fn(), create: jest.fn() },
    ShotTiming: { find: jest.fn(), create: jest.fn() },
    Run: { find: jest.fn(), create: jest.fn() },
}));

describe("Lookup Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("fetchItems", () => {
        it("should fetch batting cards", async () => {
            const mockData = [{ id: 1, name: "Batter 1" }];
            (BattingCard.find as jest.Mock).mockResolvedValue(mockData);

            const result = await lookupService.fetchItems({ type: "batting-cards" });

            expect(BattingCard.find).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockData);
        });

        it("should fetch bowling cards with populate", async () => {
            const mockData = [{ id: 1, name: "Bowler 1" }];
            (BowlingCard.find as jest.Mock).mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockData),
            });

            const result = await lookupService.fetchItems({ type: "bowling-cards" });

            expect(BowlingCard.find).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockData);
        });

        it("should fetch commentary master table with populate", async () => {
            const mockData = [{ id: 1, text: "Commentary" }];
            (CommentaryMaster.find as jest.Mock).mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockData),
            });

            const result = await lookupService.fetchItems({
                type: "commentary-master-table",
            });

            expect(CommentaryMaster.find).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockData);
        });

        it("should return empty array for unknown type", async () => {
            const result = await lookupService.fetchItems({ type: "unknown" });
            expect(result).toEqual([]);
        });
    });

    describe("addItem", () => {
        it("should add batting card", async () => {
            const mockItem = { id: 1, name: "Batter 1" };
            (BattingCard.create as jest.Mock).mockResolvedValue(mockItem);

            const result = await lookupService.addItem({
                type: "batting-cards",
                name: "Batter 1",
            });

            expect(BattingCard.create).toHaveBeenCalledWith({
                type: "batting-cards",
                name: "Batter 1",
            });
            expect(result).toEqual(mockItem);
        });

        // it("should add bowling card with batting_cards array", async () => {
        //     const mockItem = { id: 2, name: "Bowler 1", batting_cards: ["b1", "b2"] };
        //     (BowlingCard.create as jest.Mock).mockResolvedValue(mockItem);

        //     const result = await lookupService.addItem({
        //         type: "bowling-cards",
        //         name: "Bowler 1",
        //         batting_cards: "b1,b2",
        //         all_shots_applicable: true,
        //     });

        //     expect(BowlingCard.create).toHaveBeenCalledWith({
        //         type: "bowling-cards",
        //         name: "Bowler 1",
        //         batting_cards: ["b1", "b2"],
        //         all_shots_applicable: true,
        //     });
        //     expect(result).toEqual(mockItem);
        // });

        it("should add commentary master with default is_wicket_template", async () => {
            const mockItem = { id: 3, text: "Commentary", is_wicket_template: false };
            (CommentaryMaster.create as jest.Mock).mockResolvedValue(mockItem);

            const result = await lookupService.addItem({
                type: "commentary-master-table",
                text: "Commentary",
            });

            expect(CommentaryMaster.create).toHaveBeenCalledWith({
                type: "commentary-master-table",
                text: "Commentary",
                is_wicket_template: false,
            });
            expect(result).toEqual(mockItem);
        });

        it("should return empty array for unknown type", async () => {
            const result = await lookupService.addItem({ type: "unknown" });
            expect(result).toEqual([]);
        });
    });
});
