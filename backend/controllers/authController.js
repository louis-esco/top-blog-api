import passport from "passport";

export const userLogin = async (req, res, next) => {
  try {
    passport.authenticate("local", {
      session: false,
    })(req, res, next);
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
