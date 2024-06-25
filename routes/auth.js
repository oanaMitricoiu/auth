const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);

router.post(
    "/signup",
    [
        check("email")
            .isEmail()
            .withMessage("Please enter a valid email")
            .normalizeEmail(),
        body("password")
            .isLength({ min: 5 })
            .withMessage("Please enter a password with at least 5 characters")
            .trim(),
        body("confirmPassword")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords must match");
                }
                return true;
            })
            .trim(),
    ],
    authController.postSignup
);

router.post("/logout", authController.postLogout);

module.exports = router;
