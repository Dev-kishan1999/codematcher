import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_bHETesATN",
  ClientId: "5t7ahia92dthhgtfq3t2nmoca4",
};

export default new CognitoUserPool(poolData);
