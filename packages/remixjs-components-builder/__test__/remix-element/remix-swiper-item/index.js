import React from '../../../react';
import PropTypes from '../../../react/PropTypes';


export default class RemixSwiperItem extends React.Component {
  
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
		parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		itemId: PropTypes.string,
		
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
		parent: null,
		style: null,
		className: null,
		itemId: null,
		
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

  render () {
    const { onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTouchForceChange, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, parent, style, className, itemId } = this.props;

    return <swiper-item onTouchStart={onTouchStart ? 'onTouchStart' : ''} onTouchMove={onTouchMove ? 'onTouchMove' : ''} onTouchCancel={onTouchCancel ? 'onTouchCancel' : ''} onTouchEnd={onTouchEnd ? 'onTouchEnd' : ''} onTap={onTap ? 'onTap' : ''} onLongPress={onLongPress ? 'onLongPress' : ''} onLongTap={onLongTap ? 'onLongTap' : ''} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : ''} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : ''} onAnimationStart={onAnimationStart ? 'onAnimationStart' : ''} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : ''} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : ''} parent={parent} style={style} className={className} itemId={itemId}>{this.props.children}</swiper-item>;
  }
}


