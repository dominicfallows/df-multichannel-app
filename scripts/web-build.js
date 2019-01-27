#!/usr/bin/env node
const execSync = require("child_process").execSync;
const colors = require("colors");

const { sourceLocalEnvVars } = require("./shared/source-local-env-vars.js");

console.log(colors.cyan("Starting web packages"));

try {
  const localEnvVarsStr = sourceLocalEnvVars();
  const buildCommand = `${localEnvVarsStr} yarn --cwd packages/web build`;
  console.log(`Running command: ${buildCommand}`);
  execSync(buildCommand, { stdio: "inherit" });

  process.exit(0);
} catch (err) {
  console.log(colors.red() + err);
  process.exit(1);
}