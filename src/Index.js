import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './styles/styles.scss';
import App from './containers/App/App';


const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./containers/App/App', () => {
    render(App);
  });
}
