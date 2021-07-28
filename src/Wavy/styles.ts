import styled, { keyframes, css } from 'styled-components';
import { WavyOptions } from './component';
import theme from '../utils/theme';

type WavyStyles = Pick<WavyOptions, 'type' | 'position' | 'styles'>;

const MARGIN = '15px';

export const getTypeColor = (props: WavyStyles) => {
  const typeColors = {
    error: theme.carvana.red.primary,
    warning: theme.carvana.yellow.primary,
    success: theme.carvana.green.primary,
    info: theme.carvana.blue.primary
  };
  return (
    typeColors[props.type as keyof typeof typeColors] ||
    theme.carvana.blue.primary
  );
};

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
  background: ${getTypeColor};
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
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 1px 15px 0px rgba(0, 0, 0, 0.12);

  &.on-leave {
    opacity: 0;
    ${wavyTranslate}
  }

  ${props => props.styles}
`;

export const WavyText = styled.div`
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
