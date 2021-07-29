import { WavyEvents } from './WavyEvents';

// do we want to expose these or just let users set them up??
export function wavySuccess(text: string) {
  WavyEvents.show({
    type: 'success'
  });
}

export function wavyError(text: string) {
  WavyEvents.show({
    type: 'failure'
  });
}
