if (typeof module !== 'undefined') {
  React = require('react')
}

class UnusedComponent extends React.Component {
  render() {
    return React.createElement('div', {}, ["This component is not used"]);
  }
}

if (typeof module !== 'undefined') {
  module.exports = UnusedComponent;
}