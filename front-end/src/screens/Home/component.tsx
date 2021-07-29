import React, { useEffect } from 'react';

import { WavyManager } from '../../Wavy/WavyManager';
import { wavySuccess, wavyError } from '../../Wavy';
import { WavyEvents } from '../../Wavy/WavyEvents';

import { Greeting } from './styles';

export function Home() {
  useEffect(() => {
    WavyEvents.show({
      type: 'Failure'
    });
  }, []);
  return (
    <Greeting>
      <WavyManager />
      <button onClick={() => wavySuccess()}> click me </button>
    </Greeting>
  );
}
