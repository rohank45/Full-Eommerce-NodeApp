const passport = require("passport");
const googleOauthModel = require("../models/googleOauthModel");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  googleOauthModel.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_GOOGLE_ID,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET,
      callbackURL: process.env.OAUTH_GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, next) => {
      console.log("myProfile", profile);

      googleOauthModel.findOne({ email: profile._json.email }).then((user) => {
        if (user) {
          console.log("user alreday exits", user);
          next(null, user);
        } else {
          googleOauthModel
            .create({
              username: profile.username,
              name: profile.displayName,
              email: profile._json.email,
              googleId: profile.id,
              // photo: profile.photos,
            })
            .then((user) => {
              console.log("user registered successfully", user);
              next(null, user);
            })
            .catch((error) => {
              console.log(error);
            });
        }

        next(null, user);
      });
    }
  )
);
