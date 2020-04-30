import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

import EventHandle from '../EventHandle';

class RemixScrollView extends EventHandle {
  static propTypes = {
    child: PropTypes.object,
		innerText: PropTypes.string,
		uuid: PropTypes.string,
		parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		scrollX: PropTypes.boolean,
		scrollY: PropTypes.boolean,
		upperThreshold: PropTypes.number,
		lowerThreshold: PropTypes.number,
		scrollTop: PropTypes.number,
		scrollLeft: PropTypes.number,
		scrollIntoView: PropTypes.string,
		scrollWithAnimation: PropTypes.boolean,
		enableBackToTop: PropTypes.boolean,
		enableFlex: PropTypes.boolean,
		scrollAnchoring: PropTypes.boolean,
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
		onScroll: PropTypes.string
  }

  static defaultProps = {
    child: null,
		innerText: null,
		uuid: null,
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
		onScroll: null
  }

  render () {
    const {
      child,
			innerText,
			uuid,
			parent,
			style,
			className,
			scrollX,
			scrollY,
			upperThreshold,
			lowerThreshold,
			scrollTop,
			scrollLeft,
			scrollIntoView,
			scrollWithAnimation,
			enableBackToTop,
			enableFlex,
			scrollAnchoring,
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
			onScrollToUpper,
			onScrollToLower,
			onScroll
    } = this.props;

    return (
      <scroll-view onTouchStart={onTouchStart ? 'onTouchStart' : null } onTouchMove={onTouchMove ? 'onTouchMove' : null } onTouchCancel={onTouchCancel ? 'onTouchCancel' : null } onTouchEnd={onTouchEnd ? 'onTouchEnd' : null } onTap={onTap ? 'onTap' : null } onLongPress={onLongPress ? 'onLongPress' : null } onLongTap={onLongTap ? 'onLongTap' : null } onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null } onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null } onAnimationStart={onAnimationStart ? 'onAnimationStart' : null } onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null } onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null } onScrollToUpper={onScrollToUpper ? 'onScrollToUpper' : null } onScrollToLower={onScrollToLower ? 'onScrollToLower' : null } onScroll={onScroll ? 'onScroll' : null } child={child} innerText={innerText} uuid={uuid} parent={parent} style={style} className={className} scrollX={scrollX} scrollY={scrollY} upperThreshold={upperThreshold} lowerThreshold={lowerThreshold} scrollTop={scrollTop} scrollLeft={scrollLeft} scrollIntoView={scrollIntoView} scrollWithAnimation={scrollWithAnimation} enableBackToTop={enableBackToTop} enableFlex={enableFlex} scrollAnchoring={scrollAnchoring} >
        {this.props.children}
      </scroll-view>
    );
  }
}

export default RemixScrollView;
