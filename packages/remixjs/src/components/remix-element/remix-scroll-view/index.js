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
		onTransitionEnd: PropTypes.string,
		onAnimationStart: PropTypes.string,
		onAnimationIteration: PropTypes.string,
		onAnimationEnd: PropTypes.string,
		onTouchForceChange: PropTypes.string,
		onScrollToUpper: PropTypes.string,
		onScrollToLower: PropTypes.string,
		onScroll: PropTypes.string,
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
		onTransitionEnd: null,
		onAnimationStart: null,
		onAnimationIteration: null,
		onAnimationEnd: null,
		onTouchForceChange: null,
		onScrollToUpper: null,
		onScrollToLower: null,
		onScroll: null,
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

  render () {
    const { onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, onTouchForceChange, onScrollToUpper, onScrollToLower, onScroll, style, className, scrollX, scrollY, upperThreshold, lowerThreshold, scrollTop, scrollLeft, scrollIntoView, scrollWithAnimation, enableBackToTop, enableFlex, scrollAnchoring } = this.props;

    return <scroll-view onTouchStart={onTouchStart ? 'onTouchStart' : null} onTouchMove={onTouchMove ? 'onTouchMove' : null} onTouchCancel={onTouchCancel ? 'onTouchCancel' : null} onTouchEnd={onTouchEnd ? 'onTouchEnd' : null} onTap={onTap ? 'onTap' : null} onLongPress={onLongPress ? 'onLongPress' : null} onLongTap={onLongTap ? 'onLongTap' : null} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null} onAnimationStart={onAnimationStart ? 'onAnimationStart' : null} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null} onScrollToUpper={onScrollToUpper ? 'onScrollToUpper' : null} onScrollToLower={onScrollToLower ? 'onScrollToLower' : null} onScroll={onScroll ? 'onScroll' : null} style={style} className={className} scrollX={scrollX} scrollY={scrollY} upperThreshold={upperThreshold} lowerThreshold={lowerThreshold} scrollTop={scrollTop} scrollLeft={scrollLeft} scrollIntoView={scrollIntoView} scrollWithAnimation={scrollWithAnimation} enableBackToTop={enableBackToTop} enableFlex={enableFlex} scrollAnchoring={scrollAnchoring}>{this.props.children}</scroll-view>;
  }
}


