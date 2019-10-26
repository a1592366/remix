import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

export default class RemixImage extends React.Component {
  static propTypes = {
    uuid: PropTypes.string,
		style: PropTypes.object,
		className: PropTypes.string,
		onLoad: PropTypes.event,
		onError: PropTypes.event,
		src: PropTypes.string,
		mode: PropTypes.string,
		webp: PropTypes.bool,
		lazyLoad: PropTypes.bool,
		showMenuByLongpress: PropTypes.bool,
		
  };

  static defaultProps = {
    uuid: null,
		style: null,
		className: null,
		onLoad: null,
		onError: null,
		src: null,
		mode: 'scaleToFill',
		webp: false,
		lazyLoad: false,
		showMenuByLongpress: false,
		
  };

  render () {
    const { uuid, style, className, onLoad, onError, src, mode, webp, lazyLoad, showMenuByLongpress } = this.props;

    return <image uuid={uuid} style={style} className={className} onLoad={onLoad ? 'onLoad' : null} onError={onError ? 'onError' : null} src={src} mode={mode} webp={webp} lazyLoad={lazyLoad} showMenuByLongpress={showMenuByLongpress}></image>;
  }
}


