import {AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';
import {getCognitoUserPoolAsync} from '../userpool'; // Import the async function

export const authenticate = async (Email, Password) => {
  try {
    const userPool = await getCognitoUserPoolAsync(); // Wait for the user pool to be initialized
    const user = new CognitoUser({
      Username: Email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: Email,
      Password,
    });

    return new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: result => {
          resolve(result);
        },
        onFailure: err => {
          reject(err);
        },
      });
    });
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const userPool = await getCognitoUserPoolAsync(); // Wait for the user pool to be initialized
    const user = userPool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
  } catch (error) {
    throw error;
  }
};