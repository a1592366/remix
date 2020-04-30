import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

import EventHandle from '../EventHandle';

class RemixPicker extends EventHandle {
  static propTypes = {
    child: PropTypes.object,
		innerText: PropTypes.string,
		uuid: PropTypes.string,
		parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		mode: PropTypes.string,
		disabled: PropTypes.boolean,
		range: PropTypes.object,
		rangeKey: PropTypes.string,
		value: PropTypes.number,
		start: PropTypes.string,
		end: PropTypes.string,
		fields: PropTypes.string,
		customItem: PropTypes.string,
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
		onColumnChange: PropTypes.string
  }

  static defaultProps = {
    child: null,
		innerText: null,
		uuid: null,
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
		onColumnChange: null
  }

  render () {
    const {
      child,
			innerText,
			uuid,
			parent,
			style,
			className,
			mode,
			disabled,
			range,
			rangeKey,
			value,
			start,
			end,
			fields,
			customItem,
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
			onCancel,
			onError,
			onChange,
			onColumnChange
    } = this.props;

    return (
      <picker onTouchStart={onTouchStart ? 'onTouchStart' : null } onTouchMove={onTouchMove ? 'onTouchMove' : null } onTouchCancel={onTouchCancel ? 'onTouchCancel' : null } onTouchEnd={onTouchEnd ? 'onTouchEnd' : null } onTap={onTap ? 'onTap' : null } onLongPress={onLongPress ? 'onLongPress' : null } onLongTap={onLongTap ? 'onLongTap' : null } onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null } onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null } onAnimationStart={onAnimationStart ? 'onAnimationStart' : null } onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null } onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null } onCancel={onCancel ? 'onCancel' : null } onError={onError ? 'onError' : null } onChange={onChange ? 'onChange' : null } onColumnChange={onColumnChange ? 'onColumnChange' : null } child={child} innerText={innerText} uuid={uuid} parent={parent} style={style} className={className} mode={mode} disabled={disabled} range={range} rangeKey={rangeKey} value={value} start={start} end={end} fields={fields} customItem={customItem} >
        {this.props.children}
      </picker>
    );
  }
}

export default RemixPicker;
