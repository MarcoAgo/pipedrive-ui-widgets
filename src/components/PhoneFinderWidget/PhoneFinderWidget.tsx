import { useEffect, useState, type JSX } from 'react';
import { Icon } from '@reverse-hr/design-system';
import type { TPhoneFinderWidgetProps } from './PhoneFinderWidget.types';
import { usePhoneFinder } from '../../store/phone-finder/use-phone-finder';
import {
  selectorPhoneFinderStatus,
  selectorPhoneFinderCurrentNumber,
  selectorPhoneFinderConfirmedNumber,
  selectorPhoneFinderDiscardedNumbers,
  selectorPhoneFinderRemainingAttempts,
  selectorPhoneFinderInitialize,
  selectorPhoneFinderConfirmNumber,
  selectorPhoneFinderDiscardNumber,
  selectorPhoneFinderUndoDiscard,
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
}: TPhoneFinderWidgetProps): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const status = usePhoneFinder(selectorPhoneFinderStatus);
  const currentNumber = usePhoneFinder(selectorPhoneFinderCurrentNumber);
  const confirmedNumber = usePhoneFinder(selectorPhoneFinderConfirmedNumber);
  const discardedNumbers = usePhoneFinder(selectorPhoneFinderDiscardedNumbers);
  const remainingAttempts = usePhoneFinder(
    selectorPhoneFinderRemainingAttempts,
  );
  const initialize = usePhoneFinder(selectorPhoneFinderInitialize);
  const confirmNumber = usePhoneFinder(selectorPhoneFinderConfirmNumber);
  const discardNumber = usePhoneFinder(selectorPhoneFinderDiscardNumber);
  const undoDiscard = usePhoneFinder(selectorPhoneFinderUndoDiscard);
  const markWrong = usePhoneFinder(selectorPhoneFinderMarkWrong);
  const reset = usePhoneFinder(selectorPhoneFinderReset);

  useEffect(() => {
    initialize(initialData);
    return () => reset();
  }, [entityId]);

  const isPending = status === 'pending';
  const isSaved = status === 'saved';
  const hasDiscarded = discardedNumbers.length > 0;
  const showSeparator = isPending && hasDiscarded;
  const showSearchButton = !isSaved && remainingAttempts > 0;
  const isSearchRetry = hasDiscarded || isPending;

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
          {isSaved && confirmedNumber && (
            <PhoneNumberSavedCard
              phoneNumber={confirmedNumber}
              onMarkWrong={markWrong}
            />
          )}

          {isPending && currentNumber && (
            <PhoneNumberPendingCard
              phoneNumber={currentNumber}
              onSave={confirmNumber}
              onDiscard={discardNumber}
            />
          )}

          {showSeparator && <hr className="phone-finder-widget__separator" />}

          {hasDiscarded && (
            <div className="phone-finder-widget__discarded-list">
              {isSaved && (
                <span className="phone-finder-widget__discarded-label">
                  {PHONE_FINDER_DISCARDED_LABEL}
                </span>
              )}
              {discardedNumbers.map(number => (
                <DiscardedPhoneRow
                  key={number}
                  phoneNumber={number}
                  showUndo={!isSaved}
                  onUndo={() => undoDiscard(number)}
                />
              ))}
            </div>
          )}

          {!isPending && !isSaved && !hasDiscarded && (
            <p className="phone-finder-widget__empty">
              {PHONE_FINDER_EMPTY_TEXT}
            </p>
          )}

          {showSearchButton && (
            <SearchPhoneButton
              onSearch={onSearch}
              remainingAttempts={remainingAttempts}
              isLoading={status === 'loading'}
              isRetry={isSearchRetry}
            />
          )}
        </div>
      )}
    </div>
  );
};
