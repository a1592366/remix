import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

import EventHandle from '../EventHandle';

class RemixSwiper extends EventHandle {
  static propTypes = {
    child: PropTypes.object,
		innerText: PropTypes.string,
		uuid: PropTypes.string,
		parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		indicatorDots: PropTypes.boolean,
		indicatorColor: PropTypes.string,
		indicatorActiveColor: PropTypes.string,
		autoplay: PropTypes.boolean,
		current: PropTypes.number,
		interval: PropTypes.number,
		duration: PropTypes.number,
		circular: PropTypes.boolean,
		vertical: PropTypes.boolean,
		previousMargin: PropTypes.string,
		nextMargin: PropTypes.string,
		displayMultipleItems: PropTypes.number,
		skipHiddenItemLayou: PropTypes.boolean,
		easingFunction: PropTypes.string,
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
		onAnimationEnd: PropTypes.string,
		onChange: PropTypes.string,
		onAnimationFinish: PropTypes.string
  }

  static defaultProps = {
    child: null,
		innerText: null,
		uuid: null,
		parent: null,
		style: null,
		className: null,
		indicatorDots: false,
		indicatorColor: 'rgba(0, 0, 0, .3)',
		indicatorActiveColor: '#000000',
		autoplay: false,
		current: 0,
		interval: 5000,
		duration: 500,
		circular: false,
		vertical: false,
		previousMargin: '0px',
		nextMargin: '0px',
		displayMultipleItems: 1,
		skipHiddenItemLayou: false,
		easingFunction: 'default',
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
		onAnimationEnd: null,
		onChange: null,
		onAnimationFinish: null
  }

  render () {
    const {
      child,
			innerText,
			uuid,
			parent,
			style,
			className,
			indicatorDots,
			indicatorColor,
			indicatorActiveColor,
			autoplay,
			current,
			interval,
			duration,
			circular,
			vertical,
			previousMargin,
			nextMargin,
			displayMultipleItems,
			skipHiddenItemLayou,
			easingFunction,
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
			onAnimationEnd,
			onChange,
			onAnimationFinish
    } = this.props;

    return (
      <swiper onTouchStart={onTouchStart ? 'onTouchStart' : null } onTouchMove={onTouchMove ? 'onTouchMove' : null } onTouchCancel={onTouchCancel ? 'onTouchCancel' : null } onTouchEnd={onTouchEnd ? 'onTouchEnd' : null } onTap={onTap ? 'onTap' : null } onLongPress={onLongPress ? 'onLongPress' : null } onLongTap={onLongTap ? 'onLongTap' : null } onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null } onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null } onAnimationStart={onAnimationStart ? 'onAnimationStart' : null } onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null } onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null } onChange={onChange ? 'onChange' : null } onAnimationFinish={onAnimationFinish ? 'onAnimationFinish' : null } child={child} innerText={innerText} uuid={uuid} parent={parent} style={style} className={className} indicatorDots={indicatorDots} indicatorColor={indicatorColor} indicatorActiveColor={indicatorActiveColor} autoplay={autoplay} current={current} interval={interval} duration={duration} circular={circular} vertical={vertical} previousMargin={previousMargin} nextMargin={nextMargin} displayMultipleItems={displayMultipleItems} skipHiddenItemLayou={skipHiddenItemLayou} easingFunction={easingFunction} >
        {this.props.children}
      </swiper>
    );
  }
}

export default RemixSwiper;
