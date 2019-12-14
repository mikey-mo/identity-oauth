import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Identifiers from './Screens/Identifiers';
import Permissions from './Screens/Permissions';
import VerifyCode from './Screens/VerifyCode';
import Complete from './Screens/Complete';
import * as serviceWorker from './serviceWorker';
import { WhisperSpinner } from "react-spinners-kit";
import 'typeface-noto-sans-tc';

class Navigation extends Component {
  state = { visible: false };

  toggleLoader = visible => this.setState({ visible })

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Router>
          <Route
            exact path="/auth"
            render={() => <Identifiers
                toggleLoader={this.toggleLoader}
              />
            }
          />
          <Route
            path="/auth/verify"
            render={() => <VerifyCode
                toggleLoader={this.toggleLoader}
              />
            }
          />
          <Route
            path="/auth/permissions"
            render={() => <Permissions
                toggleLoader={this.toggleLoader}
              />
            }
          />
          <Route
            path="/auth/complete"
            component={Complete}
          />
        </Router>
      { visible &&
        <div
          style={{
            backgroundColor: 'grey',
            opacity: 0.6,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <WhisperSpinner
            size={50}
            color="white"
            loading
          />
        </div>
      }
    </div>
    );
  }
}

ReactDOM.render(<Navigation />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
