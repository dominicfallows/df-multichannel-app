#!/usr/bin/env node
const colors = require("colors");
const { homedir } = require("os");
const { join } = require("path");
const { existsSync, readFileSync } = require("fs");

exports.sourceLocalEnvVars = function() {
  try {
    console.log(colors.yellow("Sourcing local environment variables"));

    if (!["linux", "darwin"].includes(process.platform)) {
      console.log(
        `Currently, we only support sourcing local environment variables on Mac ("darwin") or Linux ("linux"), your system is reported as "${process.platform}"`
      );
      return "";
    }

    const packageJson = require("../../package.json");
    const packageNameToPathParts = String(packageJson.name).split("/");
    const packageLocalEnvFile = join(
      homedir(),
      ".env_files",
      ...packageNameToPathParts,
      ".env"
    );
    
    if (!existsSync(packageLocalEnvFile)) {
      console.log(
        `No local .env file found at "${packageLocalEnvFile}"`
      );
      return "";
    }

    console.log(`Sourcing environment variables from "${packageLocalEnvFile}"`); 
    const envVars = readFileSync(packageLocalEnvFile).toString().split("\n");
    
    return envVars.join(" ");

  } catch (err) {
    console.log(colors.red() + err);
    throw new Error("Error sourcing local environment variables");
  }
}
