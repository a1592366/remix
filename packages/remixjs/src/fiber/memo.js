import { miniCreateClass } from '../react/util';
import { createElement } from '../react/createElement';
import Component from '../react/Component';

const MemoComponent = miniCreateClass(
    function MemoComponent(obj) {
        this.render = obj.render;
        this.shouldComponentUpdate = obj.shouldComponentUpdate
    },
    Component,
    {}
);

export function memo(render, shouldComponentUpdate) {
    return function(props) {
        return createElement(MemoComponent, Object.assign(props,{
            render: render.bind(this, props),
            shouldComponentUpdate
        }));
    };
}
