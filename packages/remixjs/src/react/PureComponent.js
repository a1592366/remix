import { miniCreateClass } from './util';
import { shallowEqual } from './shallowEqual';
import Component from './Component';

const PureComponent = miniCreateClass(
    function PureComponent() {
        this.isPureComponent = true;
    },
    Component,
    {
        shouldComponentUpdate(nextProps, nextState) {
            let a = shallowEqual(this.props, nextProps);
            let b = shallowEqual(this.state, nextState);
            return !a || !b;
        }
    }
);

export default PureComponent