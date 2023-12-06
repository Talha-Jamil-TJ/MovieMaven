import { Overlay } from '@angular/cdk/overlay';

export const scrollStrategyFactory = (overlay: Overlay) => {
  return () => overlay.scrollStrategies.reposition();
};
