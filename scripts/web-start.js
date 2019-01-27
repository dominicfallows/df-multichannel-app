#!/usr/bin/env node
const execSync = require("child_process").execSync;
const colors = require("colors");

const { sourceLocalEnvVars } = require("./shared/source-local-env-vars.js");

console.log(colors.cyan("Starting web packages"));

try {
  const localEnvVarsStr = sourceLocalEnvVars();
  const startCommand = `${localEnvVarsStr} yarn --cwd packages/web start`;
  execSync(startCommand, { stdio: "inherit" });

  process.exit(0);
} catch (err) {
  console.log(colors.red() + err);
  process.exit(1);
}