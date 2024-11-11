import passport from "passport";

export const userLogin = async (req, res, next) => {
  try {
    passport.authenticate(
      "local",
      {
        session: false,
      },
      (err, user, info) => {
        if (user) {
          return res.json(user);
        }
        return res.status(401).json(info?.message);
      }
    )(req, res, next);
  } catch (error) {
    console.error("There was an error logging user", error);
    next(error);
  }
};

export const verifyJwt = async (req, res, next) => {
  try {
    passport.authenticate("jwt", { session: false })(req, res, next);
  } catch (error) {
    console.error("There was an error verifying JWT", error);
    next(error);
  }
};
