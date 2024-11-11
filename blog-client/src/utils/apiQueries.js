import axios from "axios";

const url = "http://localhost:3000/users/auth";

export const postLogin = async (formObject) => {
  return await axios.post(url, {
    ...formObject,
  });
};
