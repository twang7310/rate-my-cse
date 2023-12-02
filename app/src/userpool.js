import {CognitoUserPool} from 'amazon-cognito-identity-js';

let poolData = null;
let cognitoUserPool = null;

const fetchUserPoolData = async () => {
  try {
    const response = await fetch('/api/userpoolData');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    poolData = {
      UserPoolId: data.user_pool,
      ClientId: data.client_id,
    };

    cognitoUserPool = new CognitoUserPool(poolData);
    return cognitoUserPool;
  } catch (error) {
    console.error('There was a problem fetching the environment keys:', error);
    throw error;
  }
};

// Export an asynchronous function that fetches the data and resolves with getCognitoUserPool
export const getCognitoUserPoolAsync = async () => {
  if (!cognitoUserPool) {
    try {
      await fetchUserPoolData();
    } catch (error) {
      throw error;
    }
  }
  return cognitoUserPool;
};
