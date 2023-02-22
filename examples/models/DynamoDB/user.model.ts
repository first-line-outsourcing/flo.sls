import { getEnv, isStage } from '@helper/environment';
import { messages } from '@helper/helper';
import { dynamoose } from '@services/dynamoose';
import { Document } from 'dynamoose/dist/Document';

export interface UserSchema {
  id?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  paypal?: string;
  aboutMe?: string;
  companyName?: string;
  phoneNumber: string;
  distance?: number;
  city: string;
  linkedIn?: string;
  IMDb?: string;
  rating?: number;
  union?: boolean;
  photo?: string;
  termsOfServiceAccepted: boolean;
}

export class User extends Document implements UserSchema {
  public id?: string;
  public password?: string;
  public confirmPassword?: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public paypal?: string;
  public aboutMe?: string;
  public companyName?: string;
  public phoneNumber: string;
  public distance?: number;
  public city: string;
  public linkedIn?: string;
  public IMDb?: string;
  public rating?: number;
  public union?: boolean;
  public photo?: string;
  public termsOfServiceAccepted: boolean;

  constructor(user: UserSchema) {
    super(UserModel);

    if (user.password && user.confirmPassword && user.password !== user.confirmPassword) {
      throw {
        message: messages.error.forbiddenPasswords,
      };
    }
    this.password = user.password;
    this.confirmPassword = user.confirmPassword;
    this.email = user.email || '';
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.paypal = user.paypal;
    this.aboutMe = user.aboutMe;
    this.companyName = user.companyName;
    this.phoneNumber = user.phoneNumber;
    this.distance = user.distance;
    this.city = user.city;
    this.linkedIn = user.linkedIn;
    this.IMDb = user.IMDb;
    this.rating = user.rating;
    this.union = user.union;
    this.photo = user.photo;
    this.termsOfServiceAccepted = user.termsOfServiceAccepted;
  }

  public static update(oldUser: User, newUser: User): User {
    const user: User = new User(oldUser);
    if (newUser.email !== undefined) {
      user.email = newUser.email;
    }
    if (newUser.firstName !== undefined) {
      user.firstName = newUser.firstName;
    }
    if (newUser.lastName !== undefined) {
      user.lastName = newUser.lastName;
    }
    if (newUser.paypal !== undefined) {
      user.paypal = newUser.paypal;
    }
    if (newUser.aboutMe !== undefined) {
      user.aboutMe = newUser.aboutMe;
    }
    if (newUser.companyName !== undefined) {
      user.companyName = newUser.companyName;
    }
    if (newUser.phoneNumber !== undefined) {
      user.phoneNumber = newUser.phoneNumber;
    }
    if (newUser.distance !== undefined) {
      user.distance = newUser.distance;
    }
    if (newUser.city !== undefined) {
      user.city = newUser.city;
    }
    if (newUser.linkedIn !== undefined) {
      user.linkedIn = newUser.linkedIn;
    }
    if (newUser.IMDb !== undefined) {
      user.IMDb = newUser.IMDb;
    }
    if (newUser.rating !== undefined) {
      user.rating = newUser.rating;
    }
    if (newUser.union !== undefined) {
      user.union = newUser.union;
    }
    if (newUser.photo !== undefined) {
      user.photo = newUser.photo;
    }
    if (newUser.termsOfServiceAccepted !== undefined) {
      user.termsOfServiceAccepted = newUser.termsOfServiceAccepted;
    }
    return user;
  }
}

export const userSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    email: {
      type: String,
    },
    paypal: {
      type: String,
    },
    aboutMe: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    companyName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    distance: {
      type: Number,
    },
    city: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    IMDb: {
      type: String,
    },
    rating: {
      type: Number,
    },
    union: {
      type: Boolean,
    },
    photo: {
      type: String,
    },
    termsOfServiceAccepted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = dynamoose.model<User>(getEnv('USERS_TABLE_NAME'), userSchema, {
  create: isStage('local'),
  update: false,
});
