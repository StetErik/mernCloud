export default size => {
	if (size > 1000 * 1000 * 1000) {
		return (size / (1000 * 1000 * 1000)).toFixed(1) + ' Gb'
	}
	if (size > 1000 * 1000) {
		return (size / (1000 * 1000)).toFixed(1) + ' Mb'
	}
	if (size > 1000) {
		return (size / 1000).toFixed(1) + ' Kb'
	}
	return size + ' B'
}
