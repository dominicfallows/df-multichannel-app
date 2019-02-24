#!/usr/bin/env node
const execSync = require("child_process").execSync;
const colors = require("colors");

console.log(colors.cyan("Serving web build"));

try {
  const serveCommand = `yarn --cwd packages/web serve -H 0.0.0.0`;
  execSync(serveCommand, { stdio: "inherit" });

  process.exit(0);
} catch (err) {
  console.log(colors.red() + err);
  process.exit(1);
}