import displayLogo from "./display-logo.js";
import { pushQuestions } from "./push-questions.js";
import chalk from "chalk";

export const clearLastLine = () => {
  process.stdout.moveCursor(0, -1);
  process.stdout.clearLine(1);
};

export const displayLogoAndDisplayQuestions = async (
  logo,
  message,
  errorMessage
) => {
  displayLogo(logo);

  const pages = await pushQuestions(message, errorMessage);

  if (pages["page-count"].trim() === "*") return "*";

  return pages["page-count"].split(",").map((page) => page.trim());
};

export const tryingCliMessage = (text, progress, boldText) => {
  console.log(
    chalk.blue(chalk.bold(`${progress}% -`)),
    chalk.yellow(text, chalk.bold(boldText), "⏳")
  );
};

export const successCliMessage = (text, progress, boldText) => {
  clearLastLine();
  console.log(
    chalk.blue(chalk.bold(`${progress}% -`)),
    chalk.green(text, chalk.bold(boldText), "🎉")
  );
};

export const errorCliMessage = (text, progress, boldText) => {
  clearLastLine();
  console.log(
    chalk.blue(chalk.bold(`${progress}% -`)),
    chalk.red(text, chalk.bold(boldText), "🚫")
  );
};
