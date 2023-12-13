import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { createUser, deleteUser, getAll, getById, updateUser } from "../repositories/user.repository";
import { userValidation } from "../validations/user.validation";

export async function create(req: Request, res: Response) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const data = await userValidation.parse(req.body);
    const user = await createUser(data);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function get(req: Request, res: Response) {
  try {
    const skip = Number(req.query?.skip) || 0;
    const take = Number(req.query?.take) || 20;
    const search = req.query?.search ? String(req.query?.search) : null;
    const user = await getAll(skip, take, search);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
}
export async function getId(req: Request, res: Response) {
  try {
    const user = await getById(Number(req.params.id));
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
}
export async function update(req: Request, res: Response) {
  try {
    const user = await updateUser(Number(req.params.id), req.body);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
}
export async function remove(req: Request, res: Response) {
  try {
    await deleteUser(Number(req.params.id));
    return res.status(204).send();
  } catch (error) {
    return res.status(400).send(error);
  }
}
