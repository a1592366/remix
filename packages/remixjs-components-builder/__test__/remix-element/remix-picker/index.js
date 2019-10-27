import React from '../../../react';
import PropTypes from '../../../react/PropTypes';


export default class RemixPicker extends React.Component {
  
  static propTypes = {
    onCancel: PropTypes.string,
		onError: PropTypes.string,
		onChange: PropTypes.string,
		onColumnChange: PropTypes.string,
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
    onCancel: null,
		onError: null,
		onChange: null,
		onColumnChange: null,
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

  render () {
    const { onCancel, onError, onChange, onColumnChange, onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, onTouchForceChange, style, className, mode, disabled, range, rangeKey, value, start, end, fields, customItem } = this.props;

    return <picker onCancel={onCancel ? 'onCancel' : null} onError={onError ? 'onError' : null} onChange={onChange ? 'onChange' : null} onColumnChange={onColumnChange ? 'onColumnChange' : null} onTouchStart={onTouchStart ? 'onTouchStart' : null} onTouchMove={onTouchMove ? 'onTouchMove' : null} onTouchCancel={onTouchCancel ? 'onTouchCancel' : null} onTouchEnd={onTouchEnd ? 'onTouchEnd' : null} onTap={onTap ? 'onTap' : null} onLongPress={onLongPress ? 'onLongPress' : null} onLongTap={onLongTap ? 'onLongTap' : null} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null} onAnimationStart={onAnimationStart ? 'onAnimationStart' : null} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null} style={style} className={className} mode={mode} disabled={disabled} range={range} rangeKey={rangeKey} value={value} start={start} end={end} fields={fields} customItem={customItem}>{this.props.children}</picker>;
  }
}


