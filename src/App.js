import React, { Component } from 'react';
import URLSearchParams from 'url-search-params';
import { Grommet } from 'grommet';
import { grommet, dark } from 'grommet/themes';
import { hpe } from 'grommet-theme-hpe';
import { Router } from './Router';
import Analytics from './components/Analytics';
import Content from './components/Content';

const THEMES = {
  grommet,
  dark,
  hpe,
};

export default class App extends Component {
  state = {
    themeName: 'hpe',
  };

  componentDidMount() {
    if (window.location.search) {
      const {
        location: { search },
      } = window;
      const params = new URLSearchParams(search);
      // eslint-disable-next-line
      this.setState({ search, themeName: params.get('theme') });
    }
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
      this.unlisten = undefined;
    }
  }

  render() {
    const { search, themeName } = this.state;
    return (
      <Router search={search}>
        <Analytics>
          <Grommet theme={THEMES[themeName || 'hpe']}>
            <Content />
          </Grommet>
        </Analytics>
      </Router>
    );
  }
}
