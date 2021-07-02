const { readdirSync } = require("fs-extra");
const { join } = require("path");

module.exports = function (path = "../../packages") {
  return readdirSync(join(__dirname, path)).filter(
    (pkg) => pkg.charAt(0) !== "."
  );
};
