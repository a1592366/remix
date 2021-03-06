import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

import EventHandle from '../EventHandle';

class RemixTextarea extends EventHandle {
  static propTypes = {
    uuid: PropTypes.string,
		parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		value: PropTypes.string,
		placeholder: PropTypes.string,
		placeholderStyle: PropTypes.string,
		placeholderClass: PropTypes.string,
		disabled: PropTypes.boolean,
		maxlength: PropTypes.number,
		autoFocus: PropTypes.boolean,
		focus: PropTypes.boolean,
		autoHeight: PropTypes.boolean,
		fixed: PropTypes.boolean,
		cursorSpacing: PropTypes.number,
		cursor: PropTypes.number,
		showConfirmBar: PropTypes.boolean,
		selectionStart: PropTypes.number,
		selectionEnd: PropTypes.number,
		adjustPosition: PropTypes.boolean,
		holdKeyboard: PropTypes.boolean,
		disableDefaultPadding: PropTypes.boolean,
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
		onLineChange: PropTypes.string,
		onInput: PropTypes.string,
		onConfirm: PropTypes.string,
		onKeyboardHeightChange: PropTypes.string
  }

  static defaultProps = {
    uuid: null,
		parent: null,
		style: null,
		className: null,
		value: null,
		placeholder: null,
		placeholderStyle: null,
		placeholderClass: 'input-placeholder',
		disabled: false,
		maxlength: 140,
		autoFocus: false,
		focus: false,
		autoHeight: false,
		fixed: false,
		cursorSpacing: 0,
		cursor: 0,
		showConfirmBar: false,
		selectionStart: -1,
		selectionEnd: -1,
		adjustPosition: true,
		holdKeyboard: false,
		disableDefaultPadding: false,
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
		onLineChange: null,
		onInput: null,
		onConfirm: null,
		onKeyboardHeightChange: null
  }

  render () {
    const {
      uuid,
			parent,
			style,
			className,
			value,
			placeholder,
			placeholderStyle,
			placeholderClass,
			disabled,
			maxlength,
			autoFocus,
			focus,
			autoHeight,
			fixed,
			cursorSpacing,
			cursor,
			showConfirmBar,
			selectionStart,
			selectionEnd,
			adjustPosition,
			holdKeyboard,
			disableDefaultPadding,
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
			onLineChange,
			onInput,
			onConfirm,
			onKeyboardHeightChange
    } = this.props;

    return (
      <textarea onTouchStart={onTouchStart ? 'onTouchStart' : null } onTouchMove={onTouchMove ? 'onTouchMove' : null } onTouchCancel={onTouchCancel ? 'onTouchCancel' : null } onTouchEnd={onTouchEnd ? 'onTouchEnd' : null } onTap={onTap ? 'onTap' : null } onLongPress={onLongPress ? 'onLongPress' : null } onLongTap={onLongTap ? 'onLongTap' : null } onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null } onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null } onAnimationStart={onAnimationStart ? 'onAnimationStart' : null } onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null } onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null } onFocus={onFocus ? 'onFocus' : null } onBlur={onBlur ? 'onBlur' : null } onLineChange={onLineChange ? 'onLineChange' : null } onInput={onInput ? 'onInput' : null } onConfirm={onConfirm ? 'onConfirm' : null } onKeyboardHeightChange={onKeyboardHeightChange ? 'onKeyboardHeightChange' : null } uuid={uuid} parent={parent} style={style} className={className} value={value} placeholder={placeholder} placeholderStyle={placeholderStyle} placeholderClass={placeholderClass} disabled={disabled} maxlength={maxlength} autoFocus={autoFocus} focus={focus} autoHeight={autoHeight} fixed={fixed} cursorSpacing={cursorSpacing} cursor={cursor} showConfirmBar={showConfirmBar} selectionStart={selectionStart} selectionEnd={selectionEnd} adjustPosition={adjustPosition} holdKeyboard={holdKeyboard} disableDefaultPadding={disableDefaultPadding} >
        {this.props.children}
      </textarea>
    );
  }
}

export default RemixTextarea;
