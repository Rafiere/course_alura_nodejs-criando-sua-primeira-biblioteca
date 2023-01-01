import catchFile from "./index.js";
import fs from "fs";
import chalk from "chalk";
import validateLinkList from "./http-validation.js";

/* We are getting the parameters that were passed by argument when we run this file through node. */
const path = process.argv;

const printList = async (shouldValidateLinks, result, identifier = "") => {
  if (shouldValidateLinks) {
    console.log(
      chalk.yellow("Validated Link List"),
      chalk.black.bgGreen(identifier),
      await validateLinkList(result)
    );
  } else {
    console.log(
      chalk.yellow("Validated Link List"),
      chalk.black.bgGreen(identifier),
      result
    );
  }
};

const processText = async (args) => {
  const path = args[2];

  /* If the "--validate" option is passed, it will be assigned in the "validate" constant. */
  const validate = args[3] === "--validate";

  try {
    fs.lstatSync(path);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File or directory does not exist.");
      return;
    }
  }

  if (fs.lstatSync(path).isFile()) {
    const result = await catchFile(args[2]);
    printList(validate, result);
  } else if (fs.lstatSync(path).isDirectory()) {
    const files = await fs.promises.readdir(path);
    files.forEach(async (fileName) => {
      const list = await catchFile(`${path}/${fileName}`);
      printList(validate, list, fileName);
    });
  }
};

processText(path);
