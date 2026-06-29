import { useEffect, type JSX } from 'react';
import AppExtensionsSDK, { Command } from '@pipedrive/app-extensions-sdk';
import { usePipedrive } from './store/use-pipedrive';
import { getPipedriveContext } from './helpers/get-pipedrive-context';
import { fetchContextEntity } from './helpers/fetch-context-entity';
import { PhoneFinderWidget } from './components/PhoneFinderWidget';
import './index.css';

function App(): JSX.Element {
  const { setSdk, setToken, setContext, context } = usePipedrive();

  useEffect(() => {
    async function initPipedrive(): Promise<void> {
      const initializedSdk = await new AppExtensionsSDK().initialize({});
      setSdk(initializedSdk);

      const result = await initializedSdk.execute(Command.GET_SIGNED_TOKEN);
      const pipedriveContext = getPipedriveContext();
      setToken(result.token);
      setContext(pipedriveContext);

      await fetchContextEntity(pipedriveContext);
    }

    initPipedrive();
  }, []);

  if (!context?.entityId) {
    return <div className="app-loading" />;
  }

  return (
    <div className="app-container">
      <PhoneFinderWidget
        entityId={context.entityId}
        onSearch={() => {
          // TODO: trigger n8n workflow 1 → on response call:
          // phoneFinderStore.getState().setCurrentNumber(number)
          // phoneFinderStore.getState().setStatus('pending')
        }}
      />
    </div>
  );
}

export default App;
