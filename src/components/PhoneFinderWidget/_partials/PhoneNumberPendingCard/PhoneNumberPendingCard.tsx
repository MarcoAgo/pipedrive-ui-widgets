import type { JSX } from 'react';
import { Button, Icon } from '@reverse-hr/design-system';
import type { TPhoneNumberPendingCardProps } from './PhoneNumberPendingCard.types';
import { PHONE_FINDER_HINT_TEXT } from '../../_constants/PhoneFinderWidget.constants';
import './phone-number-pending-card.scss';

export const PhoneNumberPendingCard = ({
  phoneNumber,
  onSave,
  onDiscard,
}: TPhoneNumberPendingCardProps): JSX.Element => (
  <div>
    <div className="phone-number-pending-card">
      <p className="phone-number-pending-card__number">{phoneNumber}</p>
      <div className="phone-number-pending-card__actions">
        <Button
          variant="outline"
          size="medium"
          leftIcon="icn-save"
          className="phone-number-pending-card__save-btn"
          onClick={onSave}
        >
          Salva
        </Button>
        <Button
          variant="outline"
          size="medium"
          leftIcon="icn-close-small"
          className="phone-number-pending-card__discard-btn"
          onClick={onDiscard}
        >
          Scarta
        </Button>
      </div>
    </div>
    <p className="phone-number-pending-card-hint">
      <Icon name="icn-phone" size={12} />
      {PHONE_FINDER_HINT_TEXT}
    </p>
  </div>
);
