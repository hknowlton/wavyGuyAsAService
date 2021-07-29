import { WavyManager } from './WavyManager';
import { WavyOptions } from './component';

type WavyEventsType = {
  container: WavyManager | null;
  mount: (comp: WavyManager) => void;
  show: (options: Partial<WavyOptions>) => void;
};

export const WavyEvents: WavyEventsType = {
  container: null,
  mount(comp) {
    this.container = comp;
  },
  show(options) {
    if (this.container) {
      this.container.showWavy(options);
    }
  }
};
