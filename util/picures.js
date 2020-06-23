var fs = require('fs');

var lastFile = () => {
	const Files = fs.readdirSync(path.join(__dirname, '/assets'))
	return parseInt(Files[Files.length - 1].split('.')[0]);
}

const renaneAll = () => {
	var files = fs.readdirSync(path.join(__dirname, '/assets'));
	files.forEach(async (item, i) => {
	    await sharp(path.join(__dirname, '/assets', item))
	        .resize(720)
	        .toFile(path.join(__dirname, '/assets', (i.toString() + '.jpg')))
	        .then(() => fs.unlink(path.join(__dirname, '/assets', item), (err) => {}))  
	})
}

const renaneOne = (_lastFile, path) => {
	return new Promise((res, rej) => {
		sharp(path.join(__dirname, '/assets', item))
	        .resize(720)
	        .toFile(path.join(__dirname, '/assets', (i.toString() + '.jpg')))
	        .then(() => fs.unlink(path.join(__dirname, '/assets', item), (err) => {
				_lastFile = _lastFile + 1;
				res(_lastFile)
			}))
	})
}