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

test('SearchPhoneButton should show remaining attempts when isRetry and attempts > 0', () => {
  render(
    <SearchPhoneButton
      onSearch={vi.fn()}
      remainingAttempts={2}
      isLoading={false}
      isRetry={true}
    />,
  );
  expect(
    screen.getByRole('button', { name: /cerca ancora \(2 rimasti\)/i }),
  ).toBeInTheDocument();
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
  expect(screen.getByText(/1 rimasto/i)).toBeInTheDocument();
});

test('SearchPhoneButton should render Cerca di nuovo when isRetry and 0 attempts', () => {
  render(
    <SearchPhoneButton
      onSearch={vi.fn()}
      remainingAttempts={0}
      isLoading={false}
      isRetry={true}
    />,
  );
  expect(
    screen.getByRole('button', { name: /cerca di nuovo/i }),
  ).toBeInTheDocument();
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
