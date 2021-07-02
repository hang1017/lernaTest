const { existsSync, writeFileSync } = require("fs-extra");
const { join } = require("path");
const getPackages = require("./utils/getPackages");

(async () => {
  const version = require("../lerna.json").version;

  // 读取 packages 文件夹下的包名称
  const pkgs = getPackages();

  pkgs.forEach((shortName) => {
    // 拼接 pkg 的路径
    const pkgJSONPath = join(
      __dirname,
      "..",
      "packages",
      shortName,
      "package.json"
    );

    const pkgJson = {
      name: `@dlijs/${shortName}`,
      version,
      main: "lib/index.js",
      types: "lib/index.d.ts",
      files: ["lib"],
      repository: {
        type: "git",
        url: "https://github.com/hang1017/lernaTest.git",
      },
      keywords: ["umi", "alita"],
      authors: [],
      license: "MIT",
      publishConfig: {
        access: "public",
      },
    };

    // 是否存在 pkg 的路径
    const pkgJSONExists = existsSync(pkgJSONPath);

    if (pkgJSONExists) {
      const pkg = require(pkgJSONPath);
      [
        "dependencies",
        "devDependencies",
        "peerDependencies",
        "bin",
        "files",
        "authors",
        "types",
        "sideEffects",
        "main",
        "module",
      ].forEach((key) => {
        if (pkg[key]) pkgJson[key] = pkg[key];
      });
    }
    writeFileSync(pkgJSONPath, `${JSON.stringify(pkgJson, null, 2)}\n`);

    // 拼接 readme 的路径
    const readmePath = join(
      __dirname,
      "..",
      "packages",
      shortName,
      "README.md"
    );

    // 是否存在 pkg 的路径
    const readmeExists = existsSync(readmePath);
    if (!readmeExists) {
      writeFileSync(readmePath, `# ${shortName}\n`);
    }
  });
})();
