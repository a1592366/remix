import React from '../../../react';
import PropTypes from '../../../react/PropTypes';
import SwiperItem from '../remix-swiper-item/index';

export default class RemixSwiper extends React.Component {
  static SwiperItem = SwiperItem; 
  static propTypes = {
    onChange: PropTypes.string,
		onAnimationFinish: PropTypes.string,
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
		indicatorDots: PropTypes.bool,
		indicatorColor: PropTypes.string,
		indicatorActiveColor: PropTypes.string,
		autoplay: PropTypes.bool,
		current: PropTypes.number,
		interval: PropTypes.number,
		duration: PropTypes.number,
		circular: PropTypes.bool,
		vertical: PropTypes.bool,
		previousMargin: PropTypes.string,
		nextMargin: PropTypes.string,
		displayMultipleItems: PropTypes.number,
		skipHiddenItemLayou: PropTypes.bool,
		easingFunction: PropTypes.string,
		
  };

  static defaultProps = {
    onChange: null,
		onAnimationFinish: null,
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
		
  };

  render () {
    const { onChange, onAnimationFinish, onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, onTouchForceChange, style, className, indicatorDots, indicatorColor, indicatorActiveColor, autoplay, current, interval, duration, circular, vertical, previousMargin, nextMargin, displayMultipleItems, skipHiddenItemLayou, easingFunction } = this.props;

    return <swiper onChange={onChange ? 'onChange' : null} onAnimationFinish={onAnimationFinish ? 'onAnimationFinish' : null} onTouchStart={onTouchStart ? 'onTouchStart' : null} onTouchMove={onTouchMove ? 'onTouchMove' : null} onTouchCancel={onTouchCancel ? 'onTouchCancel' : null} onTouchEnd={onTouchEnd ? 'onTouchEnd' : null} onTap={onTap ? 'onTap' : null} onLongPress={onLongPress ? 'onLongPress' : null} onLongTap={onLongTap ? 'onLongTap' : null} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null} onAnimationStart={onAnimationStart ? 'onAnimationStart' : null} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null} style={style} className={className} indicatorDots={indicatorDots} indicatorColor={indicatorColor} indicatorActiveColor={indicatorActiveColor} autoplay={autoplay} current={current} interval={interval} duration={duration} circular={circular} vertical={vertical} previousMargin={previousMargin} nextMargin={nextMargin} displayMultipleItems={displayMultipleItems} skipHiddenItemLayou={skipHiddenItemLayou} easingFunction={easingFunction}>{this.props.children}</swiper>;
  }
}


