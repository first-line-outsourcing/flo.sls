export function errorHandler(error) {
  throw `[${error.statusCode || 400}] ${error.message || 'Bad request'}`
}