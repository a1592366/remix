import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

import EventHandle from '../EventHandle';

class RemixSlider extends EventHandle {
  static propTypes = {
    uuid: PropTypes.string,
		parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		min: PropTypes.number,
		max: PropTypes.number,
		step: PropTypes.number,
		disabled: PropTypes.boolean,
		value: PropTypes.number,
		color: PropTypes.string,
		selectedColor: PropTypes.string,
		backgroundColor: PropTypes.string,
		activeColor: PropTypes.string,
		blockSize: PropTypes.number,
		blockColor: PropTypes.string,
		showValue: PropTypes.boolean,
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
		onChange: PropTypes.string,
		onChanging: PropTypes.string
  }

  static defaultProps = {
    uuid: null,
		parent: null,
		style: null,
		className: null,
		min: 0,
		max: 100,
		step: 1,
		disabled: false,
		value: 0,
		color: '#e9e9e9',
		selectedColor: '#1aad19',
		backgroundColor: '#e9e9e9',
		activeColor: '#1aad19',
		blockSize: 28,
		blockColor: '#ffffff',
		showValue: false,
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
		onChange: null,
		onChanging: null
  }

  render () {
    const {
      uuid,
			parent,
			style,
			className,
			min,
			max,
			step,
			disabled,
			value,
			color,
			selectedColor,
			backgroundColor,
			activeColor,
			blockSize,
			blockColor,
			showValue,
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
			onChange,
			onChanging
    } = this.props;

    return (
      <slider onTouchStart={onTouchStart ? 'onTouchStart' : null } onTouchMove={onTouchMove ? 'onTouchMove' : null } onTouchCancel={onTouchCancel ? 'onTouchCancel' : null } onTouchEnd={onTouchEnd ? 'onTouchEnd' : null } onTap={onTap ? 'onTap' : null } onLongPress={onLongPress ? 'onLongPress' : null } onLongTap={onLongTap ? 'onLongTap' : null } onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null } onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null } onAnimationStart={onAnimationStart ? 'onAnimationStart' : null } onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null } onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null } onChange={onChange ? 'onChange' : null } onChanging={onChanging ? 'onChanging' : null } uuid={uuid} parent={parent} style={style} className={className} min={min} max={max} step={step} disabled={disabled} value={value} color={color} selectedColor={selectedColor} backgroundColor={backgroundColor} activeColor={activeColor} blockSize={blockSize} blockColor={blockColor} showValue={showValue} >
        {this.props.children}
      </slider>
    );
  }
}

export default RemixSlider;
