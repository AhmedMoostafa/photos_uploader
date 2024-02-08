import { Datastore } from '../datastore/datastore';
import {
  ExpressHandler,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '../types/api';
import crypto from 'crypto';

export class UserController {
  private datastore: Datastore;
  constructor(datastore: Datastore) {
    this.datastore = datastore;
  }
  public signIn: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }
    const user = await this.datastore.getUserByEmail(email);
    if (user?.password !== password) {
      return res.sendStatus(403);
    }
    res.status(200).send({
      user: {
        ...user,
      },
      jwt: 'aaaaaaaaaaa',
    });
  };
  public signUp: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    const { email, firstName, password } = req.body;
    if (!email || !firstName || !password) {
      return res.status(400).send({ error: 'Missing Fileds' });
    }
    const user = {
      id: crypto.randomUUID(),
      email,
      firstName,
      password,
    };
    await this.datastore.createUser(user);
    res.status(200).send({ jwt: 'aaaaaaaaaa' });
  };
}
