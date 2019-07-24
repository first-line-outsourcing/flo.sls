import { messages } from '@helper/helper';
import * as dynamoose from 'dynamoose';

export interface SignInUser {
  email: string;
  password: string;
}

export interface PasswordUser {
  oldPassword: string
  newPassword: string;
  confirmPassword: string;
  idToken: string;
  refreshToken: string;
}

export interface Location {
  lat: number;
  lon: number;
}

export interface SearchOptions {
  union?: boolean;
  city?: string;
  location?: Location;
  distance?: number;
  availability?: string[];
  rating?: number;
  saved?: string[];
  project: string[];
}

export interface PushNotification {
  registrationId?: string;
  registrationType?: 'FCM' | 'APNS';
  endpointArn: string;
}

export interface W9 {
  USCitizen: boolean;
  legalNameOfBusiness: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  federalTaxClassification: string;
  taxpayerIdentificationNumberType: 'SSN' | 'EIN';
  SSNorEIN: string;
  isCertified: boolean;
  status: 'pending' | 'verified' | 'invalid';
  updatedAt: number;
}

export interface UserBody {
  id?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  type: 'producer' | 'crew' | 'admin';
  paypal?: string;
  aboutMe?: string;
  companyName?: string;
  phoneNumber: string;
  location: Location;
  distance?: number;
  city: string;
  linkedIn?: string;
  IMDb?: string;
  rating?: number;
  union?: boolean;
  photo?: string;
  notifications?: {
    offerIsAvailable?: boolean;
    isPaid?: boolean;
    reminder?: boolean;
    offerIsAccepted?: boolean;
    offerIsDeclined?: boolean;
  };
  unavailability?: string[];
  saved?: string[];
  project?: ('commercial' | 'feature' | 'music_video')[];
  pushNotifications: PushNotification[];
  w9?: W9;
  termsOfServiceAccepted: boolean;
}

export class User implements UserBody {
  public id?: string;
  public password?: string;
  public confirmPassword?: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public type: 'producer' | 'crew' | 'admin';
  public paypal?: string;
  public aboutMe?: string;
  public companyName?: string;
  public phoneNumber: string;
  public location: Location;
  public distance?: number;
  public city: string;
  public linkedIn?: string;
  public IMDb?: string;
  public rating?: number;
  public union?: boolean;
  public photo?: string;
  public notifications?: {
    offerIsAvailable?: boolean;
    isPaid?: boolean;
    reminder?: boolean;
    offerIsAccepted?: boolean;
    offerIsDeclined?: boolean;
  };
  public unavailability?: string[];
  public saved?: string[];
  public project?: ('commercial' | 'feature' | 'music_video')[];
  public pushNotifications: PushNotification[];
  public w9?: W9;
  public termsOfServiceAccepted: boolean;

  constructor(user: UserBody) {
    if (user.password && user.confirmPassword && (user.password !== user.confirmPassword)) {
      throw {
        message: messages.error.forbiddenPasswords,
      };
    }
    this.password = user.password;
    this.confirmPassword = user.confirmPassword;
    this.email = user.email || '';
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.type = user.type;
    this.paypal = user.paypal;
    this.aboutMe = user.aboutMe;
    this.companyName = user.companyName;
    this.phoneNumber = user.phoneNumber;
    this.location = user.location;
    this.distance = user.distance;
    this.city = user.city;
    this.linkedIn = user.linkedIn;
    this.IMDb = user.IMDb;
    this.rating = user.rating;
    this.union = user.union;
    this.photo = user.photo;
    this.notifications = user.notifications;
    this.unavailability = user.unavailability;
    this.saved = user.saved;
    this.project = user.project;
    this.pushNotifications = user.pushNotifications;
    this.w9 = user.w9;
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
    if (newUser.type !== undefined) {
      user.type = newUser.type;
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
    if (newUser.location !== undefined) {
      user.location = newUser.location;
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
    if (newUser.notifications !== undefined) {
      user.notifications = newUser.notifications;
    }
    if (newUser.unavailability !== undefined) {
      user.unavailability = newUser.unavailability;
    }
    if (newUser.saved !== undefined) {
      user.saved = newUser.saved;
    }
    if (newUser.project !== undefined) {
      user.project = newUser.project;
    }
    if (newUser.pushNotifications !== undefined) {
      user.pushNotifications = newUser.pushNotifications;
    }
    if (newUser.w9 !== undefined) {
      user.w9 = newUser.w9;
    }
    if (newUser.termsOfServiceAccepted !== undefined) {
      user.termsOfServiceAccepted = newUser.termsOfServiceAccepted;
    }
    return user;
  }
}

export const UserSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  email: {
    type: String,
  },
  type: {
    type: String,
    enum: ['producer', 'crew' , 'admin'],
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
  location: {
    type: 'map',
    map: {
      lat: Number,
      lon: Number,
    },
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
  notifications: {
    type: 'map',
    map: {
      offerIsAvailable: Boolean,
      isPaid: Boolean,
      reminder: Boolean,
      offerIsAccepted: Boolean,
      offerIsDeclined: Boolean,
    },
    default: () => {
    },
  },
  unavailability: {
    type: 'list',
    list: [String],
    default: () => [],
  },
  saved: {
    type: 'list',
    list: [String],
    default: () => [],
  },
  project: {
    type: 'list',
    list: [String],
    default: () => [],
  },
  pushNotifications: {
    type: 'list',
    list: [{
      type: 'map',
      map: {
        registrationId: String,
        registrationType: String,
        endpointArn: String,
      },
    }],
    default: () => [],
  },
  w9: {
    type: 'map',
    map: {
      USCitizen: Boolean,
      legalNameOfBusiness: String,
      address: String,
      city: String,
      postalCode: String,
      country: String,
      federalTaxClassification: String,
      taxpayerIdentificationNumberType: String,
      SSNorEIN: String,
      isCertified: Boolean,
      status: String,
      updatedAt: Number,
    },
    default: () => {
    },
  },
  termsOfServiceAccepted: {
    type: Boolean,
  },
}, {
  useNativeBooleans: true,
  useDocumentTypes: true,
  timestamps: true,
});

export const UserModel = dynamoose.model<UserBody, string>(process.env.USERS_TABLE as string, UserSchema, {
  create: false,
  update: false,
});
