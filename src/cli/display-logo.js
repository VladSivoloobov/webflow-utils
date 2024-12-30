import chalk from "chalk";
import figlet from "figlet";
import clear from "clear";

export default function displayLogo(text) {
  clear();
  console.log(
    chalk.yellow(
      figlet.textSync(text, {
        width: 70,
      })
    )
  );
}
