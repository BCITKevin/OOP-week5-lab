import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login");
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: "Login failed, please try it again!"
    /* FIX ME: 😭 failureMsg needed when login fails */
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
