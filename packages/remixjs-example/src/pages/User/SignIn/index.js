import React, { Component } from 'react';
import { ScrollView, View, Image, Text, Map, Picker, Swiper, Video } from 'remixjs/components';
import { ViewController } from 'remixjs/components';
import { transports } from 'remixjs/project';
import classnames from 'classnames';

import Button from '../../../components/Button';
import Input from '../../../components/Input';

import graphql, {
  getAuthorizationToken
} from '../../../common/graphql';


import './index.css';

const setUser = graphql(`
  mutation setUser($user: InputOfUser!) {
    setUser(user: $user) {
      nickname
      avatar
    }
  }
`);

const getUser = graphql(`
  query getUser {
    getUser {
      avatar
      nickname
      authorized
    }
  }
`);

const Loading = () => {
  return <View className="sign-in__loading">数据加载中...</View>
}

const Authorize = ({ onAuthorize }) => {
  return (
    <Button 
      className="sign-in_button" 
      openType="getUserInfo" 
      onGetUserInfo={onAuthorize}
    >微信授权</Button>
  );
}

const SignIn = ({ onAgree, agreed, onPhoneNumberChange, onPhoneCodeChange, phoneNumber, code }) => {
  const classes = classnames({
    'sign-in__protocol-checkbox': true,
    'sign-in__protocol-checkbox_checked': agreed
  });

  return (
    <View className="sign-in__form">
      <View className="sign-in__row">
        <Input value={phoneNumber} placeholder="手机号" onChange={onPhoneNumberChange} />
      </View>

      <View className="sign-in__row">
        <Input value={code} placeholder="验证码" onChange={onPhoneCodeChange} />
      </View>

      <View className="sign-in__row">
        <Button>登录</Button>
      </View>      

      <View className="sign-in__protocol">
        <View className={classes} onTap={onAgree}>
      
        </View>

        <View className="sign-in__protocol-text">

        </View>

        <View className="sign-in__protocol-link">
      
        </View>
      </View>
    </View>
  );
}

const Tips = ({ isDataLoaded }) => {
  const classes = classnames({
    'sign-in__tips': true,
    'sign-in__tips_visible': isDataLoaded
  });

  return (
    <View className={classes}>
      <View>TIP：首次登录请注册官方认证，</View>
      <View>以开启小程序服务全功能</View>
    </View>
  );
}

export default class Index extends ViewController {
  config = {
    navigationBarTitleText: '我的'
  }
  
  state = {
    phoneNumber: null,
    code: null,
    agreed: false,
    user: {
      authorized: false
    },
    isDataLoaded: false
  }

  componentWillMount () {
    getAuthorizationToken()
      .then(() => {
        this.getUserInfomation();
      })
      .catch((err) => {});
  }

  getUserInfomation = () => {
    getUser().then(res => {
      const { getUser } = res.data;

      this.setState({
        user: getUser,
        isDataLoaded: true
      });
    }).catch(err => {
      // debugger;
    })
  }

  onAgree = () => {
    this.setState({
      agreed: !this.state.agreed
    })
  }


  onChange = (key) => {
    this.setState({
      current: key
    })
  }

  onAuthorize = (res) => {
    const { detail } = res;
    const { 
      encryptedData: encrypted,
      rawData: raw, 
      userInfo: userinfo, 
      signature, 
      errMsg,
      iv, 
    } = detail;

    if (errMsg === 'getUserInfo:ok') {
      setUser({
        user: {
          iv,
          raw,
          encrypted,
          signature
        }
      }).then(res => {

      }).catch(err => {

      })
    } else {

    }
  }

  onPhoneCodeChange = (e) => {
    const { detail } = e;

    this.setState({
      code: detail.value
    });

  }

  onPhoneNumberChange = (e) => {
    const { detail } = e;

    this.setState({
      phoneNumber: detail.value
    });
  }

  contentRender = () => {
    const { user, phoneNumber, code, agreed } = this.state;

    return (
      <View className="sign-in__content">
        { 
          !user.authorized ? <SignIn 
              phoneNumber={phoneNumber}
              code={code}
              onPhoneCodeChange={this.onPhoneCodeChange}
              onPhoneNumberChange={this.onPhoneNumberChange}
              onAgree={this.onAgree}
              agreed={agreed}
            /> : <Authorize onAuthorize={this.onAuthorize} /> }
      </View>
    );
  }

  render () {
    const { isDataLoaded } = this.state;

    debugger;

    return (
      <View className="sign-in">
        <View className="sign-in__header"></View>
        <View className="sign-in__body">

          {
            isDataLoaded ? 
              this.contentRender() : <Loading />
          }

          <Tips isDataLoaded={isDataLoaded} />
        </View>
      </View>
    );
  }
}