import { miniCreateClass } from '../react/util';
import Component from '../react/Component';

export const Unbatch = miniCreateClass(
    function Unbatch(props) {
        this.state = {
            child: props.child
        };
    },
    Component,
    {
        render: function f3() {
            return this.state.child;
        }
    }
);
