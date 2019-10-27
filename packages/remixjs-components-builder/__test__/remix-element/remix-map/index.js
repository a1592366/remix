import React from '../../../react';
import PropTypes from '../../../react/PropTypes';


export default class RemixMap extends React.Component {
  
  static propTypes = {
    onMarkerTap: PropTypes.string,
		onLabelTap: PropTypes.string,
		onControlTap: PropTypes.string,
		onCalloutTap: PropTypes.string,
		onUpdated: PropTypes.string,
		onRegionChange: PropTypes.string,
		onPoiTap: PropTypes.string,
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
    onMarkerTap: null,
		onLabelTap: null,
		onControlTap: null,
		onCalloutTap: null,
		onUpdated: null,
		onRegionChange: null,
		onPoiTap: null,
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

  render () {
    const { onMarkerTap, onLabelTap, onControlTap, onCalloutTap, onUpdated, onRegionChange, onPoiTap, onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, onTouchForceChange, style, className, longitude, latitude, scale, markers, covers, polyline, circles, controls, includePoints, showLocation, polygons, subkey, layerStyle, rotate, skew, enable3D, showCompass, showScale, enableOverlooking, enableZoom, enableScroll, enableRotate, enableSatellite, enableTraffic, setting } = this.props;

    return <map onMarkerTap={onMarkerTap ? 'onMarkerTap' : null} onLabelTap={onLabelTap ? 'onLabelTap' : null} onControlTap={onControlTap ? 'onControlTap' : null} onCalloutTap={onCalloutTap ? 'onCalloutTap' : null} onUpdated={onUpdated ? 'onUpdated' : null} onRegionChange={onRegionChange ? 'onRegionChange' : null} onPoiTap={onPoiTap ? 'onPoiTap' : null} onTouchStart={onTouchStart ? 'onTouchStart' : null} onTouchMove={onTouchMove ? 'onTouchMove' : null} onTouchCancel={onTouchCancel ? 'onTouchCancel' : null} onTouchEnd={onTouchEnd ? 'onTouchEnd' : null} onTap={onTap ? 'onTap' : null} onLongPress={onLongPress ? 'onLongPress' : null} onLongTap={onLongTap ? 'onLongTap' : null} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null} onAnimationStart={onAnimationStart ? 'onAnimationStart' : null} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null} style={style} className={className} longitude={longitude} latitude={latitude} scale={scale} markers={markers} covers={covers} polyline={polyline} circles={circles} controls={controls} includePoints={includePoints} showLocation={showLocation} polygons={polygons} subkey={subkey} layerStyle={layerStyle} rotate={rotate} skew={skew} enable3D={enable3D} showCompass={showCompass} showScale={showScale} enableOverlooking={enableOverlooking} enableZoom={enableZoom} enableScroll={enableScroll} enableRotate={enableRotate} enableSatellite={enableSatellite} enableTraffic={enableTraffic} setting={setting}></map>;
  }
}


