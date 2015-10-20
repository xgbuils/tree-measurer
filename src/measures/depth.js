module.exports = function (node, options, parentDepth) {
    if (node) {
    	return 1 + parentDepth
    } else {
    	return -1
    }
}