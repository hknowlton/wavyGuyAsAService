import React, { useEffect } from 'react';

import { WavyManager } from '../../Wavy/WavyManager';
import { wavySuccess, wavyError } from '../../Wavy';
import { WavyEvents } from '../../Wavy/WavyEvents';

import { Greeting } from './styles';

export function Home() {
  useEffect(() => {
    WavyEvents.show({
      type: 'Failure',
      position: 'top-right'
    });
  }, []);
  return (
    <Greeting>
      <WavyManager />
      woot
      <button onClick={() => wavySuccess()}> click me </button>
    </Greeting>
  );
}
