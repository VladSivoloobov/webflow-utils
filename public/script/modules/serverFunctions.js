import auth from './extensions/auth.js';

export default function serverFunctions(action) {
  const functions = {
    'general-auth': auth,
  };

  if (!functions[action]) {
    console.error('Функции не существует', action);
  }

  return functions[action];
}
