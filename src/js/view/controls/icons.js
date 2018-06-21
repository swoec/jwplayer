import SPRITES from 'assets/SVG/sprites.svg';
import { createElement } from 'utils/dom';

let collection = null;

export function cloneIcon(name) {
    const icon = getCollection().getElementById('jw-svg-icon-' + name);
    if (icon) {
        return createSVGElement(icon.id);
    }
    if (__DEBUG__) {
        throw new Error('Icon not found: ' + name);
    }
    return null;
}

export function cloneIcons(names) {
    const icons = getCollection().querySelectorAll(names.split(',').map(i => '#jw-svg-icon-' + i).join(','));
    if (__DEBUG__ && !icons.length) {
        throw new Error('Icons not found: ' + names);
    }
    return Array.prototype.map.call(icons, icon => createSVGElement(icon.id));
}

function createSVGElement(id) {
    // The spaces around the <use> element fix a bug in Safari 10 https://allyjs.io/tutorials/focusing-in-svg.html#the-use-element
    return createElement(`<svg class="jw-svg-icon ${id}" focusable="false" viewBox="0 0 240 240"> <use href="#${id}" /> </svg>`);
}

export function getCollection() {
    if (!collection) {
        collection = parseCollection();
    }
    return collection;
}

function parseCollection() {
    return createElement(SPRITES);
}
