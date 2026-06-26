import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { DiscardedPhoneRow } from './DiscardedPhoneRow';

const PHONE_NUMBER = '+39 348 712 0099';

afterEach(cleanup);

test('DiscardedPhoneRow should render the phone number', () => {
  render(<DiscardedPhoneRow phoneNumber={PHONE_NUMBER} showUndo={false} />);
  expect(screen.getByText(PHONE_NUMBER)).toBeInTheDocument();
});

test('DiscardedPhoneRow should show the undo button when showUndo is true', () => {
  render(
    <DiscardedPhoneRow
      phoneNumber={PHONE_NUMBER}
      showUndo={true}
      onUndo={vi.fn()}
    />,
  );
  expect(
    screen.getByRole('button', { name: /ripristina/i }),
  ).toBeInTheDocument();
});

test('DiscardedPhoneRow should not show the undo button when showUndo is false', () => {
  render(<DiscardedPhoneRow phoneNumber={PHONE_NUMBER} showUndo={false} />);
  expect(
    screen.queryByRole('button', { name: /ripristina/i }),
  ).not.toBeInTheDocument();
});

test('DiscardedPhoneRow should call onUndo when undo button is clicked', () => {
  const onUndo = vi.fn();
  render(
    <DiscardedPhoneRow
      phoneNumber={PHONE_NUMBER}
      showUndo={true}
      onUndo={onUndo}
    />,
  );
  fireEvent.click(screen.getByRole('button', { name: /ripristina/i }));
  expect(onUndo).toHaveBeenCalledTimes(1);
});
