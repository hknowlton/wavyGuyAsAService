import React, { useEffect } from 'react';

import { WavyManager } from '../../Wavy/WavyManager';
import { wavySuccess } from '../../Wavy';
import { WavyEvents } from '../../Wavy/WavyEvents';

import { Greeting } from './styles';

export function Home() {
  useEffect(() => {
    wavySuccess('hello');
    WavyEvents.show({
      type: 'failure',
      position: 'top-right'
    });
  }, []);
  return (
    <Greeting>
      <WavyManager />
      woot
      <button onClick={() => wavySuccess('hello')}> click me </button>
    </Greeting>
  );
}
