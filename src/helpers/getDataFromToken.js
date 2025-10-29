import jwt from "jsonwebtoken";

export const getDataFromToken = async (request) => {
    try {
        const token = await request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken?.id || "";

    } catch (error) {
        console.error("getDataFromToken error:", error.message);
        throw new Error(error.message);
    }
}