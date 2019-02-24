#!/usr/bin/env node
const execSync = require("child_process").execSync;
const colors = require("colors");

const { sourceLocalEnvVars } = require("./shared/source-local-env-vars.js");

console.log(colors.cyan("Building web packages"));

try {
  const localEnvVarsStr = sourceLocalEnvVars();
  const buildCommand = `${localEnvVarsStr} yarn --cwd packages/web build`;
  execSync(buildCommand, { stdio: "inherit" });

  process.exit(0);
} catch (err) {
  console.log(colors.red() + err);
  process.exit(1);
}