const router = require("express").Router();
const passport = require("passport");


router.use("/", require("./swagger"));


router.use("/users", require("./users"));
router.use("/students", require("./students"));




router.get("/login", passport.authenticate("github"), (req,res) =>{});

router.get("/logout", function (req,res,next){
    req.logOut(function(err){
        if (err) {return next (err);}
        res.redirect("/");
    });
});
module.exports = router;