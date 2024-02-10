import { Datastore } from '../datastore/datastore';
import {
  ExpressHandler,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '../types/api';
import crypto from 'crypto';
import { signJwt } from '../utils/auth';
import { ERRORS } from '../utils/errorMessages';

export class UserController {
  private _datastore: Datastore;
  constructor(datastore: Datastore) {
    this._datastore = datastore;
  }
  public signIn: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: ERRORS.USER_REQUIRED_FIELDS });
    }
    const passwordHash = this.hashPassword(password);

    const user = await this._datastore.getUserByEmail(email);
    if (user?.password !== passwordHash) {
      return res.status(403).send({ error: ERRORS.BAD_EMAIL_OR_PASWWORD });
    }
    const jwt = signJwt({ userId: user.id });

    res.status(200).send({
      user: {
        ...user,
      },
      jwt,
    });
  };
  public signUp: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    const { email, firstName, password } = req.body;
    if (!email || !firstName || !password) {
      return res.status(400).send({ error: 'Missing Fileds' });
    }
    if (await this._datastore.getUserByEmail(email)) {
      return res.status(403).send({ error: ERRORS.DUPLICATE_EMAIL });
    }
    const passwordHash = this.hashPassword(password);
    const user = {
      id: crypto.randomUUID(),
      email,
      firstName,
      password: passwordHash,
    };
    const jwt = signJwt({ userId: user.id });
    await this._datastore.createUser(user);
    res.status(200).send({ jwt });
  };
  private hashPassword(password: string): string {
    if (process.env.PASSWORD_SALT) {
      return crypto
        .pbkdf2Sync(password, process.env.PASSWORD_SALT, 42, 64, 'sha512')
        .toString('hex');
    }
    process.exit(1);
  }
}
