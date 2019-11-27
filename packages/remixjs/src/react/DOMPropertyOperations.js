/**
 * DOM Property Operations
 */

import {
    properties,
    isCustomAttribute,
    VALID_ATTRIBUTE_NAME_REGEX
} from './DOMConfig'
/**
 * Sets the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 * @param {*} value
 */
export function setPropValue(node, name, value) {
    if (value === null || value === undefined){
        node.removeAttribute(name)
    } else {
        node.setAttribute(name, '' + value);
    }
}


export function updateSelectOptions(select, multiple, propValue) {
    var selectedValue, i
    var options = select.options
  
    if (multiple) {
        select.multiple = true
        if (!Array.isArray(propValue)) {
            throw new Error('The value prop supplied to <select> must be an array if `multiple` is true')
        }
        selectedValue = {}
        for (i = 0; i < propValue.length; i++) {
            selectedValue['' + propValue[i]] = true
        }
        for (i = 0; i < options.length; i++) {
            var selected = selectedValue.hasOwnProperty(options[i].value)
            if (options[i].selected !== selected) {
                options[i].selected = selected
            }
        }
    } else {
        select.multiple = false
        if (Array.isArray(propValue)) {
            throw new Error('The value prop supplied to <select> must be a scalar value if `multiple` is false.')
        }
        // Do not set `select.value` as exact behavior isn't consistent across all
        // browsers for all cases.
        selectedValue = '' + propValue
        for (i = 0; i < options.length; i++) {
            var option = options[i]
            if (option.value === selectedValue) {
                if (!option.selected) {
                    option.selected = true
                }
            } else {
                if (option.selected) {
                    option.selected = false
                }
            }
        }

        if (options.selectedIndex < 0 && options.length) {
            options[0].selected = true
        }
    }
}