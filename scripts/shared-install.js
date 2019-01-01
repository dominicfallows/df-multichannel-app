#!/usr/bin/env node
const execSync = require("child_process").execSync;
const colors = require("colors");

try {
  const originalPath = process.cwd();
  process.chdir("./packages/shared");

  /**
   * Install dependencies
   */
  console.log(
    colors.yellow(
      "Installing dependencies for @df/multichannel-app-shared"
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
      "Resetting previous global linked package for @df/multichannel-app-shared"
    )
  );
  execSync(
    `manage-linked-packages -m yarn -a reset -n @df/multichannel-app-shared`,
    { stdio: "inherit" }
  );

  /**
   * Creating new global linked package
   */
  console.log(
    colors.yellow(
      "Creating new global linked package for @df/multichannel-app-shared"
    )
  );
  execSync(`yarn link`, { stdio: "inherit" });

  process.exit(0);
  
} catch (err) {
  console.log(colors.red() + err);
  process.exit(1);
}
