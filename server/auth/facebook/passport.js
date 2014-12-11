var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var https = require('https');

exports.setup = function (User, config) {
  // console.log('FB_User', User);
  // console.log('FB_config', config);
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    },

    function(accessToken, refreshToken, profile, done) {

      https.get("https://graph.facebook.com/me/friends?limit=10&access_token="+ accessToken + '&suppress_response_codes=true', function(res) {
        res.on('data', function(d) {
          process.stdout.write(d);
        });
      }).on('error', function(e) {
        console.log("Got error: " + e.message);
      });

      User.findOne({
        'facebook.id': profile.id,
      },
      function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.username,
            provider: 'facebook',
            facebook: profile._json,
            profilePic: 'https://graph.facebook.com/' + profile._json.id + '/picture?width=300'
          });
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      })
    }
  ));
};