import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { SearchPhoneButton } from './SearchPhoneButton';

afterEach(cleanup);

test('SearchPhoneButton should render Cerca un numero when not a retry', () => {
  render(
    <SearchPhoneButton
      onSearch={vi.fn()}
      remainingAttempts={3}
      isLoading={false}
      isRetry={false}
    />,
  );
  expect(
    screen.getByRole('button', { name: /cerca un numero/i }),
  ).toBeInTheDocument();
});

test('SearchPhoneButton should show remaining attempts when isRetry is true', () => {
  render(
    <SearchPhoneButton
      onSearch={vi.fn()}
      remainingAttempts={2}
      isLoading={false}
      isRetry={true}
    />,
  );
  expect(
    screen.getByRole('button', { name: /cerca ancora/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/2 tentativi rimasti/i)).toBeInTheDocument();
});

test('SearchPhoneButton should use singular form when 1 attempt remains', () => {
  render(
    <SearchPhoneButton
      onSearch={vi.fn()}
      remainingAttempts={1}
      isLoading={false}
      isRetry={true}
    />,
  );
  expect(screen.getByText(/1 tentativo rimasto/i)).toBeInTheDocument();
});

test('SearchPhoneButton should be disabled when isLoading is true', () => {
  render(
    <SearchPhoneButton
      onSearch={vi.fn()}
      remainingAttempts={3}
      isLoading={true}
      isRetry={false}
    />,
  );
  expect(screen.getByRole('button')).toBeDisabled();
});

test('SearchPhoneButton should be disabled when remainingAttempts is 0', () => {
  render(
    <SearchPhoneButton
      onSearch={vi.fn()}
      remainingAttempts={0}
      isLoading={false}
      isRetry={true}
    />,
  );
  expect(screen.getByRole('button')).toBeDisabled();
});

test('SearchPhoneButton should call onSearch when clicked', () => {
  const onSearch = vi.fn();
  render(
    <SearchPhoneButton
      onSearch={onSearch}
      remainingAttempts={3}
      isLoading={false}
      isRetry={false}
    />,
  );
  fireEvent.click(screen.getByRole('button'));
  expect(onSearch).toHaveBeenCalledTimes(1);
});
