import { CognitoUserPool } from 'amazon-cognito-identity-js';
const poolData = {
  UserPoolId: "us-west-2_aO2YXuk5r",
  ClientId: "4cl002kn2etnps1mjeaurijgpt",
};
export default new CognitoUserPool(poolData);