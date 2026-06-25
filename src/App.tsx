import { useEffect } from "react";
import "./App.css";

import AppExtensionsSDK, { Command } from "@pipedrive/app-extensions-sdk";
import { usePipedrive } from "./store/use-pipedrive";
import { getPipedriveContext } from "./helpers/get-pipedrive-context";
import { fetchContextEntity } from "./helpers/fetch-context-entity";

function App() {
  const { token, sdk, setSdk, setToken, setContext } = usePipedrive();

  async function initPipedrive() {
    const sdk = await new AppExtensionsSDK().initialize({
      size: {
        width: 500,
        height: 700,
      },
    });

    setSdk(sdk);
  }

  useEffect(() => {
    initPipedrive();
  }, []);

  useEffect(() => {
    // fai qualcosa con il token
    console.log(token);
  }, [token]);

  async function handleGetToken(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!sdk) {
      return;
    }

    const result = await sdk.execute(Command.GET_SIGNED_TOKEN);
    const pipedriveContext = getPipedriveContext();

    setToken(result.token);
    setContext(pipedriveContext);

    console.log(pipedriveContext.token);
    console.log(result);

    const entity = await fetchContextEntity(pipedriveContext);
    console.log(entity);
  }

  return (
    <div className="app-container">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to Reverse</h1>
        <p className="welcome-subtitle">Customized Pipedrive UI Widget</p>
      </div>
      <button type="button" className="login-button" onClick={handleGetToken}>
        Get Token
      </button>
    </div>
  );
}

export default App;
