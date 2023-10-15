import bcrypt from 'bcryptjs';
import userModel from '../models/user.model';
import signJwtToken from '../utils/signJwtToken';
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

  async login(userLoginData: IUserLogin) {
    try {
      const userExists = await this.model.findOne({ email: userLoginData.email });
      if (!userExists) return null;

      const isValidPassword = await bcrypt.compare(userLoginData.password, userExists.password);
      if (!isValidPassword) return false;

      const token = signJwtToken({ _id: userExists._id, email: userExists.email });
      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
