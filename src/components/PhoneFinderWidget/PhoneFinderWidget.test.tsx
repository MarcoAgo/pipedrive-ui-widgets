import {
  render,
  screen,
  cleanup,
  fireEvent,
  act,
} from '@testing-library/react';
import { afterEach } from 'vitest';
import { PhoneFinderWidget } from './PhoneFinderWidget';
import { phoneFinderStore } from '../../store/phone-finder/phone-finder.store';

const ENTITY_ID = 'person-123';

afterEach(() => {
  cleanup();
  phoneFinderStore.getState().reset();
});

test('PhoneFinderWidget should render the title', () => {
  render(<PhoneFinderWidget entityId={ENTITY_ID} onSearch={vi.fn()} />);
  expect(screen.getByText('Trova numero')).toBeInTheDocument();
});

test('PhoneFinderWidget should show empty state text on first render', () => {
  render(<PhoneFinderWidget entityId={ENTITY_ID} onSearch={vi.fn()} />);
  expect(screen.getByText(/nessun numero ancora cercato/i)).toBeInTheDocument();
});

test('PhoneFinderWidget should show the search button on idle state', () => {
  render(<PhoneFinderWidget entityId={ENTITY_ID} onSearch={vi.fn()} />);
  expect(
    screen.getByRole('button', { name: /cerca un numero/i }),
  ).toBeInTheDocument();
});

test('PhoneFinderWidget should show pending card when provider results arrive', () => {
  render(<PhoneFinderWidget entityId={ENTITY_ID} onSearch={vi.fn()} />);
  act(() => {
    phoneFinderStore
      .getState()
      .setProviderResults({ testProvider: ['+39 348 712 0099'] });
  });
  expect(screen.getByText('+39 348 712 0099')).toBeInTheDocument();
});

test('PhoneFinderWidget should show saved card when initialData has confirmedNumber', () => {
  render(
    <PhoneFinderWidget
      entityId={ENTITY_ID}
      onSearch={vi.fn()}
      initialData={{ confirmedNumber: '+39 02 0000 1234' }}
    />,
  );
  expect(screen.getByText('+39 02 0000 1234')).toBeInTheDocument();
  expect(screen.getByText(/salvato sul contatto/i)).toBeInTheDocument();
});

test('PhoneFinderWidget should hide body when collapsed', () => {
  render(<PhoneFinderWidget entityId={ENTITY_ID} onSearch={vi.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: /comprimi/i }));
  expect(screen.queryByText(/nessun numero/i)).not.toBeInTheDocument();
});

test('PhoneFinderWidget should skip duplicate numbers across providers', () => {
  render(<PhoneFinderWidget entityId={ENTITY_ID} onSearch={vi.fn()} />);
  act(() => {
    phoneFinderStore.getState().setProviderResults({
      providerA: ['+39 348 000 0001'],
      providerB: ['+39 348 000 0001', '+39 348 000 0002'],
    });
  });
  // First number shown
  expect(screen.getByText('+39 348 000 0001')).toBeInTheDocument();
  // Discard it
  act(() => {
    phoneFinderStore.getState().discardNumber();
  });
  // providerB's duplicate is skipped, shows next unique number
  expect(screen.getByText('+39 348 000 0002')).toBeInTheDocument();
});

test('PhoneFinderWidget should show error when all numbers exhausted', () => {
  render(<PhoneFinderWidget entityId={ENTITY_ID} onSearch={vi.fn()} />);
  act(() => {
    phoneFinderStore
      .getState()
      .setProviderResults({ providerA: ['+39 348 000 0001'] });
  });
  act(() => {
    phoneFinderStore.getState().discardNumber();
  });
  expect(
    screen.getByText(/nessun altro numero disponibile/i),
  ).toBeInTheDocument();
});
