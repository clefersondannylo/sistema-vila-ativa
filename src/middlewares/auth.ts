import jwt from "jsonwebtoken";

export const verifyToken = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw { message: "Necessário passar o token" };

    const replace = token.replace("Bearer ", "");
    const decoded = jwt.verify(replace, String(process.env.TOKEN_KEY));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};
