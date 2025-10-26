import { PublicClientApplication, Configuration } from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: "0f24bc75-bf99-466e-8030-d45e2743476a",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:5173", // mismo puerto donde corre el app
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
    