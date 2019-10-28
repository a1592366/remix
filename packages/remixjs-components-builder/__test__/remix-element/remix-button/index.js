import React from '../../../react';
import PropTypes from '../../../react/PropTypes';


export default class RemixButton extends React.Component {
  
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
		onGetUserInfo: PropTypes.string,
		onContact: PropTypes.string,
		onGetPhoneNumber: PropTypes.string,
		onOpenSetting: PropTypes.string,
		onLaunchApp: PropTypes.string,
		onError: PropTypes.string,
		style: PropTypes.string,
		className: PropTypes.string,
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
		onGetUserInfo: null,
		onContact: null,
		onGetPhoneNumber: null,
		onOpenSetting: null,
		onLaunchApp: null,
		onError: null,
		style: null,
		className: null,
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
    const { onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTouchForceChange, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, onGetUserInfo, onContact, onGetPhoneNumber, onOpenSetting, onLaunchApp, onError, style, className, size, type, plain, disabled, loading, formType, openType, hoverClass, hoverStopPropagation, hoverStartTime, hoverStayTime, lang, sessionFrom, sendMessageTitle, sendMessagePath, sendMessageImg, appParameter, showMessageCard } = this.props;

    return <button onTouchStart={onTouchStart ? 'onTouchStart' : null} onTouchMove={onTouchMove ? 'onTouchMove' : null} onTouchCancel={onTouchCancel ? 'onTouchCancel' : null} onTouchEnd={onTouchEnd ? 'onTouchEnd' : null} onTap={onTap ? 'onTap' : null} onLongPress={onLongPress ? 'onLongPress' : null} onLongTap={onLongTap ? 'onLongTap' : null} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : null} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : null} onAnimationStart={onAnimationStart ? 'onAnimationStart' : null} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : null} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : null} onGetUserInfo={onGetUserInfo ? 'onGetUserInfo' : null} onContact={onContact ? 'onContact' : null} onGetPhoneNumber={onGetPhoneNumber ? 'onGetPhoneNumber' : null} onOpenSetting={onOpenSetting ? 'onOpenSetting' : null} onLaunchApp={onLaunchApp ? 'onLaunchApp' : null} onError={onError ? 'onError' : null} style={style} className={className} size={size} type={type} plain={plain} disabled={disabled} loading={loading} formType={formType} openType={openType} hoverClass={hoverClass} hoverStopPropagation={hoverStopPropagation} hoverStartTime={hoverStartTime} hoverStayTime={hoverStayTime} lang={lang} sessionFrom={sessionFrom} sendMessageTitle={sendMessageTitle} sendMessagePath={sendMessagePath} sendMessageImg={sendMessageImg} appParameter={appParameter} showMessageCard={showMessageCard}>{this.props.children}</button>;
  }
}


