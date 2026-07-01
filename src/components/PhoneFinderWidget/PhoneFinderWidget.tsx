import { useEffect, useState, type JSX } from 'react';
import { Icon, LoadingSpinner } from '@reverse-hr/design-system';
import type { TPhoneFinderWidgetProps } from './PhoneFinderWidget.types';
import { usePhoneFinder } from '../../store/phone-finder/use-phone-finder';
import {
  selectorPhoneFinderStatus,
  selectorPhoneFinderCurrentNumber,
  selectorPhoneFinderConfirmedNumber,
  selectorPhoneFinderDiscardedEntries,
  selectorPhoneFinderRemainingAttempts,
  selectorPhoneFinderError,
  selectorPhoneFinderInitialize,
  selectorPhoneFinderConfirmNumber,
  selectorPhoneFinderDiscardNumber,
  selectorPhoneFinderMarkWrong,
  selectorPhoneFinderReset,
} from '../../store/phone-finder/phone-finder.selectors';
import {
  PHONE_FINDER_TITLE,
  PHONE_FINDER_EMPTY_TEXT,
  PHONE_FINDER_DISCARDED_LABEL,
} from './_constants/PhoneFinderWidget.constants';
import { PhoneNumberPendingCard } from './_partials/PhoneNumberPendingCard/PhoneNumberPendingCard';
import { PhoneNumberSavedCard } from './_partials/PhoneNumberSavedCard/PhoneNumberSavedCard';
import { DiscardedPhoneRow } from './_partials/DiscardedPhoneRow/DiscardedPhoneRow';
import { SearchPhoneButton } from './_partials/SearchPhoneButton/SearchPhoneButton';
import './phone-finder-widget.scss';

export const PhoneFinderWidget = ({
  entityId,
  initialData,
  onSearch,
  onConfirm,
}: TPhoneFinderWidgetProps): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const status = usePhoneFinder(selectorPhoneFinderStatus);
  const currentNumber = usePhoneFinder(selectorPhoneFinderCurrentNumber);
  const confirmedNumber = usePhoneFinder(selectorPhoneFinderConfirmedNumber);
  const discardedEntries = usePhoneFinder(selectorPhoneFinderDiscardedEntries);
  const remainingAttempts = usePhoneFinder(
    selectorPhoneFinderRemainingAttempts,
  );
  const error = usePhoneFinder(selectorPhoneFinderError);
  const initialize = usePhoneFinder(selectorPhoneFinderInitialize);
  const confirmNumber = usePhoneFinder(selectorPhoneFinderConfirmNumber);
  const discardNumber = usePhoneFinder(selectorPhoneFinderDiscardNumber);
  const markWrong = usePhoneFinder(selectorPhoneFinderMarkWrong);
  const reset = usePhoneFinder(selectorPhoneFinderReset);

  useEffect(() => {
    initialize(initialData);
    return () => reset();
  }, [entityId]);

  const isPending = status === 'pending';
  const isSaved = status === 'saved';
  const isLoading = status === 'loading';
  const hasDiscarded = discardedEntries.length > 0;
  function handleSave(): void {
    if (!currentNumber) return;
    confirmNumber();
    onConfirm?.(currentNumber);
  }

  const showEmptyState = !isPending && !isSaved && !hasDiscarded && !error;
  const showSeparator = hasDiscarded && (isPending || isSaved);
  const showSearchButton = status === 'idle';

  return (
    <div className="phone-finder-widget">
      <div className="phone-finder-widget__header">
        <h2 className="phone-finder-widget__title">{PHONE_FINDER_TITLE}</h2>
        <button
          type="button"
          className="phone-finder-widget__collapse-btn"
          onClick={() => setIsCollapsed(prev => !prev)}
          aria-label={isCollapsed ? 'Espandi' : 'Comprimi'}
          aria-expanded={!isCollapsed}
        >
          <Icon
            name="icn-chevron-down"
            size={16}
            className={`phone-finder-widget__collapse-icon${isCollapsed ? '' : ' phone-finder-widget__collapse-icon--rotated'}`}
          />
        </button>
      </div>

      {!isCollapsed && (
        <div className="phone-finder-widget__body">
          {isLoading ? (
            <div className="phone-finder-widget__loading">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {isSaved && confirmedNumber && (
                <PhoneNumberSavedCard
                  phoneNumber={confirmedNumber}
                  onMarkWrong={markWrong}
                />
              )}

              {isPending && currentNumber && (
                <PhoneNumberPendingCard
                  phoneNumber={currentNumber}
                  onSave={handleSave}
                  onDiscard={discardNumber}
                />
              )}

              {showSeparator && (
                <hr className="phone-finder-widget__separator" />
              )}

              {hasDiscarded && (
                <div className="phone-finder-widget__discarded-list">
                  {isSaved && (
                    <span className="phone-finder-widget__discarded-label">
                      {PHONE_FINDER_DISCARDED_LABEL}
                    </span>
                  )}
                  {discardedEntries.map(entry => (
                    <DiscardedPhoneRow
                      key={entry.number}
                      phoneNumber={entry.number}
                      showUndo={false}
                    />
                  ))}
                </div>
              )}

              {showEmptyState && (
                <p className="phone-finder-widget__empty">
                  {PHONE_FINDER_EMPTY_TEXT}
                </p>
              )}

              {error && <p className="phone-finder-widget__error">{error}</p>}

              {showSearchButton && (
                <SearchPhoneButton
                  onSearch={onSearch}
                  remainingAttempts={remainingAttempts}
                  isLoading={false}
                  isRetry={hasDiscarded}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
