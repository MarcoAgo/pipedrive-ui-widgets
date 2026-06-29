import type { JSX } from 'react';
import { Button } from '@reverse-hr/design-system';
import type { TDiscardedPhoneRowProps } from './DiscardedPhoneRow.types';
import './discarded-phone-row.scss';

export const DiscardedPhoneRow = ({
  phoneNumber,
  showUndo,
  onUndo,
}: TDiscardedPhoneRowProps): JSX.Element => (
  <div className="discarded-phone-row">
    <svg
      className="discarded-phone-row__close-icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
    <span className="discarded-phone-row__number">{phoneNumber}</span>
    {showUndo && (
      <Button
        variant="simple-text"
        size="small"
        leftIcon="icn-refresh"
        onClick={onUndo}
        aria-label="Ripristina numero"
      >
        Ripristina
      </Button>
    )}
  </div>
);
