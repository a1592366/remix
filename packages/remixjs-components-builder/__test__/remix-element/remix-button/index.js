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
		parent: PropTypes.string,
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
		parent: null,
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

	onGetUserInfo (e) { 
		const { onGetUserInfo } = this.props;
		if (typeof onGetUserInfo === 'function') { onGetUserInfo(e); } 
	}

	onContact (e) { 
		const { onContact } = this.props;
		if (typeof onContact === 'function') { onContact(e); } 
	}

	onGetPhoneNumber (e) { 
		const { onGetPhoneNumber } = this.props;
		if (typeof onGetPhoneNumber === 'function') { onGetPhoneNumber(e); } 
	}

	onOpenSetting (e) { 
		const { onOpenSetting } = this.props;
		if (typeof onOpenSetting === 'function') { onOpenSetting(e); } 
	}

	onLaunchApp (e) { 
		const { onLaunchApp } = this.props;
		if (typeof onLaunchApp === 'function') { onLaunchApp(e); } 
	}

	onError (e) { 
		const { onError } = this.props;
		if (typeof onError === 'function') { onError(e); } 
	}

  render () {
    const { onTouchStart, onTouchMove, onTouchCancel, onTouchEnd, onTap, onLongPress, onLongTap, onTouchForceChange, onTransitionEnd, onAnimationStart, onAnimationIteration, onAnimationEnd, onGetUserInfo, onContact, onGetPhoneNumber, onOpenSetting, onLaunchApp, onError, parent, style, className, size, type, plain, disabled, loading, formType, openType, hoverClass, hoverStopPropagation, hoverStartTime, hoverStayTime, lang, sessionFrom, sendMessageTitle, sendMessagePath, sendMessageImg, appParameter, showMessageCard } = this.props;

    return <button onTouchStart={onTouchStart ? 'onTouchStart' : ''} onTouchMove={onTouchMove ? 'onTouchMove' : ''} onTouchCancel={onTouchCancel ? 'onTouchCancel' : ''} onTouchEnd={onTouchEnd ? 'onTouchEnd' : ''} onTap={onTap ? 'onTap' : ''} onLongPress={onLongPress ? 'onLongPress' : ''} onLongTap={onLongTap ? 'onLongTap' : ''} onTouchForceChange={onTouchForceChange ? 'onTouchForceChange' : ''} onTransitionEnd={onTransitionEnd ? 'onTransitionEnd' : ''} onAnimationStart={onAnimationStart ? 'onAnimationStart' : ''} onAnimationIteration={onAnimationIteration ? 'onAnimationIteration' : ''} onAnimationEnd={onAnimationEnd ? 'onAnimationEnd' : ''} onGetUserInfo={onGetUserInfo ? 'onGetUserInfo' : ''} onContact={onContact ? 'onContact' : ''} onGetPhoneNumber={onGetPhoneNumber ? 'onGetPhoneNumber' : ''} onOpenSetting={onOpenSetting ? 'onOpenSetting' : ''} onLaunchApp={onLaunchApp ? 'onLaunchApp' : ''} onError={onError ? 'onError' : ''} parent={parent} style={style} className={className} size={size} type={type} plain={plain} disabled={disabled} loading={loading} formType={formType} openType={openType} hoverClass={hoverClass} hoverStopPropagation={hoverStopPropagation} hoverStartTime={hoverStartTime} hoverStayTime={hoverStayTime} lang={lang} sessionFrom={sessionFrom} sendMessageTitle={sendMessageTitle} sendMessagePath={sendMessagePath} sendMessageImg={sendMessageImg} appParameter={appParameter} showMessageCard={showMessageCard}>{this.props.children}</button>;
  }
}


