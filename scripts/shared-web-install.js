#!/usr/bin/env node
const execSync = require("child_process").execSync;
const colors = require("colors");

try {
  const originalPath = process.cwd();
  process.chdir("./packages/shared-web");

  /**
   * Install dependencies
   */
  console.log(
    colors.yellow(
      "Installing dependencies for @df/multichannel-app-shared-web"
    )
  );
  execSync(
    `yarn install`,
    { stdio: "inherit" }
  );

  /**
   * Resetting previous global linked package
   */
  console.log(
    colors.yellow(
      "Resetting previous global linked package for @df/multichannel-app-shared-web"
    )
  );
  execSync(
    `manage-linked-packages -m yarn -a reset -n @df/multichannel-app-shared-web`,
    { stdio: "inherit" }
  );

  /**
   * Creating new global linked package
   */
  console.log(
    colors.yellow(
      "Creating new global linked package for @df/multichannel-app-shared-web"
    )
  );
  execSync(`yarn link`, { stdio: "inherit" });

  /**
   * Installing linked local packages
   */
  console.log(
    colors.yellow("Installing linked local packages")
  );
  execSync(`yarn link @df/multichannel-app-shared`, { stdio: "inherit" });

  process.exit(0);
  
} catch (err) {
  console.log(colors.red() + err);
  process.exit(1);
}
