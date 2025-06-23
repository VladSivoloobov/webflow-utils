import chalk from 'chalk';
import inquirer from 'inquirer';

export const pushQuestions = (message, errorMessage) => {
  const questions = [
    {
      name: 'utils-question',
      type: 'input',
      message: message,
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return errorMessage;
        }
      },
    },
  ];

  return inquirer.prompt(questions);
};
