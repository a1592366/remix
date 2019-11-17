import React from '../../../react';
import PropTypes from '../../../react/PropTypes';


export default class RemixText extends React.Component {
  
  static propTypes = {
    parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		selectable: PropTypes.bool,
		space: PropTypes.bool,
		decode: PropTypes.bool,
		
  };

  static defaultProps = {
    parent: null,
		style: null,
		className: null,
		selectable: false,
		space: false,
		decode: false,
		
  };

  

  render () {
    const { parent, style, className, selectable, space, decode } = this.props;

    return <text parent={parent} style={style} className={className} selectable={selectable} space={space} decode={decode}>{this.props.children}</text>;
  }
}


