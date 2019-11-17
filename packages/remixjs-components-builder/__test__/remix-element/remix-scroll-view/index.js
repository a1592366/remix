import React from '../../../react';
import PropTypes from '../../../react/PropTypes';


export default class RemixScrollView extends React.Component {
  
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
		onScrollToUpper: PropTypes.string,
		onScrollToLower: PropTypes.string,
		onScroll: PropTypes.string,
		parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		scrollX: PropTypes.bool,
		scrollY: PropTypes.bool,
		upperThreshold: PropTypes.number,
		lowerThreshold: PropTypes.number,
		scrollTop: PropTypes.number,
		scrollLeft: PropTypes.number,
		scrollIntoView: PropTypes.string,
		scrollWithAnimation: PropTypes.bool,
		enableBackToTop: PropTypes.bool,
		enableFlex: PropTypes.bool,
		scrollAnchoring: PropTypes.bool,
		
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
		onScrollToUpper: null,
		onScrollToLower: null,
		onScroll: null,
		parent: null,
		style: null,
		className: null,
		scrollX: false,
		scrollY: false,
		upperThreshold: 50,
		lowerThreshold: 50,
		scrollTop: null,
		scrollLeft: null,
		scrollIntoView: null,
		scrollWithAnimation: false,
		enableBackToTop: false,
		enableFlex: false,
		scrollAnchoring: false,
		
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

	onScrollToUpper (e) { 
		const { onScrollToUpper } = this.props;
		if (typeof onScrollToUpper === 'function') { onScrollToUpper(e); } 
	}

	onScrollToLower (e) { 
		const { onScrollToLower } = this.props;
		if (typeof onScrollToLower === 'function') { onScrollToLower(e); } 
	}

	onScroll (e) { 
		const { onScroll } = this.props;
		if (typeof onScroll === 'function') { onScroll(e); } 
	}

  render () {
    const { onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTouchForceChange, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, onScrollToUpper, onScrollToLower, onScroll, parent, style, className, scrollX, scrollY, upperThreshold, lowerThreshold, scrollTop, scrollLeft, scrollIntoView, scrollWithAnimation, enableBackToTop, enableFlex, scrollAnchoring } = this.props;

    return <scroll-view onTouchStart={onTouchStart ? 'onTouchStart' : ''} onTouchMove={onTouchMove ? 'onTouchMove' : ''} onTouchCancel={onTouchCancel ? 'onTouchCancel' : ''} onTouchEnd={onTouchEnd ? 'onTouchEnd' : ''} onTap={onTap ? 'onTap' : ''} onLongPress={onLongPress ? 'onLongPress' : ''} onLongTap={onLongTap ? 'onLongTap' : ''} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : ''} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : ''} onAnimationStart={onAnimationStart ? 'onAnimationStart' : ''} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : ''} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : ''} onScrollToUpper={onScrollToUpper ? 'onScrollToUpper' : ''} onScrollToLower={onScrollToLower ? 'onScrollToLower' : ''} onScroll={onScroll ? 'onScroll' : ''} parent={parent} style={style} className={className} scrollX={scrollX} scrollY={scrollY} upperThreshold={upperThreshold} lowerThreshold={lowerThreshold} scrollTop={scrollTop} scrollLeft={scrollLeft} scrollIntoView={scrollIntoView} scrollWithAnimation={scrollWithAnimation} enableBackToTop={enableBackToTop} enableFlex={enableFlex} scrollAnchoring={scrollAnchoring}>{this.props.children}</scroll-view>;
  }
}


