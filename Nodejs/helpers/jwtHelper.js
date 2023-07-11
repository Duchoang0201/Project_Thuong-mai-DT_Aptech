const JWT = require("jsonwebtoken");

const jwtSettings = require("../constants/jwtSetting");

///Version cu
// const encodeToken = (userId, email, firstName, lastName) => {
//   return JWT.sign(
//     {
//       iat: new Date().getTime(),
//       exp: new Date().setDate(new Date().getDate() + 1),
//       audience: jwtSettings.AUDIENCE,
//       issuer: jwtSettings.ISSUER,
//       _id: userId,
//       email: email,
//       // fullName: firstName + '-' + lastName,
//       fullName: `${firstName} - ${lastName}`,
//       algorithm: "HS512", // default có thể không có
//     },
//     jwtSettings.SECRET
//   );
// };

//New
//ACCESS-TOKEN
const encodeToken = (userId, firstName, lastName) => {
  const token = JWT.sign(
    {
      fullName: `${firstName} - ${lastName}`,
    },
    jwtSettings.SECRET,
    {
      expiresIn: "2h",
      audience: jwtSettings.AUDIENCE,
      issuer: jwtSettings.ISSUER,
      subject: userId,
      algorithm: "HS512",
    }
  );

  return token;
};

const encodeRefreshToken = (userId, firstName, lastName) => {
  const token = JWT.sign(
    {
      id: userId,
      fullName: `${firstName} - ${lastName}`,
    },
    process.env.REFRESH_ACCESS_TOKEN,
    {
      expiresIn: "5d",
      audience: jwtSettings.AUDIENCE,
      issuer: jwtSettings.ISSUER,
      subject: userId,
      algorithm: "HS512",
    }
  );

  return token;
};
module.exports = { encodeToken, encodeRefreshToken };
