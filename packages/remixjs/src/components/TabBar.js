import Component from '../react/Component';
import PropTypes from '../react/PropTypes';
import View from '../View';

class TabBarItem extends Component {
  static propTypes = {
    path: PropTypes.string,
    icon: PropTypes.string,
    selectedIcon: PropTypes.string,
    children: PropTypes.string
  }

  render () {
    return <View>{this.props.children}</View>
  }
}

export default class TabBar extends Component {
  static TabBarItem = TabBarItem;
  static propTypes = {
    color: PropTypes.string,
    selectedColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderStyle: PropTypes.oneOf(['black', 'white']),
    position: PropTypes.oneOf(['bottom', 'top']),
    custom: PropTypes.bool
  }

  static defaultProps = {
    position: 'bottom',
    bottom: false
  }
  
  render () {
    return <View>{this.props.children}</View>
  }
}