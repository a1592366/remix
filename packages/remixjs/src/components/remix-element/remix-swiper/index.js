import React from '../../../react';
import PropTypes from '../../../react/PropTypes';
import SwiperItem from '../remix-swiper-item/index';

export default class RemixSwiper extends React.Component {
  static SwiperItem = SwiperItem; 
  static propTypes = {
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
		onAnimationFinish: PropTypes.string,
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
		onAnimationFinish: null,
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

  onTouchStart (e) { 
		const { onTouchStart } = this.props;
		if (typeof onTouchStart === 'function') { onTouchStart(e); } 
	}

	onTouchMove (e) { 
		const { onTouchMove } = this.props;
		if (typeof onTouchMove === 'function') { onTouchMove(e); } 
	}

	onTouchCancel (e) { 
		const { onTouchCancel } = this.props;
		if (typeof onTouchCancel === 'function') { onTouchCancel(e); } 
	}

	onTouchEnd (e) { 
		const { onTouchEnd } = this.props;
		if (typeof onTouchEnd === 'function') { onTouchEnd(e); } 
	}

	onTap (e) { 
		const { onTap } = this.props;
		if (typeof onTap === 'function') { onTap(e); } 
	}

	onLongPress (e) { 
		const { onLongPress } = this.props;
		if (typeof onLongPress === 'function') { onLongPress(e); } 
	}

	onLongTap (e) { 
		const { onLongTap } = this.props;
		if (typeof onLongTap === 'function') { onLongTap(e); } 
	}

	onTouchForceChange (e) { 
		const { onTouchForceChange } = this.props;
		if (typeof onTouchForceChange === 'function') { onTouchForceChange(e); } 
	}

	onTransitionEnd (e) { 
		const { onTransitionEnd } = this.props;
		if (typeof onTransitionEnd === 'function') { onTransitionEnd(e); } 
	}

	onAnimationStart (e) { 
		const { onAnimationStart } = this.props;
		if (typeof onAnimationStart === 'function') { onAnimationStart(e); } 
	}

	onAnimationIteration (e) { 
		const { onAnimationIteration } = this.props;
		if (typeof onAnimationIteration === 'function') { onAnimationIteration(e); } 
	}

	onAnimationEnd (e) { 
		const { onAnimationEnd } = this.props;
		if (typeof onAnimationEnd === 'function') { onAnimationEnd(e); } 
	}

	onChange (e) { 
		const { onChange } = this.props;
		if (typeof onChange === 'function') { onChange(e); } 
	}

	onAnimationFinish (e) { 
		const { onAnimationFinish } = this.props;
		if (typeof onAnimationFinish === 'function') { onAnimationFinish(e); } 
	}

  render () {
    const { onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTouchForceChange, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, onChange, onAnimationFinish, style, className, indicatorDots, indicatorColor, indicatorActiveColor, autoplay, current, interval, duration, circular, vertical, previousMargin, nextMargin, displayMultipleItems, skipHiddenItemLayou, easingFunction } = this.props;

    return <swiper onTouchStart={onTouchStart ? 'onTouchStart' : null} onTouchMove={onTouchMove ? 'onTouchMove' : null} onTouchCancel={onTouchCancel ? 'onTouchCancel' : null} onTouchEnd={onTouchEnd ? 'onTouchEnd' : null} onTap={onTap ? 'onTap' : null} onLongPress={onLongPress ? 'onLongPress' : null} onLongTap={onLongTap ? 'onLongTap' : null} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null} onAnimationStart={onAnimationStart ? 'onAnimationStart' : null} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null} onChange={onChange ? 'onChange' : null} onAnimationFinish={onAnimationFinish ? 'onAnimationFinish' : null} style={style} className={className} indicatorDots={indicatorDots} indicatorColor={indicatorColor} indicatorActiveColor={indicatorActiveColor} autoplay={autoplay} current={current} interval={interval} duration={duration} circular={circular} vertical={vertical} previousMargin={previousMargin} nextMargin={nextMargin} displayMultipleItems={displayMultipleItems} skipHiddenItemLayou={skipHiddenItemLayou} easingFunction={easingFunction}>{this.props.children}</swiper>;
  }
}


