import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';

const backend = defineBackend({
  auth,
  data,
});

const KnowledgeBaseDataSource =
  backend.data.resources.graphqlApi.addHttpDataSource(
    "KnowledgeBaseDataSource",
    `https://bedrock-runtime.us-east-1.amazonaws.com`,
    {
      authorizationConfig: {
        signingRegion: "us-east-1",
        signingServiceName: "bedrock",
      },
    },
  );

KnowledgeBaseDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [
      `arn:aws:bedrock:us-east-1:783413248379:knowledge-base/49XOADRBAW`
    ],
    actions: ["bedrock:Retrieve"],
  }),
);