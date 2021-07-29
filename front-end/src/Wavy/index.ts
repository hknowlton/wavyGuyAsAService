import { WavyEvents } from './WavyEvents';

// do we want to expose these or just let users set them up??
export function wavySuccess() {
  WavyEvents.show({
    type: 'Success'
  });
}

export function wavyError() {
  WavyEvents.show({
    type: 'Failure'
  });
}
