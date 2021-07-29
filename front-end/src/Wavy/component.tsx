import React, { useEffect } from 'react';
import { CloseIcon } from '../components/CloseIcon';
import { WavyWrapper, CloseButton, WavyText } from './styles';

export type WavyPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export const defaultProps = {
  type: 'success',
  text: '',
  position: 'bottom-right' as WavyPosition,
  showFor: 5000,
  closeWavy: () => {},
  animationClass: '',
  styles: ''
};

export type WavyOptions = typeof defaultProps;

const Wavy = ({
  type,
  text,
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

  return (
    <WavyWrapper
      type={type}
      className={animationClass}
      position={position}
      styles={styles}
    >
      <WavyText>{text}</WavyText>
      <CloseButton onClick={closeWavy}>
        <CloseIcon />
      </CloseButton>
      <img src="/wavy-unscreen.gif" />
    </WavyWrapper>
  );
};
Wavy.defaultProps = defaultProps;

export default Wavy;
