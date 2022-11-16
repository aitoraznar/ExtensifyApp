/**
 * Returns the Bounding Rectangle for the passed native event's target.
 *
 * @param {Object} target
 * @returns {Promise}
 */
function getClickedTargetLocation(target) {
    return new Promise((resolve) => {
        resolve(target.getBoundingClientRect());
    });
}

export default getClickedTargetLocation;
