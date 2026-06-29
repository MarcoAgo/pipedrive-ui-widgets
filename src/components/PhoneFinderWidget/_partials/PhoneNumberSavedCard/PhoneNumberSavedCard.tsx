import type { JSX } from 'react';
import { Button, Icon } from '@reverse-hr/design-system';
import type { TPhoneNumberSavedCardProps } from './PhoneNumberSavedCard.types';
import './phone-number-saved-card.scss';

export const PhoneNumberSavedCard = ({
  phoneNumber,
  onMarkWrong,
}: TPhoneNumberSavedCardProps): JSX.Element => (
  <div className="phone-number-saved-card">
    <p className="phone-number-saved-card__badge">
      <Icon name="icn-check" size={14} />
      salvato sul contatto
    </p>
    <p className="phone-number-saved-card__number">{phoneNumber}</p>
    <Button
      variant="outline"
      size="small"
      leftIcon="icn-error-outline"
      className="phone-number-saved-card__wrong-btn"
      onClick={onMarkWrong}
    >
      Era sbagliato
    </Button>
  </div>
);
