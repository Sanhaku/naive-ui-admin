/**
 * No token detected or token expired.
 */
class NotLoginError extends Error {
  code = 403;
}

/**
 * Wrong password or wrong account.
 */
class NotAuthedError extends Error {
  code = 401;
}

/**
 * Internal server error, like database error.
 */
class InternalServerError extends Error {
  code = 500;
  msg = "";
}

/**
 * Bad form param format.
 */
class FormParamError extends Error {
  code = 400;
  msg = "";
}

/**
 * The given email already exists when register.
 */
class EmailExistsError extends Error {
  code = 406;
}

export {
  NotAuthedError,
  NotLoginError,
  InternalServerError,
  FormParamError,
  EmailExistsError,
};