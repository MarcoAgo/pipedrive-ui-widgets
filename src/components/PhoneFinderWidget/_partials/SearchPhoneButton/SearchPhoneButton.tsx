import type { JSX } from 'react';
import { Button } from '@reverse-hr/design-system';
import type { TSearchPhoneButtonProps } from './SearchPhoneButton.types';
import './search-phone-button.scss';

function buildLabel(isRetry: boolean, remainingAttempts: number): string {
  if (!isRetry) return 'Cerca un numero';
  if (remainingAttempts === 0) return 'Cerca di nuovo';
  const attemptsLabel = remainingAttempts === 1 ? 'rimasto' : 'rimasti';
  return `Cerca ancora (${remainingAttempts} ${attemptsLabel})`;
}

export const SearchPhoneButton = ({
  onSearch,
  remainingAttempts,
  isLoading,
  isRetry,
}: TSearchPhoneButtonProps): JSX.Element => (
  <Button
    variant={isRetry ? 'outline' : 'primary'}
    size="small"
    isFullWidth
    leftIcon={isLoading ? 'icn-loading' : 'icn-search'}
    isDisabled={isLoading}
    className={
      isRetry
        ? 'search-phone-button search-phone-button--retry'
        : 'search-phone-button'
    }
    onClick={onSearch}
  >
    {buildLabel(isRetry, remainingAttempts)}
  </Button>
);
