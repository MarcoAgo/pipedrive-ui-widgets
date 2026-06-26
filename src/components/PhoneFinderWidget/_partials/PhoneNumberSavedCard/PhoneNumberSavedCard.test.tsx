import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { PhoneNumberSavedCard } from './PhoneNumberSavedCard';

const PHONE_NUMBER = '+39 02 0000 1234';

afterEach(cleanup);

test('PhoneNumberSavedCard should render the phone number', () => {
  render(
    <PhoneNumberSavedCard phoneNumber={PHONE_NUMBER} onMarkWrong={vi.fn()} />,
  );
  expect(screen.getByText(PHONE_NUMBER)).toBeInTheDocument();
});

test('PhoneNumberSavedCard should render the saved badge text', () => {
  render(
    <PhoneNumberSavedCard phoneNumber={PHONE_NUMBER} onMarkWrong={vi.fn()} />,
  );
  expect(screen.getByText(/salvato sul contatto/i)).toBeInTheDocument();
});

test('PhoneNumberSavedCard should render the Era sbagliato button', () => {
  render(
    <PhoneNumberSavedCard phoneNumber={PHONE_NUMBER} onMarkWrong={vi.fn()} />,
  );
  expect(
    screen.getByRole('button', { name: /era sbagliato/i }),
  ).toBeInTheDocument();
});

test('PhoneNumberSavedCard should call onMarkWrong when Era sbagliato is clicked', () => {
  const onMarkWrong = vi.fn();
  render(
    <PhoneNumberSavedCard
      phoneNumber={PHONE_NUMBER}
      onMarkWrong={onMarkWrong}
    />,
  );
  fireEvent.click(screen.getByRole('button', { name: /era sbagliato/i }));
  expect(onMarkWrong).toHaveBeenCalledTimes(1);
});
