import express, { Request, Response } from "express";

const login = async (req: Request, res: Response) => {
    try {
        // const { email, password } = req.body;
        // const user = await User.findOne({ email }).select("+password");
        // if (
        //     !user ||
        //     !(await isPasswordMatch(password, user.password as string))
        // ) {
        //     throw new ApiError(400, "Incorrect email or password");
        // }

        // const token = await createSendToken(user!, res);

        return res.json({
            status: 200,
            message: "User logged in successfully!",
            token: "",
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

export default {
    login,
};