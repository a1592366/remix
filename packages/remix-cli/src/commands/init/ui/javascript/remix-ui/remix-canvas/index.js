import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

import EventHandle from '../EventHandle';

class RemixCanvas extends EventHandle {
  static propTypes = {
    uuid: PropTypes.string,
		parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		type: PropTypes.string,
		canvasId: PropTypes.string,
		webp: PropTypes.boolean,
		disableScroll: PropTypes.boolean,
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
    uuid: null,
		parent: null,
		style: null,
		className: null,
		type: '2d',
		canvasId: null,
		webp: false,
		disableScroll: false,
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
      uuid,
			parent,
			style,
			className,
			type,
			canvasId,
			webp,
			disableScroll,
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
      <canvas onTouchStart={onTouchStart ? 'onTouchStart' : null } onTouchMove={onTouchMove ? 'onTouchMove' : null } onTouchCancel={onTouchCancel ? 'onTouchCancel' : null } onTouchEnd={onTouchEnd ? 'onTouchEnd' : null } onTap={onTap ? 'onTap' : null } onLongPress={onLongPress ? 'onLongPress' : null } onLongTap={onLongTap ? 'onLongTap' : null } onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null } onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null } onAnimationStart={onAnimationStart ? 'onAnimationStart' : null } onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null } onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null } uuid={uuid} parent={parent} style={style} className={className} type={type} canvasId={canvasId} webp={webp} disableScroll={disableScroll} >
        {this.props.children}
      </canvas>
    );
  }
}

export default RemixCanvas;
