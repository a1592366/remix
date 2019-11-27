

import { miniCreateClass, isFn, get } from '../react/util';
import { createElement } from '../react/createElement';
import { Suspense } from './Suspense';
import Component from '../react/Component';

const LazyComponent = miniCreateClass(function LazyComponent(props, context) {
    this.props = props;
    this.context = context;
    this.state = {
        component: null,
        resolved: false
    }
    var promise = props.children();
    if(!promise || !isFn(promise.then)){
        throw 'lazy必须返回一个thenable对象'
    }
    promise.then( (value) =>
        this.setState({
            component: value.default,
            resolved:  true
        })
    )
   
}, Component, {
    fallback(){//返回上层Suspense组件的fallback属性
        var parent = Object(get(this)).return
        while(parent){
          if( parent.type === Suspense){
              return parent.props.fallback
           }
           parent = parent.return
        }
        throw 'lazy组件必须包一个Suspense组件'
    },
    render: function f2(){
        return this.state.resolved ? createElement(this.state.component, this.props) : this.fallback()
    }
});

function lazy(render) {
    return function (props) {
        return createElement(LazyComponent, props, render );
    };
}
export {
    lazy
}


