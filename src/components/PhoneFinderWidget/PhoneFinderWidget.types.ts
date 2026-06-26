import type { TPhoneFinderInitialData } from '../../store/phone-finder/phone-finder.types';

export interface TPhoneFinderWidgetProps {
  entityId: string;
  initialData?: TPhoneFinderInitialData;
  onSearch: () => void;
}
