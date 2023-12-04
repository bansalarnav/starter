"use client";

import { ApolloSandbox } from "@apollo/sandbox/react";

export default function GQLPlayground() {
  return (
    <ApolloSandbox
      className="h-screen w-screen"
      initialEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/graphql`}
      endpointIsEditable={false}
      runTelemetry={false}
      initialState={{
        includeCookies: true,
        document:
          "query CurrentUser {\n\tcurrentUser {\n\t\tid\n\t\tname\n\t\temail\n\t\tavatar\n\t}\n}",
      }}
    />
  );
}
