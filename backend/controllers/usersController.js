import * as db from "../db/queries.js";

export const postCreateUser = async (req, res, next) => {
  try {
    const user = {
      username: req.body.username,
      password: req.body.password,
      isAuthor: req.body.isAuthor === "true",
    };
    const createdUser = await db.createUser(user);
    res.json(createdUser);
  } catch (error) {
    console.error("There was an error creating user", error);
    next(error);
  }
};

export const putUpdateUser = async (req, res, next) => {
  try {
    const user = {
      id: Number(req.params.userId),
      username: req.body.username,
      isAuthor: req.body.isAuthor === "true",
    };
    const updatedUser = await db.updateUser(user);
    res.json(updatedUser);
  } catch (error) {
    console.error("There was an error updating user", error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await db.deleteUser(Number(req.params.userId));
    delete deletedUser.password;
    res.json(deletedUser);
  } catch (error) {
    console.error("There was an error deleting user", error);
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await db.getUsers();
    res.json(users);
  } catch (error) {
    console.error("There was an error getting users", error);
    next(error);
  }
};
