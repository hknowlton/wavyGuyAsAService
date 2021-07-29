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
    fetch(`https://406f096d8e5a.ngrok.io/teams/DMP/sayings`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(result => {
        console.log('res', result);
        localStorage.setItem('sayings', JSON.stringify(result));
      });

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
      // @ts-ignore
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
        // @ts-ignore
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
