if (typeof module !== 'undefined') {
  React = require('react')
}

class ExampleComponent extends React.Component {
  render() {
    return React.createElement('div', {}, ["React has loaded."]);
  }
}

if (typeof module !== 'undefined') {
  module.exports = ExampleComponent;
}