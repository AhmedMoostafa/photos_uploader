import { ExpressHandler, SignInRequest, SignInResponse, SignUpRequest } from '../types/api';

class UserController {
  constructor() {}
  public signIn: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  };
  public signUp: ExpressHandler<SignUpRequest, SignInResponse> = async (req, res) => {
    return res.sendStatus(200);
  };
}
