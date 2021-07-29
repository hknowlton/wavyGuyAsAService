import styled, { keyframes, css } from 'styled-components';
import { WavyOptions } from './component';
import theme from '../utils/theme';

type WavyStyles = Pick<WavyOptions, 'type' | 'position' | 'styles'>;

const MARGIN = '15px';

export const wavyPosition = ({ position }: WavyStyles) => {
  const positions = ['bottom', 'left', 'top', 'right'];
  return positions
    .map(key => {
      const value = position.includes(key) ? MARGIN : 'auto';
      return `${key}: ${value};`;
    })
    .join('');
};

export const wavyTranslate = ({ position }: WavyStyles) => {
  const translate = position.includes('bottom') ? 200 : -200;
  return `transform: translateY(${translate}px);`;
};

const wavySlideOn = (props: WavyStyles) => {
  return keyframes`
    0% {
      ${wavyTranslate(props)}
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `;
};

const wavySlideOnAnimation = css`
  animation: ${wavySlideOn} 300ms ease-in-out;
` as any;

export const WavyWrapper = styled.div<WavyStyles>`
  position: fixed;
  padding: 15px;
  padding-top: 17px;
  border-radius: 3px;
  z-index: 1500;
  display: flex;
  align-items: flex-start;
  min-width: 100px;
  max-width: 375px;
  font-size: 16px;
  line-height: 20px;
  color: ${theme.carvana.white.primary};
  font-family: ${theme.StyledText.fontFamily};
  ${wavyPosition}
  ${wavySlideOnAnimation};
  transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;

  &.on-leave {
    opacity: 0;
    ${wavyTranslate}
  }

  ${props => props.styles}
`;

export const WavyText = styled.div`
  color: black;
  margin: 0 ${MARGIN};
`;

export const CloseButton = styled.div`
  cursor: pointer;
  margin-top: 2px;
  transition: opacity 100ms ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.54;
  }
`;
