# Convenzioni — pipedrive-ui-widgets

## Checks pre-commit

Prima di ogni commit eseguire `npm run check` (eslint + prettier + tsc in sequenza).
Il build deve rimanere pulito: `npm run build`.

---

## Struttura componenti

Atomic design. Ogni componente vive in una cartella dedicata:

```
ComponentName/
  ComponentName.tsx
  ComponentName.types.ts
  ComponentName.test.tsx
  component-name.scss
  index.ts
  _partials/       sotto-componenti interni
  _constants/      costanti locali del componente
```

---

## Naming

| Cosa | Convenzione | Esempio |
|---|---|---|
| Componenti | PascalCase | `PhoneFinderWidget` |
| Tipi / interfacce | prefisso `T` | `TPhoneFinderWidgetProps` |
| Hook | `use-` kebab | `use-phone-finder.ts` |
| File componente | PascalCase | `PhoneFinderWidget.tsx` |
| File utility / scss | kebab-case | `normalize-phone.ts` |
| Store file | `domain.store.ts` | `phone-finder.store.ts` |

---

## Export

- **Named export** per tutto: componenti, tipi, funzioni, store, selectors.
- **Default export** solo per `App.tsx` e `main.tsx`.

---

## Store Zustand

Ogni dominio ha la propria cartella in `src/store/`:

```
store/domain/
  domain.types.ts       interfacce e tipi del dominio
  domain.store.ts       create<...>() esportato come domainStore (non hook)
  domain.selectors.ts   funzioni selector tipizzate (s: Model) => T
  use-domain.ts         hook wrapper: domainStore(selector)
```

**Regola di accesso:**
- Accesso reattivo in componenti → `useDomain(selector)`
- Accesso fuori React (handler, `useEffect`, azioni) → `domainStore.getState()`
- Non usare `useDomain()` senza selector.

---

## Nessun codice funzionale nel JSX

Handler e logica async vanno estratti come funzioni named prima del `return`:

```tsx
// ✅
async function handleSearch(): Promise<void> { ... }
return <Button onClick={handleSearch} />;

// ❌
return <Button onClick={async () => { ... }} />;
```

---

## Costanti derivate nel JSX

Le condizioni composte nel template vanno estratte in costanti named prima del `return`:

```tsx
// ✅
const showEmptyState = !isPending && !isSaved && !hasDiscarded && !error;
return <>{showEmptyState && <p>...</p>}</>;

// ❌
return <>{!isPending && !isSaved && !hasDiscarded && !error && <p>...</p>}</>;
```

---

## console.log

Solo con `eslint-disable` esplicito sulla riga. Prefisso `[modulo]` per contesto:

```ts
// eslint-disable-next-line no-console
console.log('[phone-finder] confirmed:', data);
```

---

## Normalizzazione dati

Prima di qualsiasi confronto o deduplicazione normalizzare i valori.
Per i numeri di telefono usare `normalizePhone()` da `src/helpers/normalize-phone.ts`
(rimuove tutti gli spazi). Questo si applica anche al check dei duplicati cross-provider.

---

## Lingua

- Testi UI visibili all'utente → **italiano**
- Nomi di variabili, funzioni, tipi, commenti nel codice → **inglese**

---

## Test

- Un file per componente: `ComponentName.test.tsx` nella stessa cartella
- Reset dello store nel `afterEach`
- Usare `act()` per aggiornamenti di stato asincroni nei test
