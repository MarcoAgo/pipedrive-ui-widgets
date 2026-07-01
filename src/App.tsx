import { useEffect, type JSX } from 'react';
import AppExtensionsSDK, { Command } from '@pipedrive/app-extensions-sdk';
import { pipedriveStore } from './store/pipedrive/pipedrive.store';
import { usePipedrive } from './store/pipedrive/use-pipedrive';
import { getPipedriveContext } from './helpers/get-pipedrive-context';
import { fetchContextEntity } from './helpers/fetch-context-entity';
import {
  parsePipedrivePerson,
  type TPipedrivePersonRaw,
} from './helpers/parse-pipedrive-person';
import { callN8nPhoneSearch } from './helpers/call-n8n-phone-search';
import { phoneFinderStore } from './store/phone-finder/phone-finder.store';
import { PhoneFinderWidget } from './components/PhoneFinderWidget';
import './index.css';

async function handleSearch(): Promise<void> {
  const { setStatus, setError, setProviderResults } =
    phoneFinderStore.getState();
  const { person, context } = pipedriveStore.getState();
  if (!person || !context?.entityId) return;

  setError(null);
  setStatus('loading');
  try {
    const result = await callN8nPhoneSearch(person, context.entityId);
    // eslint-disable-next-line no-console
    console.log('[n8n phone search] response:', result);
    setProviderResults(result);
  } catch {
    setError('Ricerca non riuscita. Riprova.');
    setStatus('idle');
  }
}

function App(): JSX.Element {
  const context = usePipedrive(s => s.context);

  useEffect(() => {
    async function initPipedrive(): Promise<void> {
      const { setSdk, setToken, setContext, setPerson } =
        pipedriveStore.getState();

      const initializedSdk = await new AppExtensionsSDK().initialize({});
      setSdk(initializedSdk);

      const result = await initializedSdk.execute(Command.GET_SIGNED_TOKEN);
      const pipedriveContext = getPipedriveContext();
      setToken(result.token);
      setContext(pipedriveContext);

      const raw = await fetchContextEntity(pipedriveContext);
      setPerson(parsePipedrivePerson(raw as TPipedrivePersonRaw));
    }

    initPipedrive();
  }, []);

  if (!context?.entityId) {
    return <div className="app-loading" />;
  }

  return (
    <div className="app-container">
      <PhoneFinderWidget entityId={context.entityId} onSearch={handleSearch} />
    </div>
  );
}

export default App;
