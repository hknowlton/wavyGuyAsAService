import React, { useEffect } from 'react';
import { CloseIcon } from '../components/CloseIcon';
import { WavyWrapper, CloseButton, WavyText } from './styles';

export type WavyPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export const defaultProps = {
  type: 'Success',
  position: 'bottom-right' as WavyPosition,
  showFor: 5000,
  closeWavy: () => {},
  animationClass: '',
  styles: ''
};

export type WavyOptions = {
  type: 'Success' | 'Failure';
  position: WavyPosition;
  showFor: number;
  closeWavy: () => void;
  animationClass: string;
  styles: {};
};

const Wavy = ({
  type,
  position,
  showFor,
  closeWavy,
  animationClass,
  styles
}: WavyOptions) => {
  let wavyTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (showFor) {
      wavyTimeout = setTimeout(() => {
        closeWavy();
      }, showFor);
    }
    return () => {
      clearTimeout(wavyTimeout);
    };
  }, []);

  const sayings = localStorage.getItem('sayings')
    ? // @ts-ignore
      JSON.parse(localStorage.getItem('sayings' || ''))
    : [];
  console.log('sayings from storage', sayings);
  const sayingsArray = sayings[type];
  return (
    <WavyWrapper
      type={type}
      className={animationClass}
      position={position}
      styles={styles}
    >
      <WavyText>
        {sayingsArray[Math.floor(Math.random() * sayingsArray.length)] ||
          'Woohooo!'}
      </WavyText>
      <CloseButton onClick={closeWavy}>
        <CloseIcon />
      </CloseButton>
      <img src="/25-pm-unscreen.gif" />
    </WavyWrapper>
  );
};
Wavy.defaultProps = defaultProps;

export default Wavy;
