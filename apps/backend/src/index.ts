import express, { Request, Response } from "express";
import { passportJwtSecret } from "jwks-rsa";
import passport from "passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

const app = express();

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKeyProvider: passportJwtSecret({
    cache: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `http://localhost:8080/realms/myrealm/protocol/openid-connect/certs`,
  }),
  issuer: "http://localhost:8080/realms/myrealm",
  audience: "account",
  algorithms: ["RS256"],
};

passport.use(
  new Strategy(options, (payload, done) => {
    return done(null, payload);
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "This is a protected route" });
  }
);

app.listen(3000);
