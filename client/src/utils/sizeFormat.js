const sizeFormat = size => {
	if (size > 1000 ** 3) return (size / 1000 ** 3).toFixed(2) + ' GB'
	if (size > 1000 ** 2) return (size / 1000 ** 2).toFixed(1) + ' MB'
	if (size > 1000 ** 1) return Math.ceil(size / 1000 ** 1) + ' KB'
	return size + 'B'
}
export default sizeFormat
