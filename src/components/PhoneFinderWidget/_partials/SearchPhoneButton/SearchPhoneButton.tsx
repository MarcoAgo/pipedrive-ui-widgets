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

  return (
    <Button
      variant={isRetry ? 'outline' : 'primary'}
      size="small"
      isFullWidth
      leftIcon={isLoading ? 'icn-loading' : 'icn-search'}
      isDisabled={isLoading || remainingAttempts === 0}
      className={
        isRetry
          ? 'search-phone-button search-phone-button--retry'
          : 'search-phone-button'
      }
      onClick={onSearch}
    >
      {label}
    </Button>
  );
};
