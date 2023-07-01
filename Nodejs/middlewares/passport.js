// const JwtStrategy = require("passport-jwt").Strategy;
// const LocalStrategy = require("passport-local").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const { findDocument, findDocuments } = require("../helpers/MongoDbHelper");
// const jwtSettings = require("../constants/jwtSetting");
// const { Employee, Customer } = require("../models");
// const BasicStrategy = require("passport-http").BasicStrategy;

// const passportConfig = new JwtStrategy(
//   {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
//     secretOrKey: jwtSettings.SECRET,
//   },
//   async (payload, done) => {
//     try {
//       const user = await Employee.findById(payload._id);

//       if (!user) return done(null, false);

//       return done(null, user);
//     } catch (error) {
//       done(error, false);
//     }
//   }
// );

// const passportConfigLocal = new LocalStrategy(
//   {
//     usernameField: "email",
//   },
//   async (email, password, done) => {
//     try {
//       const user = await Employee.findOne({ email });

//       if (!user) return done(null, false, { message: "User not found" });

//       const isCorrectPass = await user.isValidPass(password);

//       if (!isCorrectPass)
//         return done(null, false, { message: "Invalid password" });

//       return done(null, user);
//     } catch (error) {
//       return done(null, false, { message: error.message });
//     }
//   }
// );

// module.exports = {
//   passportConfig,
//   passportConfigLocal,
// };

const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { findDocument, findDocuments } = require("../helpers/MongoDbHelper");
const jwtSettings = require("../constants/jwtSetting");
const { Employee, Customer } = require("../models");
const BasicStrategy = require("passport-http").BasicStrategy;

const passportConfig = (model) => {
  return new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: jwtSettings.SECRET,
    },
    async (payload, done) => {
      try {
        const user = await model.findById(payload._id);

        if (!user) return done(null, false);

        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  );
};

const passportConfigLocal = (model) => {
  return new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await model.findOne({ email });

        if (!user) return done(null, false, { message: "User not found" });

        const isCorrectPass = await user.isValidPass(password);

        if (!isCorrectPass)
          return done(null, false, { message: "Invalid password" });

        return done(null, user);
      } catch (error) {
        return done(null, false, { message: error.message });
      }
    }
  );
};

module.exports = {
  passportConfig,
  passportConfigLocal,
};
