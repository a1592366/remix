import React from '../../../react';
import PropTypes from '../../../react/PropTypes';


export default class RemixView extends React.Component {
  
  static propTypes = {
    onTouchStart: PropTypes.string,
		onTouchMove: PropTypes.string,
		onTouchCancel: PropTypes.string,
		onTouchEnd: PropTypes.string,
		onTap: PropTypes.string,
		onLongPress: PropTypes.string,
		onLongTap: PropTypes.string,
		onTransitionEnd: PropTypes.string,
		onAnimationStart: PropTypes.string,
		onAnimationIteration: PropTypes.string,
		onAnimationEnd: PropTypes.string,
		onTouchForceChange: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		hoverClass: PropTypes.string,
		hoverStopPropagation: PropTypes.bool,
		hoverStartTime: PropTypes.number,
		hoverStayTime: PropTypes.number,
		
  };

  static defaultProps = {
    onTouchStart: null,
		onTouchMove: null,
		onTouchCancel: null,
		onTouchEnd: null,
		onTap: null,
		onLongPress: null,
		onLongTap: null,
		onTransitionEnd: null,
		onAnimationStart: null,
		onAnimationIteration: null,
		onAnimationEnd: null,
		onTouchForceChange: null,
		style: null,
		className: null,
		hoverClass: 'none',
		hoverStopPropagation: false,
		hoverStartTime: 50,
		hoverStayTime: 400,
		
  };

  render () {
    const { onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, onTouchForceChange, style, className, hoverClass, hoverStopPropagation, hoverStartTime, hoverStayTime } = this.props;

    return <view onTouchStart={onTouchStart ? 'onTouchStart' : null} onTouchMove={onTouchMove ? 'onTouchMove' : null} onTouchCancel={onTouchCancel ? 'onTouchCancel' : null} onTouchEnd={onTouchEnd ? 'onTouchEnd' : null} onTap={onTap ? 'onTap' : null} onLongPress={onLongPress ? 'onLongPress' : null} onLongTap={onLongTap ? 'onLongTap' : null} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null} onAnimationStart={onAnimationStart ? 'onAnimationStart' : null} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null} style={style} className={className} hoverClass={hoverClass} hoverStopPropagation={hoverStopPropagation} hoverStartTime={hoverStartTime} hoverStayTime={hoverStayTime}>{this.props.children}</view>;
  }
}


