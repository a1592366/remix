import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

import EventHandle from '../EventHandle';

class RemixEditor extends EventHandle {
  static propTypes = {
    uuid: PropTypes.string,
		parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		readOnly: PropTypes.boolean,
		placeholder: PropTypes.string,
		showImgSize: PropTypes.boolean,
		showImgToolbar: PropTypes.boolean,
		showImgResize: PropTypes.boolean,
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
		onFocus: PropTypes.string,
		onBlur: PropTypes.string,
		onInput: PropTypes.string,
		onReady: PropTypes.string,
		onStatusChange: PropTypes.string
  }

  static defaultProps = {
    uuid: null,
		parent: null,
		style: null,
		className: null,
		readOnly: false,
		placeholder: null,
		showImgSize: false,
		showImgToolbar: false,
		showImgResize: false,
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
		onFocus: null,
		onBlur: null,
		onInput: null,
		onReady: null,
		onStatusChange: null
  }

  render () {
    const {
      uuid,
			parent,
			style,
			className,
			readOnly,
			placeholder,
			showImgSize,
			showImgToolbar,
			showImgResize,
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
			onFocus,
			onBlur,
			onInput,
			onReady,
			onStatusChange
    } = this.props;

    return (
      <editor onTouchStart={onTouchStart ? 'onTouchStart' : null } onTouchMove={onTouchMove ? 'onTouchMove' : null } onTouchCancel={onTouchCancel ? 'onTouchCancel' : null } onTouchEnd={onTouchEnd ? 'onTouchEnd' : null } onTap={onTap ? 'onTap' : null } onLongPress={onLongPress ? 'onLongPress' : null } onLongTap={onLongTap ? 'onLongTap' : null } onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null } onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null } onAnimationStart={onAnimationStart ? 'onAnimationStart' : null } onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null } onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null } onFocus={onFocus ? 'onFocus' : null } onBlur={onBlur ? 'onBlur' : null } onInput={onInput ? 'onInput' : null } onReady={onReady ? 'onReady' : null } onStatusChange={onStatusChange ? 'onStatusChange' : null } uuid={uuid} parent={parent} style={style} className={className} readOnly={readOnly} placeholder={placeholder} showImgSize={showImgSize} showImgToolbar={showImgToolbar} showImgResize={showImgResize} >
        {this.props.children}
      </editor>
    );
  }
}

export default RemixEditor;
