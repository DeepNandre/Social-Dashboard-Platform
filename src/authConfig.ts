import { Configuration, LogLevel } from "@azure/msal-browser";

// MSAL configuration
export const msalConfig: Configuration = {
  auth: {
    clientId: "YOUR_CLIENT_ID", // Replace with your Azure AD client ID
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID", // Replace with your tenant ID
    redirectUri: window.location.origin, // Dynamic redirect URI
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
      logLevel: LogLevel.Warning,
    },
  },
};

// Login request object - fixed the missing closing brace
export const loginRequest = {
  scopes: ["User.Read"]
};

// Graph API endpoint for user info
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
}; 