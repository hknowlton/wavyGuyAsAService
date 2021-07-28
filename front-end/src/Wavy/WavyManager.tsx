import React, { PureComponent } from 'react';
import { WavyEvents } from './WavyEvents';
import Wavy, { WavyOptions, defaultProps } from './component';

type WavyGuyState = {
  wavyOptions: WavyOptions | null;
};

export class WavyManager extends PureComponent<{}, WavyGuyState> {
  containerTimeout?: NodeJS.Timeout;

  state: WavyGuyState = {
    wavyOptions: null
  };

  componentDidMount() {
    WavyEvents.mount(this);
  }

  componentWillUnmount() {
    if (!this.containerTimeout) return;
    clearTimeout(this.containerTimeout);
  }

  showWavy = (wavyOptions: Partial<WavyOptions>) => {
    if (this.containerTimeout) {
      clearTimeout(this.containerTimeout);
    }

    const { wavyOptions: existingWavyOptions } = this.state;
    this.setState({
      wavyOptions: {
        ...defaultProps,
        ...existingWavyOptions,
        ...wavyOptions
      }
    });
  };

  closeWavy = () => {
    const { wavyOptions } = this.state;
    const currentOptions = wavyOptions || defaultProps;
    this.setState(
      {
        wavyOptions: {
          ...currentOptions,
          animationClass: 'on-leave'
        }
      },
      () => {
        this.containerTimeout = setTimeout(() => {
          this.setState({ wavyOptions: null });
        }, 500);
      }
    );
  };

  render() {
    const { wavyOptions } = this.state;

    return wavyOptions && <Wavy {...wavyOptions} closeWavy={this.closeWavy} />;
  }
}
