/* eslint-disable @typescript-eslint/no-var-requires */

const { join } = require("path");
const { generate } = require("@genql/cli");
const { watch } = require("chokidar");
const fs = require("fs");
const output = join(__dirname, "genql");

const schemaFile = join(__dirname, "../api/src/graphql/schema.graphql");

let timeoutId;
const generateGenql = async () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    await generate({
      schema: fs.readFileSync(schemaFile).toString(),
      output,
      
    });
    console.log("- \u001b[35mevent\u001b[0m generated genql sdk");
  }, 1000);
};

generateGenql();

if (process.argv[2] === "--dev") {
  watch(schemaFile).on("change", async () => {
    await generateGenql();
  });
}
