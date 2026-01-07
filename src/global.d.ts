import type AppExtensionsSDK from "@pipedrive/app-extensions-sdk";

declare global {
  interface Window {
    pipedriveUI?: AppExtensionsSDK;
  }
}

export {};


