import type { TPhoneFinderInitialData } from '../../store/phone-finder/phone-finder.types';

export interface TPhoneFinderWidgetProps {
  entityId: string;
  initialData?: TPhoneFinderInitialData;
  onSearch: () => void | Promise<void>;
  onConfirm?: (phone: string) => void | Promise<void>;
}
