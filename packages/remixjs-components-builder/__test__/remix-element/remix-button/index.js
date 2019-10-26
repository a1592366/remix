import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

export default class RemixButton extends React.Component {
  static propTypes = {
    uuid: PropTypes.string,
		style: PropTypes.object,
		className: PropTypes.string,
		onGetUserInfo: PropTypes.event,
		onContact: PropTypes.event,
		onGetPhoneNumber: PropTypes.event,
		onOpenSetting: PropTypes.event,
		onLaunchApp: PropTypes.event,
		onError: PropTypes.event,
		size: PropTypes.string,
		type: PropTypes.string,
		plain: PropTypes.bool,
		disabled: PropTypes.bool,
		loading: PropTypes.bool,
		formType: PropTypes.string,
		openType: PropTypes.string,
		hoverClass: PropTypes.string,
		hoverStopPropagation: PropTypes.bool,
		hoverStartTime: PropTypes.number,
		hoverStayTime: PropTypes.number,
		lang: PropTypes.string,
		sessionFrom: PropTypes.string,
		sendMessageTitle: PropTypes.string,
		sendMessagePath: PropTypes.string,
		sendMessageImg: PropTypes.string,
		appParameter: PropTypes.string,
		showMessageCard: PropTypes.string,
		
  };

  static defaultProps = {
    uuid: null,
		style: null,
		className: null,
		onGetUserInfo: null,
		onContact: null,
		onGetPhoneNumber: null,
		onOpenSetting: null,
		onLaunchApp: null,
		onError: null,
		size: 'default',
		type: 'default',
		plain: false,
		disabled: false,
		loading: false,
		formType: null,
		openType: null,
		hoverClass: 'button-hover',
		hoverStopPropagation: false,
		hoverStartTime: 20,
		hoverStayTime: 70,
		lang: 'en',
		sessionFrom: null,
		sendMessageTitle: null,
		sendMessagePath: null,
		sendMessageImg: null,
		appParameter: null,
		showMessageCard: null,
		
  };

  render () {
    const { uuid, style, className, onGetUserInfo, onContact, onGetPhoneNumber, onOpenSetting, onLaunchApp, onError, size, type, plain, disabled, loading, formType, openType, hoverClass, hoverStopPropagation, hoverStartTime, hoverStayTime, lang, sessionFrom, sendMessageTitle, sendMessagePath, sendMessageImg, appParameter, showMessageCard } = this.props;

    return <button uuid={uuid} style={style} className={className} onGetUserInfo={onGetUserInfo ? 'onGetUserInfo' : null} onContact={onContact ? 'onContact' : null} onGetPhoneNumber={onGetPhoneNumber ? 'onGetPhoneNumber' : null} onOpenSetting={onOpenSetting ? 'onOpenSetting' : null} onLaunchApp={onLaunchApp ? 'onLaunchApp' : null} onError={onError ? 'onError' : null} size={size} type={type} plain={plain} disabled={disabled} loading={loading} formType={formType} openType={openType} hoverClass={hoverClass} hoverStopPropagation={hoverStopPropagation} hoverStartTime={hoverStartTime} hoverStayTime={hoverStayTime} lang={lang} sessionFrom={sessionFrom} sendMessageTitle={sendMessageTitle} sendMessagePath={sendMessagePath} sendMessageImg={sendMessageImg} appParameter={appParameter} showMessageCard={showMessageCard}>{this.props.children}</button>;
  }
}


