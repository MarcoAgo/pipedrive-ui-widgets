import { useEffect } from "react";
import "./App.css";

import AppExtensionsSDK, { Command } from "@pipedrive/app-extensions-sdk";
import { usePipedrive } from "./store/use-pipedrive";

function App() {
  const { token, setToken, setSdk } = usePipedrive();

  async function initPipedrive() {
    // If your URL already includes ?id=..., SDK finds it automatically
    const sdk = await new AppExtensionsSDK().initialize({
      size: {
        width: 500,
        height: 700,
      },
    });

    const { token } = await sdk.execute(Command.GET_SIGNED_TOKEN);
    setToken(token);
    setSdk(sdk);
  }

  useEffect(() => {
    initPipedrive();
  }, []);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await fetch(
        "https://app.reverse.hr/api/v1/auth/users/login-tokens",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: (event.target as HTMLFormElement).email.value,
          }),
        }
      );

      const data = await response.json();

      console.log("Data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  console.log("Token:", token);

  return (
    <div className="app-container">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to Reverse</h1>
        <p className="welcome-subtitle">Customized Pipedrive UI Widget</p>
        <p className="welcome-description">
          To access Reverse data, please log in to your account.
        </p>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default App;
