#!/usr/bin/env node
const execSync = require("child_process").execSync;
const colors = require("colors");

try {
  const originalPath = process.cwd();
  process.chdir("./packages/web");

  /**
   * Install dependencies
   */
  console.log(
    colors.yellow("Installing dependencies for @df/multichannel-app-web")
  );
  execSync(`yarn install`, { stdio: "inherit" });

  /**
   * Installing local package @df/multichannel-app-shared
   */
  console.log(
    colors.yellow("Installing local package @df/multichannel-app-shared")
  );
  execSync(`yarn link @df/multichannel-app-shared`, { stdio: "inherit" });

  process.exit(0);
} catch (err) {
  console.log(colors.red() + err);
  process.exit(1);
}
