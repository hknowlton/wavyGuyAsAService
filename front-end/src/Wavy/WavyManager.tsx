import React, { PureComponent } from 'react';
import { WavyEvents } from './WavyEvents';
import Wavy, { WavyOptions, defaultProps } from './component';

type WavyGuyState = {
  wavyOptions: WavyOptions | null;
  showWavy: boolean;
};

export class WavyManager extends PureComponent<{}, WavyGuyState> {
  containerTimeout?: NodeJS.Timeout;

  state: WavyGuyState = {
    wavyOptions: null,
    showWavy: false
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

  shouldShowWavy = () => {
    const randomNumber = Math.floor(Math.random() * 5);
    if (randomNumber === 2) {
      return true;
    } else {
      return false;
    }
  };

  showWavy = (wavyOptions: Partial<WavyOptions>) => {
    // in typical use, we would only want to show wavy at random intervals
    // the this.shouldShowWavy() method is for that, but we will not implement it here for demo purposes
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
