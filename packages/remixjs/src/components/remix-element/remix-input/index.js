import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

export default class RemixInput extends React.Component {
  static propTypes = {
    onInput: PropTypes.string,
		onFocus: PropTypes.string,
		onBlur: PropTypes.string,
		onConfirm: PropTypes.string,
		onKeyboardHeightChange: PropTypes.string,
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
		value: PropTypes.string,
		type: PropTypes.string,
		password: PropTypes.bool,
		placeholder: PropTypes.string,
		placeholderStyle: PropTypes.string,
		placeholderClass: PropTypes.string,
		disabled: PropTypes.bool,
		maxlength: PropTypes.number,
		cursorSpacing: PropTypes.number,
		autoFocus: PropTypes.bool,
		focus: PropTypes.bool,
		confirmType: PropTypes.string,
		confirmHold: PropTypes.bool,
		cursor: PropTypes.number,
		selectionStart: PropTypes.number,
		selectionEnd: PropTypes.number,
		adjustPosition: PropTypes.bool,
		holdKeyboard: PropTypes.bool,
		
  };

  static defaultProps = {
    onInput: null,
		onFocus: null,
		onBlur: null,
		onConfirm: null,
		onKeyboardHeightChange: null,
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
		
  };

  render () {
    const { onInput, onFocus, onBlur, onConfirm, onKeyboardHeightChange, onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, onTouchForceChange, style, className, value, type, password, placeholder, placeholderStyle, placeholderClass, disabled, maxlength, cursorSpacing, autoFocus, focus, confirmType, confirmHold, cursor, selectionStart, selectionEnd, adjustPosition, holdKeyboard } = this.props;

    return <input onInput={onInput ? 'onInput' : null} onFocus={onFocus ? 'onFocus' : null} onBlur={onBlur ? 'onBlur' : null} onConfirm={onConfirm ? 'onConfirm' : null} onKeyboardHeightChange={onKeyboardHeightChange ? 'onKeyboardHeightChange' : null} onTouchStart={onTouchStart ? 'onTouchStart' : null} onTouchMove={onTouchMove ? 'onTouchMove' : null} onTouchCancel={onTouchCancel ? 'onTouchCancel' : null} onTouchEnd={onTouchEnd ? 'onTouchEnd' : null} onTap={onTap ? 'onTap' : null} onLongPress={onLongPress ? 'onLongPress' : null} onLongTap={onLongTap ? 'onLongTap' : null} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null} onAnimationStart={onAnimationStart ? 'onAnimationStart' : null} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null} style={style} className={className} value={value} type={type} password={password} placeholder={placeholder} placeholderStyle={placeholderStyle} placeholderClass={placeholderClass} disabled={disabled} maxlength={maxlength} cursorSpacing={cursorSpacing} autoFocus={autoFocus} focus={focus} confirmType={confirmType} confirmHold={confirmHold} cursor={cursor} selectionStart={selectionStart} selectionEnd={selectionEnd} adjustPosition={adjustPosition} holdKeyboard={holdKeyboard}></input>;
  }
}


