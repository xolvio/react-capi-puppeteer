if (typeof module !== 'undefined') {
  React = require('react')
}

class ExampleComponent extends React.Component {
  render() {
    return React.createElement('input');
  }
}

if (typeof module !== 'undefined') {
  module.exports = ExampleComponent;
}