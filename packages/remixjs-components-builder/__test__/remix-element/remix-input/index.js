import React from '../../../react';
import PropTypes from '../../../react/PropTypes';


export default class RemixInput extends React.Component {
  
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
		onInput: PropTypes.string,
		onFocus: PropTypes.string,
		onBlur: PropTypes.string,
		onConfirm: PropTypes.string,
		onKeyboardHeightChange: PropTypes.string,
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
		onKeyboardHeightChange: null,
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

	onInput (e) { 
		const { onInput } = this.props;
		if (typeof onInput === 'function') { onInput(e); } 
	}

	onFocus (e) { 
		const { onFocus } = this.props;
		if (typeof onFocus === 'function') { onFocus(e); } 
	}

	onBlur (e) { 
		const { onBlur } = this.props;
		if (typeof onBlur === 'function') { onBlur(e); } 
	}

	onConfirm (e) { 
		const { onConfirm } = this.props;
		if (typeof onConfirm === 'function') { onConfirm(e); } 
	}

	onKeyboardHeightChange (e) { 
		const { onKeyboardHeightChange } = this.props;
		if (typeof onKeyboardHeightChange === 'function') { onKeyboardHeightChange(e); } 
	}

  render () {
    const { onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTouchForceChange, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, onInput, onFocus, onBlur, onConfirm, onKeyboardHeightChange, style, className, value, type, password, placeholder, placeholderStyle, placeholderClass, disabled, maxlength, cursorSpacing, autoFocus, focus, confirmType, confirmHold, cursor, selectionStart, selectionEnd, adjustPosition, holdKeyboard } = this.props;

    return <input onTouchStart={onTouchStart ? 'onTouchStart' : null} onTouchMove={onTouchMove ? 'onTouchMove' : null} onTouchCancel={onTouchCancel ? 'onTouchCancel' : null} onTouchEnd={onTouchEnd ? 'onTouchEnd' : null} onTap={onTap ? 'onTap' : null} onLongPress={onLongPress ? 'onLongPress' : null} onLongTap={onLongTap ? 'onLongTap' : null} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null} onAnimationStart={onAnimationStart ? 'onAnimationStart' : null} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null} onInput={onInput ? 'onInput' : null} onFocus={onFocus ? 'onFocus' : null} onBlur={onBlur ? 'onBlur' : null} onConfirm={onConfirm ? 'onConfirm' : null} onKeyboardHeightChange={onKeyboardHeightChange ? 'onKeyboardHeightChange' : null} style={style} className={className} value={value} type={type} password={password} placeholder={placeholder} placeholderStyle={placeholderStyle} placeholderClass={placeholderClass} disabled={disabled} maxlength={maxlength} cursorSpacing={cursorSpacing} autoFocus={autoFocus} focus={focus} confirmType={confirmType} confirmHold={confirmHold} cursor={cursor} selectionStart={selectionStart} selectionEnd={selectionEnd} adjustPosition={adjustPosition} holdKeyboard={holdKeyboard}></input>;
  }
}


