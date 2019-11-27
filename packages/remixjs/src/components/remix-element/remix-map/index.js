import React from '../../../renderer';
import PropTypes from '../../../react/PropTypes';


export default class RemixMap extends React.Component {
  
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
		onMarkerTap: PropTypes.string,
		onLabelTap: PropTypes.string,
		onControlTap: PropTypes.string,
		onCalloutTap: PropTypes.string,
		onUpdated: PropTypes.string,
		onRegionChange: PropTypes.string,
		onPoiTap: PropTypes.string,
		parent: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
		longitude: PropTypes.number,
		latitude: PropTypes.number,
		scale: PropTypes.number,
		markers: PropTypes.array,
		covers: PropTypes.array,
		polyline: PropTypes.array,
		circles: PropTypes.array,
		controls: PropTypes.array,
		includePoints: PropTypes.array,
		showLocation: PropTypes.bool,
		polygons: PropTypes.array,
		subkey: PropTypes.string,
		layerStyle: PropTypes.number,
		rotate: PropTypes.number,
		skew: PropTypes.number,
		enable3D: PropTypes.bool,
		showCompass: PropTypes.bool,
		showScale: PropTypes.bool,
		enableOverlooking: PropTypes.bool,
		enableZoom: PropTypes.bool,
		enableScroll: PropTypes.bool,
		enableRotate: PropTypes.bool,
		enableSatellite: PropTypes.bool,
		enableTraffic: PropTypes.bool,
		setting: PropTypes.object,
		
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
		onMarkerTap: null,
		onLabelTap: null,
		onControlTap: null,
		onCalloutTap: null,
		onUpdated: null,
		onRegionChange: null,
		onPoiTap: null,
		parent: null,
		style: null,
		className: null,
		longitude: null,
		latitude: null,
		scale: 16,
		markers: null,
		covers: null,
		polyline: null,
		circles: null,
		controls: null,
		includePoints: null,
		showLocation: false,
		polygons: null,
		subkey: null,
		layerStyle: 1,
		rotate: 0,
		skew: 0,
		enable3D: false,
		showCompass: false,
		showScale: false,
		enableOverlooking: false,
		enableZoom: false,
		enableScroll: false,
		enableRotate: false,
		enableSatellite: false,
		enableTraffic: false,
		setting: null,
		
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

	onMarkerTap (e) { 
		const { onMarkerTap } = this.props;
		if (typeof onMarkerTap === 'function') { onMarkerTap(e); } 
	}

	onLabelTap (e) { 
		const { onLabelTap } = this.props;
		if (typeof onLabelTap === 'function') { onLabelTap(e); } 
	}

	onControlTap (e) { 
		const { onControlTap } = this.props;
		if (typeof onControlTap === 'function') { onControlTap(e); } 
	}

	onCalloutTap (e) { 
		const { onCalloutTap } = this.props;
		if (typeof onCalloutTap === 'function') { onCalloutTap(e); } 
	}

	onUpdated (e) { 
		const { onUpdated } = this.props;
		if (typeof onUpdated === 'function') { onUpdated(e); } 
	}

	onRegionChange (e) { 
		const { onRegionChange } = this.props;
		if (typeof onRegionChange === 'function') { onRegionChange(e); } 
	}

	onPoiTap (e) { 
		const { onPoiTap } = this.props;
		if (typeof onPoiTap === 'function') { onPoiTap(e); } 
	}

  render () {
    const { onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTouchForceChange, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, onMarkerTap, onLabelTap, onControlTap, onCalloutTap, onUpdated, onRegionChange, onPoiTap, parent, style, className, longitude, latitude, scale, markers, covers, polyline, circles, controls, includePoints, showLocation, polygons, subkey, layerStyle, rotate, skew, enable3D, showCompass, showScale, enableOverlooking, enableZoom, enableScroll, enableRotate, enableSatellite, enableTraffic, setting } = this.props;

    return <map onTouchStart={onTouchStart ? 'onTouchStart' : ''} onTouchMove={onTouchMove ? 'onTouchMove' : ''} onTouchCancel={onTouchCancel ? 'onTouchCancel' : ''} onTouchEnd={onTouchEnd ? 'onTouchEnd' : ''} onTap={onTap ? 'onTap' : ''} onLongPress={onLongPress ? 'onLongPress' : ''} onLongTap={onLongTap ? 'onLongTap' : ''} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : ''} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : ''} onAnimationStart={onAnimationStart ? 'onAnimationStart' : ''} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : ''} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : ''} onMarkerTap={onMarkerTap ? 'onMarkerTap' : ''} onLabelTap={onLabelTap ? 'onLabelTap' : ''} onControlTap={onControlTap ? 'onControlTap' : ''} onCalloutTap={onCalloutTap ? 'onCalloutTap' : ''} onUpdated={onUpdated ? 'onUpdated' : ''} onRegionChange={onRegionChange ? 'onRegionChange' : ''} onPoiTap={onPoiTap ? 'onPoiTap' : ''} parent={parent} style={style} className={className} longitude={longitude} latitude={latitude} scale={scale} markers={markers} covers={covers} polyline={polyline} circles={circles} controls={controls} includePoints={includePoints} showLocation={showLocation} polygons={polygons} subkey={subkey} layerStyle={layerStyle} rotate={rotate} skew={skew} enable3D={enable3D} showCompass={showCompass} showScale={showScale} enableOverlooking={enableOverlooking} enableZoom={enableZoom} enableScroll={enableScroll} enableRotate={enableRotate} enableSatellite={enableSatellite} enableTraffic={enableTraffic} setting={setting}></map>;
  }
}


