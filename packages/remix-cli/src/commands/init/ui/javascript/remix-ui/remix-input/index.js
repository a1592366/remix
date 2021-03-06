import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

import EventHandle from '../EventHandle';

class RemixInput extends EventHandle {
  static propTypes = {
    uuid: PropTypes.string,
		parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		value: PropTypes.string,
		type: PropTypes.string,
		password: PropTypes.boolean,
		placeholder: PropTypes.string,
		placeholderStyle: PropTypes.string,
		placeholderClass: PropTypes.string,
		disabled: PropTypes.boolean,
		maxlength: PropTypes.number,
		cursorSpacing: PropTypes.number,
		autoFocus: PropTypes.boolean,
		focus: PropTypes.boolean,
		confirmType: PropTypes.string,
		confirmHold: PropTypes.boolean,
		cursor: PropTypes.number,
		selectionStart: PropTypes.number,
		selectionEnd: PropTypes.number,
		adjustPosition: PropTypes.boolean,
		holdKeyboard: PropTypes.boolean,
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
		onInput: PropTypes.string,
		onFocus: PropTypes.string,
		onBlur: PropTypes.string,
		onConfirm: PropTypes.string,
		onKeyboardHeightChange: PropTypes.string
  }

  static defaultProps = {
    uuid: null,
		parent: null,
		style: null,
		className: null,
		value: null,
		type: 'text',
		password: false,
		placeholder: null,
		placeholderStyle: null,
		placeholderClass: 'input-placeholder',
		disabled: false,
		maxlength: 140,
		cursorSpacing: 0,
		autoFocus: false,
		focus: false,
		confirmType: 'done',
		confirmHold: false,
		cursor: 0,
		selectionStart: -1,
		selectionEnd: -1,
		adjustPosition: true,
		holdKeyboard: false,
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
		onInput: null,
		onFocus: null,
		onBlur: null,
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
			type,
			password,
			placeholder,
			placeholderStyle,
			placeholderClass,
			disabled,
			maxlength,
			cursorSpacing,
			autoFocus,
			focus,
			confirmType,
			confirmHold,
			cursor,
			selectionStart,
			selectionEnd,
			adjustPosition,
			holdKeyboard,
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
			onInput,
			onFocus,
			onBlur,
			onConfirm,
			onKeyboardHeightChange
    } = this.props;

    return (
      <input onTouchStart={onTouchStart ? 'onTouchStart' : null } onTouchMove={onTouchMove ? 'onTouchMove' : null } onTouchCancel={onTouchCancel ? 'onTouchCancel' : null } onTouchEnd={onTouchEnd ? 'onTouchEnd' : null } onTap={onTap ? 'onTap' : null } onLongPress={onLongPress ? 'onLongPress' : null } onLongTap={onLongTap ? 'onLongTap' : null } onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null } onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null } onAnimationStart={onAnimationStart ? 'onAnimationStart' : null } onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null } onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null } onInput={onInput ? 'onInput' : null } onFocus={onFocus ? 'onFocus' : null } onBlur={onBlur ? 'onBlur' : null } onConfirm={onConfirm ? 'onConfirm' : null } onKeyboardHeightChange={onKeyboardHeightChange ? 'onKeyboardHeightChange' : null } uuid={uuid} parent={parent} style={style} className={className} value={value} type={type} password={password} placeholder={placeholder} placeholderStyle={placeholderStyle} placeholderClass={placeholderClass} disabled={disabled} maxlength={maxlength} cursorSpacing={cursorSpacing} autoFocus={autoFocus} focus={focus} confirmType={confirmType} confirmHold={confirmHold} cursor={cursor} selectionStart={selectionStart} selectionEnd={selectionEnd} adjustPosition={adjustPosition} holdKeyboard={holdKeyboard} >
        {this.props.children}
      </input>
    );
  }
}

export default RemixInput;
