/**
 * Returns the Bounding Rectangle for the passed native event's target.
 *
 * @param {Object} target
 * @returns {Promise}
 */
function getClickedTargetLocation(target) {
    return new Promise((resolve) => {
        target.measureInWindow((x, y, width, height) => {
            resolve({
                x,
                y,
                top: y,
                bottom: 0,
                left: 0,
                right: x + width,
                width,
                height,
            });
        });
    });
}

export default getClickedTargetLocation;
