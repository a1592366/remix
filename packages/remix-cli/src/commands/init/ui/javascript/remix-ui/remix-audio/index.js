import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

import EventHandle from '../EventHandle';

class RemixAudio extends EventHandle {
  static propTypes = {
    uuid: PropTypes.string,
		parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		id: PropTypes.string,
		src: PropTypes.string,
		loop: PropTypes.boolean,
		controls: PropTypes.boolean,
		poster: PropTypes.string,
		name: PropTypes.string,
		author: PropTypes.string,
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
		onError: PropTypes.string,
		onPlay: PropTypes.string,
		onPause: PropTypes.string,
		onTimeUpdate: PropTypes.string,
		onEnded: PropTypes.string
  }

  static defaultProps = {
    uuid: null,
		parent: null,
		style: null,
		className: null,
		id: null,
		src: null,
		loop: false,
		controls: true,
		poster: null,
		name: null,
		author: null,
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
		onError: null,
		onPlay: null,
		onPause: null,
		onTimeUpdate: null,
		onEnded: null
  }

  render () {
    const {
      uuid,
			parent,
			style,
			className,
			id,
			src,
			loop,
			controls,
			poster,
			name,
			author,
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
			onError,
			onPlay,
			onPause,
			onTimeUpdate,
			onEnded
    } = this.props;

    return (
      <audio onTouchStart={onTouchStart ? 'onTouchStart' : null } onTouchMove={onTouchMove ? 'onTouchMove' : null } onTouchCancel={onTouchCancel ? 'onTouchCancel' : null } onTouchEnd={onTouchEnd ? 'onTouchEnd' : null } onTap={onTap ? 'onTap' : null } onLongPress={onLongPress ? 'onLongPress' : null } onLongTap={onLongTap ? 'onLongTap' : null } onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null } onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null } onAnimationStart={onAnimationStart ? 'onAnimationStart' : null } onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null } onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null } onError={onError ? 'onError' : null } onPlay={onPlay ? 'onPlay' : null } onPause={onPause ? 'onPause' : null } onTimeUpdate={onTimeUpdate ? 'onTimeUpdate' : null } onEnded={onEnded ? 'onEnded' : null } uuid={uuid} parent={parent} style={style} className={className} id={id} src={src} loop={loop} controls={controls} poster={poster} name={name} author={author} >
        {this.props.children}
      </audio>
    );
  }
}

export default RemixAudio;
