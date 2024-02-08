export enum ERRORS {
  TOKEN_EXPIRED = 'Token expired',
  BAD_TOKEN = 'Bad token',

  USER_NOT_FOUND = 'User not found',
  USER_REQUIRED_FIELDS = 'Email, and password are required',
  BAD_EMAIL_OR_PASWWORD = 'Invalid Email or paswword',

  DUPLICATE_EMAIL = 'An account with this email already exists',
  MISSING_PHOTO_ID = 'Photo id is required',
  BAD_PHOTO_ID = 'Bad ID ',
  PHOTO_REQUIRED_FIELDS = 'Description, and title are required',

  USER_UNAUTHORIZED = ' Unauthorized User',
}
