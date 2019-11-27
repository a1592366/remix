import Children from '../react/Children';
import Component from '../react/Component';
import PureComponent from '../react/PureComponent';
import PropTypes from '../react/PropTypes';
import { createRef, forwardRef } from '../react/createRef';
import { createPortal } from '../react/createPortal';
import { createContext } from '../react/createContext';
import { useState, useReducer, useEffect, useLayoutEffect, useCallback, useMemo, useRef, useContext, useImperativeHandle } from '../react/hooks';



import {
    createElement,
    cloneElement,
    isValidElement,
    createFactory
} from '../react/createElement';
import { Fragment, getWindow } from '../react/util';
import { lazy } from '../fiber/lazy';
import { Suspense } from '../fiber/Suspense';
import { memo } from '../fiber/memo';

import { findDOMNode } from './findDOMNode';
import { DOMRenderer } from './DOMRenderer';
const window = getWindow();
let prevReact = window.React;
let React;
if (prevReact && prevReact.eventSystem) {
    React = prevReact; //解决引入多个
} else {
    let {
        render,
        eventSystem,
        unstable_renderSubtreeIntoContainer,
        unmountComponentAtNode
    } = DOMRenderer;

    React = window.React = window.ReactDOM = {
        //平台相关API
        eventSystem,
        findDOMNode,
        unmountComponentAtNode,
        unstable_renderSubtreeIntoContainer,
        //fiber底层API
        version: 'VERSION',
        render: render,
        hydrate: render,
        unstable_batchedUpdates: DOMRenderer.batchedUpdates,
        Fragment,
        PropTypes,
        Children,
        createPortal,
        createContext,
        memo,
        lazy,
        Suspense,
        Component,
        createRef,
        forwardRef,
        useState,
        useContext,
        useEffect,
        useLayoutEffect,
        useReducer,
        useCallback,
        useMemo,
        useRef,
        useImperativeHandle,
        createElement,
        cloneElement,
        PureComponent,
        isValidElement,
        createFactory
    };
}

export default React;
