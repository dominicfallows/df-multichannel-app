#!/usr/bin/env node
const colors = require("colors");
const execSync = require("child_process").execSync;
const fs = require("fs");

try {
  const originalPath = process.cwd();
  const packagesPath = `${originalPath}/packages`;
  const packages = fs.readdirSync(packagesPath);

  /**
   * Upgrade dependencies for root package
   */
  execSync(`ncu -u`, { stdio: "inherit" });
  execSync(`rm -rf yarn.lock`, { stdio: "inherit" });
  execSync(`yarn install`, { stdio: "inherit" });

  /**
   * Upgrade dependencies for each package
   */
  packages.forEach((package) => {
    const packagePath = `${packagesPath}/${package}`;

    // Skip if is a file
    const stat = fs.lstatSync(packagePath);
    if (stat.isFile()) {
      return;
    }

    // Change into directory
    process.chdir(packagePath);

    // Upgrade dependencies if we have a package.json
    const packageJsonPath = `${packagePath}/package.json`;
    if (!fs.existsSync(packageJsonPath)) {
      return;
    }

    const packageJson = require(packageJsonPath);

    console.log(colors.cyan(`Upgrading dependencies for ${packageJson.name}`));
    execSync(`ncu -u`, { stdio: "inherit" });
    execSync(`rm -rf yarn.lock`, { stdio: "inherit" });
    execSync(`yarn install`, { stdio: "inherit" });
  });

  process.exit(0);
} catch (err) {
  console.log(colors.red() + err);
  process.exit(1);
}
