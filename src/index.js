/* The "fs" library is native to Node and allows the programming language to interact with the computer's file system. */
import fs from "fs";
import chalk from "chalk";

const extractLinks = async (text) => {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const captures = [...text.matchAll(regex)];
  const results = captures.map((capture) => ({ [capture[1]]: capture[2] }));
  return results.length !== 0 ? results : "There are no links in the file.";
};

const handleError = (error) => {
  console.log(error);
  /* If an error occurs, this message will be sent. */

  throw new Error(chalk.red(erro.code, "There are no files in the directory."));
};

/* The keyword "await" says that the JS has to resolve the return, and, after that, send the data of this return to the variable "text", which would be the return of this promise, containing the text of the file. */

const catchFile = async (filePath) => {
  try {
    const encoding = "utf-8";
    const text = await fs.promises.readFile(filePath, encoding);
    return extractLinks(text);
  } catch (error) {
    handleError(error);
  }
};

export default catchFile;
