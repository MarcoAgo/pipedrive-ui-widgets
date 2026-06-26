import type { JSX } from 'react';
import { Button } from '@reverse-hr/design-system';
import type { TSearchPhoneButtonProps } from './SearchPhoneButton.types';
import './search-phone-button.scss';

export const SearchPhoneButton = ({
  onSearch,
  remainingAttempts,
  isLoading,
  isRetry,
}: TSearchPhoneButtonProps): JSX.Element => {
  const label = isRetry
    ? `Cerca ancora (${remainingAttempts} ${remainingAttempts === 1 ? 'tentativo rimasto' : 'tentativi rimasti'})`
    : 'Cerca un numero';

  const className = isRetry
    ? 'search-phone-button search-phone-button--retry'
    : 'search-phone-button';

  return (
    <Button
      variant={isRetry ? 'outline' : 'primary'}
      size="medium"
      leftIcon={isLoading ? 'icn-loading' : 'icn-search'}
      isDisabled={isLoading || remainingAttempts === 0}
      className={className}
      onClick={onSearch}
    >
      {label}
    </Button>
  );
};
