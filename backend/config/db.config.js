// If using mongodb secret string

// const dbuser = process.env.DB_USER || '';
// const dbsecret = process.env.DB_SECRET || '';
// const dbname = process.env.DB_NAME || '';
// const dbserver = process.env.DB_SERVER || '';
// const dbprotocol = process.env.DB_PROTOCOL || '';

// module.exports = {
//   url: `${dbprotocol}://${dbuser}:${encodeURIComponent(
//     dbsecret
//   )}@${dbserver}/${dbname}?authSource=admin`,
// };

// If using local mongo

const dbname = "jwtauth-testing";

module.exports = {
  url: `mongodb://localhost/${dbname}`,
};
