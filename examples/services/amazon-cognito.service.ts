// global['fetch'] = require('node-fetch');
// import {
//   AuthenticationDetails, CognitoAccessToken, CognitoIdToken,
//   CognitoRefreshToken,
//   CognitoUser,
//   CognitoUserAttribute,
//   CognitoUserPool,
//   CognitoUserSession,
//   ICognitoUserPoolData,
//   ISignUpResult,
// } from 'amazon-cognito-identity-js';
//
// import { log } from '@helper/logger';
// import { SignInUser, User } from '@models/DynamoDB/User';
//
// export interface AuthTokens {
//   idToken: string;
//   accessToken: string;
//   refreshToken: string;
// }
//
//
// export class AmazonCognitoService {
//
//   private cognitoUserPool: CognitoUserPool;
//
//   constructor(poolData: ICognitoUserPoolData) {
//     this.cognitoUserPool = new CognitoUserPool(poolData);
//   }
//
//   public signUp(user: User): Promise<ISignUpResult> {
//     const emailAttribute = {
//       Name: 'email',
//       Value: user.email,
//     };
//
//     const userAttributes: CognitoUserAttribute[] = [
//       new CognitoUserAttribute(emailAttribute),
//     ];
//
//     return new Promise((resolve, reject) => {
//       this.cognitoUserPool.signUp(user.email, user.password, userAttributes, [], (err, result) => {
//         if (err) {
//           log(err);
//           reject(err);
//         }
//         resolve(result);
//       });
//     });
//   }
//
//   public signIn(user: SignInUser): Promise<AuthTokens> {
//     const cognitoUser = new CognitoUser({
//       Username: user.email,
//       Pool: this.cognitoUserPool,
//     });
//     const authenticationDetails = new AuthenticationDetails({
//       Username: user.email,
//       Password: user.password,
//     });
//     return new Promise((resolve, reject) => {
//       cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: (session: CognitoUserSession) => {
//           resolve({
//             idToken: session.getIdToken().getJwtToken(),
//             accessToken: session.getAccessToken().getJwtToken(),
//             refreshToken: session.getRefreshToken().getToken(),
//           });
//         },
//         onFailure: (err) => {
//           log(err);
//           reject(err);
//         },
//       });
//     });
//   }
//
//   public refresh(id: string, refreshToken: string): Promise<AuthTokens> {
//     const user = new CognitoUser({
//       Username: id,
//       Pool: this.cognitoUserPool,
//     });
//
//     return new Promise((resolve, reject) => {
//       user.refreshSession(new CognitoRefreshToken({
//         RefreshToken: refreshToken,
//       }), (err, session: CognitoUserSession) => {
//         if (err) {
//           log(err);
//           reject(err);
//         }
//         resolve({
//           idToken: session.getIdToken().getJwtToken(),
//           accessToken: session.getAccessToken().getJwtToken(),
//           refreshToken: session.getRefreshToken().getToken(),
//         });
//       });
//     });
//   }
//
//   public changePassword(id: string, oldPassword: string, newPassword: string, idToken: string,
//   refreshToken: string, accessToken: string): Promise<void> {
//     const user = new CognitoUser({
//       Username: id,
//       Pool: this.cognitoUserPool,
//     });
//
//     user.setSignInUserSession(new CognitoUserSession({
//       IdToken: new CognitoIdToken({ IdToken: idToken }),
//       AccessToken: new CognitoAccessToken({ AccessToken: accessToken }),
//       RefreshToken: new CognitoRefreshToken({ RefreshToken: refreshToken })
//     }));
//     return new Promise<void>((resolve, reject) =>
//       user.changePassword(oldPassword, newPassword, (err) => {
//         if (err) {
//           log(err);
//           reject(err);
//         }
//         resolve();
//       }),
//     );
//   }
// }
