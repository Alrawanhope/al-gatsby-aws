import React from "react";
import executeAwsSetup from "./src/components/executeAWS";

const { awsRawan } = executeAwsSetup();
awsRawan.configAmplify()
awsRawan.configAppSync()



export const wrapPageElement = ({ element, props }) => {
  return React.cloneElement(element, {
    awsRawan: awsRawan,
  });
};
