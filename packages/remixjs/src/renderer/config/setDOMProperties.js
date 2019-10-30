import { DANGEROUSLY_SET_INNER_HTML, HTML, CHILDREN, STYLE, STYLE_NAME_FLOAT } from '../../shared';
import { isNullOrUndefined, isString, isFunction, isNumber, isNull } from '../../shared/is';
import ensureListeningTo from '../../event/ensureListeningTo';
import registrationNameModules from '../../event/registrationNameModules';


export default function setInitialDOMProperties (
  tag, 
  element, 
  rootContainerElement, 
  nextProps,
) {
  for (let propName in nextProps) {
    if (nextProps.hasOwnProperty(propName)) {
      const nextProp = nextProps[propName];

      if (propName === STYLE) {
        if (nextProp) {
          Object.freeze(nextProp);
        }

        setValueForStyles(element, nextProp);
      } else if (propName === DANGEROUSLY_SET_INNER_HTML) {
        const nextHtml = nextProp ? 
          nextProp[HTML] : 
          undefined;

        if (!isNullOrUndefined(nextHtml)) {
          setInnerHTML(element, nextHtml);
        }
      } else if (propName === CHILDREN) {
        if (isString(nextProp)) {
          const canSetTextContent = tag !== 'textarea' || nextProp !== '';
  
          if (canSetTextContent) {
            setTextContent(element, nextProp);
          }
        } else if (isNumber(nextProp)) {
          setTextContent(element, String(nextProp));
        }
      } else if (registrationNameModules.hasOwnProperty(propName)) {
        if (isNullOrUndefined(nextProp)) {
          ensureListeningTo(rootContainerElement, propName);
        }
      } else if (!isNullOrUndefined(nextProp)) {
        setValueForProperty(element, propName, nextProp);
      }
    }
  }
}

export function setInnerHTML (

) {

}
  
export function setValueForStyles (
  element,
  styles
) {
  const style = element.style;

  for (let styleName in styles) {
    if (styleName === STYLE_NAME_FLOAT) {
      styleName = 'cssFloat';
    }

    style[styleName] = styles[styleName];
  }
}

export function setTextContent (
  element,
  content
) {
  element.innerText = content;
}

export function setValueForProperty (
  element, 
  propName, 
  value
) {
  if (isNull(value)) {
    element.removeAttribute(propName, value);
  } else {
    element.setAttribute(propName, value);
  }
}

function shouldIgnoreAttribute (name) {
  if (name.length > 2 && name.slice(0, 2).toLowerCase() === 'on') {
    return true;
  }

  return false;
}