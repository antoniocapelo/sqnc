/*
 * Adapted from https://github.com/spite/looper
 *
 */
function get2DCanvasContext(w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    return canvas.getContext('2d');
}

export default get2DCanvasContext;

