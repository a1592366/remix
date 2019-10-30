import React from '../../../react';
import PropTypes from '../../../react/PropTypes';


export default class RemixVideo extends React.Component {
  
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
		onPlay: PropTypes.string,
		onPause: PropTypes.string,
		onEnded: PropTypes.string,
		onTimeUpdate: PropTypes.string,
		onFullScreenChange: PropTypes.string,
		onWaiting: PropTypes.string,
		onError: PropTypes.string,
		onProgress: PropTypes.string,
		onLoadedMetaData: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		src: PropTypes.string,
		duration: PropTypes.number,
		controls: PropTypes.bool,
		danmuList: PropTypes.array,
		showPlayButton: PropTypes.bool,
		enableDanmu: PropTypes.bool,
		autoplay: PropTypes.bool,
		loop: PropTypes.bool,
		muted: PropTypes.bool,
		initialTime: PropTypes.number,
		pageGesture: PropTypes.bool,
		direction: PropTypes.number,
		showProgress: PropTypes.bool,
		showFullscreenButton: PropTypes.bool,
		showPlayButton: PropTypes.bool,
		showCenterPlayButton: PropTypes.bool,
		enableProgressGesture: PropTypes.bool,
		objectFit: PropTypes.bool,
		poster: PropTypes.string,
		showMuteButton: PropTypes.bool,
		title: PropTypes.string,
		playButtonPosition: PropTypes.string,
		enablePlayGesture: PropTypes.bool,
		autoPauseIfNavigate: PropTypes.bool,
		autoPauseIfOpenNative: PropTypes.bool,
		vslideGesture: PropTypes.bool,
		vslideGestureInFullscreen: PropTypes.bool,
		adUnitId: PropTypes.string,
		
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
		onPlay: null,
		onPause: null,
		onEnded: null,
		onTimeUpdate: null,
		onFullScreenChange: null,
		onWaiting: null,
		onError: null,
		onProgress: null,
		onLoadedMetaData: null,
		style: null,
		className: null,
		src: null,
		duration: null,
		controls: true,
		danmuList: null,
		showPlayButton: false,
		enableDanmu: false,
		autoplay: false,
		loop: false,
		muted: false,
		initialTime: 0,
		pageGesture: false,
		direction: null,
		showProgress: true,
		showFullscreenButton: true,
		showPlayButton: true,
		showCenterPlayButton: true,
		enableProgressGesture: true,
		objectFit: 0,
		poster: null,
		showMuteButton: false,
		title: null,
		playButtonPosition: bottom,
		enablePlayGesture: false,
		autoPauseIfNavigate: true,
		autoPauseIfOpenNative: true,
		vslideGesture: true,
		vslideGestureInFullscreen: true,
		adUnitId: null,
		
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

	onPlay (e) { 
		const { onPlay } = this.props;
		if (typeof onPlay === 'function') { onPlay(e); } 
	}

	onPause (e) { 
		const { onPause } = this.props;
		if (typeof onPause === 'function') { onPause(e); } 
	}

	onEnded (e) { 
		const { onEnded } = this.props;
		if (typeof onEnded === 'function') { onEnded(e); } 
	}

	onTimeUpdate (e) { 
		const { onTimeUpdate } = this.props;
		if (typeof onTimeUpdate === 'function') { onTimeUpdate(e); } 
	}

	onFullScreenChange (e) { 
		const { onFullScreenChange } = this.props;
		if (typeof onFullScreenChange === 'function') { onFullScreenChange(e); } 
	}

	onWaiting (e) { 
		const { onWaiting } = this.props;
		if (typeof onWaiting === 'function') { onWaiting(e); } 
	}

	onError (e) { 
		const { onError } = this.props;
		if (typeof onError === 'function') { onError(e); } 
	}

	onProgress (e) { 
		const { onProgress } = this.props;
		if (typeof onProgress === 'function') { onProgress(e); } 
	}

	onLoadedMetaData (e) { 
		const { onLoadedMetaData } = this.props;
		if (typeof onLoadedMetaData === 'function') { onLoadedMetaData(e); } 
	}

  render () {
    const { onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTouchForceChange, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, onPlay, onPause, onEnded, onTimeUpdate, onFullScreenChange, onWaiting, onError, onProgress, onLoadedMetaData, style, className, src, duration, controls, danmuList, showPlayButton, enableDanmu, autoplay, loop, muted, initialTime, pageGesture, direction, showProgress, showFullscreenButton, showPlayButton, showCenterPlayButton, enableProgressGesture, objectFit, poster, showMuteButton, title, playButtonPosition, enablePlayGesture, autoPauseIfNavigate, autoPauseIfOpenNative, vslideGesture, vslideGestureInFullscreen, adUnitId } = this.props;

    return <video onTouchStart={onTouchStart ? 'onTouchStart' : ''} onTouchMove={onTouchMove ? 'onTouchMove' : ''} onTouchCancel={onTouchCancel ? 'onTouchCancel' : ''} onTouchEnd={onTouchEnd ? 'onTouchEnd' : ''} onTap={onTap ? 'onTap' : ''} onLongPress={onLongPress ? 'onLongPress' : ''} onLongTap={onLongTap ? 'onLongTap' : ''} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : ''} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : ''} onAnimationStart={onAnimationStart ? 'onAnimationStart' : ''} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : ''} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : ''} onPlay={onPlay ? 'onPlay' : ''} onPause={onPause ? 'onPause' : ''} onEnded={onEnded ? 'onEnded' : ''} onTimeUpdate={onTimeUpdate ? 'onTimeUpdate' : ''} onFullScreenChange={onFullScreenChange ? 'onFullScreenChange' : ''} onWaiting={onWaiting ? 'onWaiting' : ''} onError={onError ? 'onError' : ''} onProgress={onProgress ? 'onProgress' : ''} onLoadedMetaData={onLoadedMetaData ? 'onLoadedMetaData' : ''} style={style} className={className} src={src} duration={duration} controls={controls} danmuList={danmuList} showPlayButton={showPlayButton} enableDanmu={enableDanmu} autoplay={autoplay} loop={loop} muted={muted} initialTime={initialTime} pageGesture={pageGesture} direction={direction} showProgress={showProgress} showFullscreenButton={showFullscreenButton} showPlayButton={showPlayButton} showCenterPlayButton={showCenterPlayButton} enableProgressGesture={enableProgressGesture} objectFit={objectFit} poster={poster} showMuteButton={showMuteButton} title={title} playButtonPosition={playButtonPosition} enablePlayGesture={enablePlayGesture} autoPauseIfNavigate={autoPauseIfNavigate} autoPauseIfOpenNative={autoPauseIfOpenNative} vslideGesture={vslideGesture} vslideGestureInFullscreen={vslideGestureInFullscreen} adUnitId={adUnitId}></video>;
  }
}


