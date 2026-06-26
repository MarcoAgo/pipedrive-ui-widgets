import type { JSX } from 'react';
import { Button, Icon } from '@reverse-hr/design-system';
import type { TDiscardedPhoneRowProps } from './DiscardedPhoneRow.types';
import './discarded-phone-row.scss';

export const DiscardedPhoneRow = ({
  phoneNumber,
  showUndo,
  onUndo,
}: TDiscardedPhoneRowProps): JSX.Element => (
  <div className="discarded-phone-row">
    <Icon
      className="discarded-phone-row__close-icon"
      name="icn-close-small"
      size={16}
    />
    <span className="discarded-phone-row__number">{phoneNumber}</span>
    {showUndo && (
      <Button
        variant="outline"
        size="small"
        className="discarded-phone-row__undo-btn"
        onClick={onUndo}
        aria-label="Ripristina numero"
      >
        <Icon name="icn-refresh" size={12} />
      </Button>
    )}
  </div>
);
