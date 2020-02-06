export function errorHandler(error) {
  console.log(error);
  throw `[${error.statusCode || 400}] ${error.message || 'Bad request'}`;
}
