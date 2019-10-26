import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

export default class RemixInput extends React.Component {
  static propTypes = {
    uuid: PropTypes.string,
		style: PropTypes.object,
		className: PropTypes.string,
		onInput: PropTypes.event,
		onFocus: PropTypes.event,
		onBlur: PropTypes.event,
		onConfirm: PropTypes.event,
		onKeyboardHeightChange: PropTypes.event,
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
    uuid: null,
		style: null,
		className: null,
		onInput: null,
		onFocus: null,
		onBlur: null,
		onConfirm: null,
		onKeyboardHeightChange: null,
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
    const { uuid, style, className, onInput, onFocus, onBlur, onConfirm, onKeyboardHeightChange, value, type, password, placeholder, placeholderStyle, placeholderClass, disabled, maxlength, cursorSpacing, autoFocus, focus, confirmType, confirmHold, cursor, selectionStart, selectionEnd, adjustPosition, holdKeyboard } = this.props;

    return <input uuid={uuid} style={style} className={className} onInput={onInput ? 'onInput' : null} onFocus={onFocus ? 'onFocus' : null} onBlur={onBlur ? 'onBlur' : null} onConfirm={onConfirm ? 'onConfirm' : null} onKeyboardHeightChange={onKeyboardHeightChange ? 'onKeyboardHeightChange' : null} value={value} type={type} password={password} placeholder={placeholder} placeholderStyle={placeholderStyle} placeholderClass={placeholderClass} disabled={disabled} maxlength={maxlength} cursorSpacing={cursorSpacing} autoFocus={autoFocus} focus={focus} confirmType={confirmType} confirmHold={confirmHold} cursor={cursor} selectionStart={selectionStart} selectionEnd={selectionEnd} adjustPosition={adjustPosition} holdKeyboard={holdKeyboard}></input>;
  }
}


