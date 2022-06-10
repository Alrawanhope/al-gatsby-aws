import { Amplify, Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import awsmobile from "../aws-exports";

import { listFinalCodes, paginationFinalCodes } from "../graphql/queries";
import { createFinalCode, deleteFinalCode } from "../graphql/mutations";
import AWSAppSyncClient from "aws-appsync";
import gql from "graphql-tag";

function executeAwsSetup() {
  let client;

  function configAmplify() {
    console.log("CONFIG configAmplify");
    Amplify.configure(awsmobile);
  }

  function configAppSync() {
    console.log("CONFIG configAppSync");
    client = new AWSAppSyncClient({
      url: awsmobile.aws_appsync_graphqlEndpoint,
      region: awsmobile.aws_appsync_region,
      auth: {
        type: awsmobile.aws_appsync_authenticationType,
        apiKey: awsmobile.aws_appsync_apiKey,
      },
      disableOffline: true,
    });
  }

  function listFinalCodeViaAmplifyGQLClient() {
    return API.graphql(graphqlOperation(listFinalCodes));
  }

  function listFinalCodesAppSyncSDK() {
    return client.query({
      query: gql(listFinalCodes),
    });
  }

  function paginationFinalCodesViaAmplifyGQLClient(limit,nextToken){
    return API.graphql(graphqlOperation(paginationFinalCodes,{limit,nextToken}))
  }

  function paginationFinalCodesAppSyncSDK(limit,nextToken){
    return client.query({
      query:gql(paginationFinalCodes),
      variables:{limit,nextToken}
    })
  }

  function createFinalCodeViaAmplifyGQLClient(input) {
    return API.graphql(graphqlOperation(createFinalCode, { input }));
  }

  function createFinalCodeAppSyncSDK(input) {
    return client.mutate({
      mutation: gql(createFinalCode),
      variables: { input },
    });
  }

  function deleteFinalCodeViaAmplifyGQLClient(id) {
    return API.graphql(graphqlOperation(deleteFinalCode, { input: { id } }));
  }

  function deleteFinalCodeAppSyncSDK(id) {
    return client.mutate({
      mutation: gql(deleteFinalCode),
      variables: { input: { id } },
    });
  }

  function signUp({ username, password, email }) {
    console.log("USER,PASS", username, password, email);
    return Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    });
  }

  function confirmSignUp({ username, code }) {
    console.log("USER,code", username, code);
    return Auth.confirmSignUp(username, code);
  }

  function resendSignUp({ username }) {
    console.log("USER", username);
    return Auth.resendSignUp(username);
  }

  function signOut() {
    console.log("signOut");
    return Auth.signOut();
  }

  function signIn({ username, password }) {
    console.log("USER password", username, password);
    return Auth.signIn(username, password);
  }

  function isUserAuthenticated() {
    return Auth.currentAuthenticatedUser();
  }

  function getCurrentUser() {
    return Auth.currentUserPoolUser();
  }


  return {
    awsRawan: {
      configAmplify,
      configAppSync,

      listFinalCodeViaAmplifyGQLClient,
      listFinalCodesAppSyncSDK,

      paginationFinalCodesViaAmplifyGQLClient,
      paginationFinalCodesAppSyncSDK,

      createFinalCodeViaAmplifyGQLClient,
      createFinalCodeAppSyncSDK,

      deleteFinalCodeViaAmplifyGQLClient,
      deleteFinalCodeAppSyncSDK,


      signUp,
      confirmSignUp,
      resendSignUp,
      signOut,
      signIn,
      isUserAuthenticated,
      getCurrentUser,
    },
  };
}

export default executeAwsSetup;
