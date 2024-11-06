import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import * as db from "../db/queries.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username);

      // User doesn't exist
      if (!user) {
        return done(null, false, { msg: "Incorrect username" });
      }

      //Check if passwords match
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { msg: "Incorrect password" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
      );
      return done(null, token);
    } catch (err) {
      return done(err);
    }
  })
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      return done(null, jwt_payload);
    } catch (err) {
      return done(err, false);
    }
  })
);
