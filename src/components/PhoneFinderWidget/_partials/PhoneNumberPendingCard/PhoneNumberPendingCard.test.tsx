import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { PhoneNumberPendingCard } from './PhoneNumberPendingCard';

const PHONE_NUMBER = '+39 348 712 0099';

afterEach(cleanup);

test('PhoneNumberPendingCard should render the phone number', () => {
  render(
    <PhoneNumberPendingCard
      phoneNumber={PHONE_NUMBER}
      onSave={vi.fn()}
      onDiscard={vi.fn()}
    />,
  );
  expect(screen.getByText(PHONE_NUMBER)).toBeInTheDocument();
});

test('PhoneNumberPendingCard should render Salva and Scarta buttons', () => {
  render(
    <PhoneNumberPendingCard
      phoneNumber={PHONE_NUMBER}
      onSave={vi.fn()}
      onDiscard={vi.fn()}
    />,
  );
  expect(screen.getByRole('button', { name: /salva/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /scarta/i })).toBeInTheDocument();
});

test('PhoneNumberPendingCard should call onSave when Salva is clicked', () => {
  const onSave = vi.fn();
  render(
    <PhoneNumberPendingCard
      phoneNumber={PHONE_NUMBER}
      onSave={onSave}
      onDiscard={vi.fn()}
    />,
  );
  fireEvent.click(screen.getByRole('button', { name: /salva/i }));
  expect(onSave).toHaveBeenCalledTimes(1);
});

test('PhoneNumberPendingCard should call onDiscard when Scarta is clicked', () => {
  const onDiscard = vi.fn();
  render(
    <PhoneNumberPendingCard
      phoneNumber={PHONE_NUMBER}
      onSave={vi.fn()}
      onDiscard={onDiscard}
    />,
  );
  fireEvent.click(screen.getByRole('button', { name: /scarta/i }));
  expect(onDiscard).toHaveBeenCalledTimes(1);
});

test('PhoneNumberPendingCard should render the hint text', () => {
  render(
    <PhoneNumberPendingCard
      phoneNumber={PHONE_NUMBER}
      onSave={vi.fn()}
      onDiscard={vi.fn()}
    />,
  );
  expect(screen.getByText(/componi a mano/i)).toBeInTheDocument();
});
