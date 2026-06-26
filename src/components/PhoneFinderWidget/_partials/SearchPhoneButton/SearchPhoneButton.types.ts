export interface TSearchPhoneButtonProps {
  onSearch: () => void;
  remainingAttempts: number;
  isLoading: boolean;
  isRetry: boolean;
}
