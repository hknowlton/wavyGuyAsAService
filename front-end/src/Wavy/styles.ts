import styled, { keyframes, css } from 'styled-components';
import { WavyOptions } from './component';
import theme from '../utils/theme';

type WavyStyles = Pick<WavyOptions, 'type' | 'styles'>;

const wavySlideOn = (props: WavyStyles) => {
  return keyframes`
    0% {
      transform: translateY(200px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `;
};

const wavySlideOnAnimation = css`
  animation: ${wavySlideOn} 300ms ease-in;
` as any;

export const WavyWrapper = styled.div<WavyStyles>`
  position: fixed;
  z-index: 1500;
  display: flex;
  min-width: 100px;
  max-width: 375px;
  font-size: 16px;
  color: ${theme.carvana.white.primary};
  font-family: ${theme.StyledText.fontFamily};
  bottom: -65px;
  right: 65px;
  ${wavySlideOnAnimation};
  transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;

  &.on-leave {
    opacity: 0;
    transform: translateY(200px);
  }

  ${props => props.styles}
`;

export const WavyText = styled.div`
  color: black;
  position: absolute;
  top: 36px;
  left: 33px;
  height: 100px;
  width: 185px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
`;

export const CloseButton = styled.div`
  cursor: pointer;
  color: black;
  transition: opacity 100ms ease-in-out;
  position: absolute;
  left: 75px;
  top: 160px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:active {
    opacity: 0.54;
  }
`;

export const BubbleWrapper = styled.div`
  position: relative;
  svg {
    width: 250px;
  }
`;

export const Relative = styled.div`
  position: relative;
`;

export const LayerBubble = styled.div`
  position: absolute;
  top: -79px;
  left: 171px;
`;
