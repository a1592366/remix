import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

export default class RemixMap extends React.Component {
  static propTypes = {
    uuid: PropTypes.string,
		style: PropTypes.object,
		className: PropTypes.string,
		onTap: PropTypes.event,
		onMarkerTap: PropTypes.event,
		onLabelTap: PropTypes.event,
		onControlTap: PropTypes.event,
		onCalloutTap: PropTypes.event,
		onUpdated: PropTypes.event,
		onRegionChange: PropTypes.event,
		onPoiTap: PropTypes.event,
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
    uuid: null,
		style: null,
		className: null,
		onTap: null,
		onMarkerTap: null,
		onLabelTap: null,
		onControlTap: null,
		onCalloutTap: null,
		onUpdated: null,
		onRegionChange: null,
		onPoiTap: null,
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
    const { uuid, style, className, onTap, onMarkerTap, onLabelTap, onControlTap, onCalloutTap, onUpdated, onRegionChange, onPoiTap, longitude, latitude, scale, markers, covers, polyline, circles, controls, includePoints, showLocation, polygons, subkey, layerStyle, rotate, skew, enable3D, showCompass, showScale, enableOverlooking, enableZoom, enableScroll, enableRotate, enableSatellite, enableTraffic, setting } = this.props;

    return <map uuid={uuid} style={style} className={className} onTap={onTap ? 'onTap' : null} onMarkerTap={onMarkerTap ? 'onMarkerTap' : null} onLabelTap={onLabelTap ? 'onLabelTap' : null} onControlTap={onControlTap ? 'onControlTap' : null} onCalloutTap={onCalloutTap ? 'onCalloutTap' : null} onUpdated={onUpdated ? 'onUpdated' : null} onRegionChange={onRegionChange ? 'onRegionChange' : null} onPoiTap={onPoiTap ? 'onPoiTap' : null} longitude={longitude} latitude={latitude} scale={scale} markers={markers} covers={covers} polyline={polyline} circles={circles} controls={controls} includePoints={includePoints} showLocation={showLocation} polygons={polygons} subkey={subkey} layerStyle={layerStyle} rotate={rotate} skew={skew} enable3D={enable3D} showCompass={showCompass} showScale={showScale} enableOverlooking={enableOverlooking} enableZoom={enableZoom} enableScroll={enableScroll} enableRotate={enableRotate} enableSatellite={enableSatellite} enableTraffic={enableTraffic} setting={setting}></map>;
  }
}


