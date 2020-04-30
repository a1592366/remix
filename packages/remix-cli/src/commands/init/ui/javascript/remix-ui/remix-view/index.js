import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

import EventHandle from '../EventHandle';

class RemixView extends EventHandle {
  static propTypes = {
    child: PropTypes.object,
		innerText: PropTypes.string,
		uuid: PropTypes.string,
		parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		hoverClass: PropTypes.string,
		hoverStopPropagation: PropTypes.boolean,
		hoverStartTime: PropTypes.number,
		hoverStayTime: PropTypes.number,
		onTouchStart: PropTypes.string,
		onTouchMove: PropTypes.string,
		onTouchCancel: PropTypes.string,
		onTouchEnd: PropTypes.string,
		onTap: PropTypes.string,
		onLongPress: PropTypes.string,
		onLongTap: PropTypes.string,
		onTouchForceChange: PropTypes.string,
		onTransitionEnd: PropTypes.string,
		onAnimationStart: PropTypes.string,
		onAnimationIteration: PropTypes.string,
		onAnimationEnd: PropTypes.string
  }

  static defaultProps = {
    child: null,
		innerText: null,
		uuid: null,
		parent: null,
		style: null,
		className: null,
		hoverClass: 'none',
		hoverStopPropagation: false,
		hoverStartTime: 50,
		hoverStayTime: 400,
		onTouchStart: null,
		onTouchMove: null,
		onTouchCancel: null,
		onTouchEnd: null,
		onTap: null,
		onLongPress: null,
		onLongTap: null,
		onTouchForceChange: null,
		onTransitionEnd: null,
		onAnimationStart: null,
		onAnimationIteration: null,
		onAnimationEnd: null
  }

  render () {
    const {
      child,
			innerText,
			uuid,
			parent,
			style,
			className,
			hoverClass,
			hoverStopPropagation,
			hoverStartTime,
			hoverStayTime,
			onTouchStart,
			onTouchMove,
			onTouchCancel,
			onTouchEnd,
			onTap,
			onLongPress,
			onLongTap,
			onTouchForceChange,
			onTransitionEnd,
			onAnimationStart,
			onAnimationIteration,
			onAnimationEnd
    } = this.props;

    return (
      <view onTouchStart={onTouchStart ? 'onTouchStart' : null } onTouchMove={onTouchMove ? 'onTouchMove' : null } onTouchCancel={onTouchCancel ? 'onTouchCancel' : null } onTouchEnd={onTouchEnd ? 'onTouchEnd' : null } onTap={onTap ? 'onTap' : null } onLongPress={onLongPress ? 'onLongPress' : null } onLongTap={onLongTap ? 'onLongTap' : null } onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null } onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null } onAnimationStart={onAnimationStart ? 'onAnimationStart' : null } onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null } onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null } child={child} innerText={innerText} uuid={uuid} parent={parent} style={style} className={className} hoverClass={hoverClass} hoverStopPropagation={hoverStopPropagation} hoverStartTime={hoverStartTime} hoverStayTime={hoverStayTime} >
        {this.props.children}
      </view>
    );
  }
}

export default RemixView;
