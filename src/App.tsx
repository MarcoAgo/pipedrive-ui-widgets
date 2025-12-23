import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import AppExtensionsSDK from "@pipedrive/app-extensions-sdk";

function App() {
  const [count, setCount] = useState(0);

  async function initPipedrive() {
    // If your URL already includes ?id=..., SDK finds it automatically
    const sdk = await new AppExtensionsSDK().initialize({
      size: {
        width: 500,
        height: 700,
      },
    });

    // Now you can use SDK features (e.g., send commands, resize, show snackbar)
    console.log("Pipedrive SDK ready!", sdk);
  }

  useEffect(() => {
    initPipedrive();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
