import userModel from '../models/user.model';
import { IUser, IUserLogin } from '../validators';

export default class AuthService {
  private model;

  constructor() {
    this.model = userModel;
  }

  async register(user: IUser) {
    try {
      const createdUser = await this.model.create(user);
      return createdUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  login(userLoginData: IUserLogin) {}
}
