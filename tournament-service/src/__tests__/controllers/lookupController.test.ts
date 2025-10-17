import lookupController from "../../controllers/LookupController";
import lookupService from "../../services/LookupService";
import { AuthRequest } from "../../middleware";

// Mock the service layer
jest.mock("../../services/LookupService", () => ({
    fetchItems: jest.fn(),
    addItem: jest.fn(),
}));

describe("Lookup Controller", () => {
    let req: Partial<AuthRequest>;
    let res: any;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    describe("fetchItems", () => {
        it("should return 200 with list of items", async () => {
            const mockItems = [
                { _id: "1", name: "Item A" },
                { _id: "2", name: "Item B" },
            ];

            req.query = { type: "player" };

            (lookupService.fetchItems as jest.Mock).mockResolvedValue(mockItems);

            await lookupController.fetchItems(req as AuthRequest, res);

            expect(lookupService.fetchItems).toHaveBeenCalledWith({ type: "player" });
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                message: "Players fetched successfully!",
                data: mockItems,
            });
        });

        it("should return 500 on service error", async () => {
            req.query = { type: "player" };

            (lookupService.fetchItems as jest.Mock).mockRejectedValue(
                new Error("Service failure")
            );

            await lookupController.fetchItems(req as AuthRequest, res);

            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                message: "Service failure",
            });
        });
    });

    describe("addItem", () => {
        it("should add an item and return 200", async () => {
            const mockItem = { _id: "i1", name: "New Item" };

            req.body = { name: "New Item" };

            (lookupService.addItem as jest.Mock).mockResolvedValue(mockItem);

            await lookupController.addItem(req as AuthRequest, res);

            expect(lookupService.addItem).toHaveBeenCalledWith({ name: "New Item" });
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                message: "Item added successfully!",
                data: mockItem,
            });
        });

        it("should handle errors and return 500", async () => {
            req.body = { name: "Fail Item" };

            (lookupService.addItem as jest.Mock).mockRejectedValue(
                new Error("Something went wrong")
            );

            await lookupController.addItem(req as AuthRequest, res);

            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                message: "Something went wrong",
            });
        });
    });
});
