import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getUser } from "../repositories/auth.repository";
import { authValidation, tokenValidation } from "./../validations/auth.validation";

export const auth = async (req: any, res: any) => {
  try {
    const data = await authValidation.parse(req.body);

    const user = await getUser(data.email);
    if (!user) throw { message: "Usuário não existe" };

    if (user && !user.status) throw { message: "Usuário Bloqueado" };

    if (user && bcrypt.compareSync(data.password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          isAdmin: user.isAdmin,
        },
        String(process.env.TOKEN_KEY),
        { expiresIn: "24h" }
      );
      return res.status(200).send({ token });
    } else {
      return res.status(401).send({ message: "Não autorizado" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

export const validate = async (req: any, res: any) => {
  try {
    const data = await tokenValidation.parse(req.body);
    const decode = await jwt.decode(data.token);
    return res.status(200).send(decode);
  } catch (error) {
    res.status(400).send(error);
  }
};
