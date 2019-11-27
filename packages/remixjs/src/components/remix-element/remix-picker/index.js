import React from '../../../renderer';
import PropTypes from '../../../react/PropTypes';


export default class RemixPicker extends React.Component {
  
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
		onCancel: PropTypes.string,
		onError: PropTypes.string,
		onChange: PropTypes.string,
		onColumnChange: PropTypes.string,
		parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		mode: PropTypes.string,
		disabled: PropTypes.bool,
		range: PropTypes.object,
		rangeKey: PropTypes.string,
		value: PropTypes.number,
		start: PropTypes.string,
		end: PropTypes.string,
		fields: PropTypes.string,
		customItem: PropTypes.string,
		
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
		onCancel: null,
		onError: null,
		onChange: null,
		onColumnChange: null,
		parent: null,
		style: null,
		className: null,
		mode: 'selector',
		disabled: false,
		range: [],
		rangeKey: null,
		value: 0,
		start: null,
		end: null,
		fields: 'day',
		customItem: null,
		
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

	onCancel (e) { 
		const { onCancel } = this.props;
		if (typeof onCancel === 'function') { onCancel(e); } 
	}

	onError (e) { 
		const { onError } = this.props;
		if (typeof onError === 'function') { onError(e); } 
	}

	onChange (e) { 
		const { onChange } = this.props;
		if (typeof onChange === 'function') { onChange(e); } 
	}

	onColumnChange (e) { 
		const { onColumnChange } = this.props;
		if (typeof onColumnChange === 'function') { onColumnChange(e); } 
	}

  render () {
    const { onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTouchForceChange, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, onCancel, onError, onChange, onColumnChange, parent, style, className, mode, disabled, range, rangeKey, value, start, end, fields, customItem } = this.props;

    return <picker onTouchStart={onTouchStart ? 'onTouchStart' : ''} onTouchMove={onTouchMove ? 'onTouchMove' : ''} onTouchCancel={onTouchCancel ? 'onTouchCancel' : ''} onTouchEnd={onTouchEnd ? 'onTouchEnd' : ''} onTap={onTap ? 'onTap' : ''} onLongPress={onLongPress ? 'onLongPress' : ''} onLongTap={onLongTap ? 'onLongTap' : ''} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : ''} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : ''} onAnimationStart={onAnimationStart ? 'onAnimationStart' : ''} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : ''} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : ''} onCancel={onCancel ? 'onCancel' : ''} onError={onError ? 'onError' : ''} onChange={onChange ? 'onChange' : ''} onColumnChange={onColumnChange ? 'onColumnChange' : ''} parent={parent} style={style} className={className} mode={mode} disabled={disabled} range={range} rangeKey={rangeKey} value={value} start={start} end={end} fields={fields} customItem={customItem}>{this.props.children}</picker>;
  }
}


