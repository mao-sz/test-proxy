"use strict";

const app = require("express")();
const session = require("express-session");

app.set("trust proxy", 1);
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: ":eyes:",
    cookie: {
      name: "foo",
      sameSite: "none",
      httpOnly: true,
      secure: true,
    },
  }),
);

app.get("/", (req, res) => {
  res.json(process.env.FOO || "no FOO env");
});
app.post("/sessions", (req, res, next) => {
  req.session.userId = "logged in";
  req.session.save((err) => {
    if (err) {
      next(err);
    } else {
      res.json("logged in");
    }
  });
});
app.delete("/sessions", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.json("logged out");
    }
  });
});

app.listen(3000, () => console.log("Server listening at port 3000"));
