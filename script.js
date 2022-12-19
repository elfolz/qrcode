navigator.serviceWorker?.register('service-worker.js')

var url = ''
var dotsStyle = 'rounded'
var cornerStyle = 'extra-rounded'
var colorPrimary = '#000'
var colorSecondary = '#000'
var colorAccent = '#000'
var colorBg = '#fff'
var logo = ''
var width = Math.min(512, (document.body.clientWidth - 24))
var height = Math.min(512, (document.body.clientWidth - 24))

const reader = new FileReader()
reader.onload = e => {
	logo = e.target.result
	refreshQRCode()
}

const qrCode = new QRCodeStyling({
	errorCorrectionLevel: 'H',
	imageOptions: {
		crossOrigin: 'anonymous',
		imageSize: 0.5,
		margin: 10
	}
})

function refreshQRCode() {
	qrCode.update({
		width: width,
		height: height,
		data: url,
		image: logo,
		dotsOptions: {
			color: colorPrimary,
			type: dotsStyle
		},
		cornersDotOptions: {
			color: colorSecondary
		},
		cornersSquareOptions: {
			color: colorAccent,
			type: cornerStyle
		},
		backgroundOptions: {
			color: colorBg,
		},
	})
}

function init() {
	let main = document.querySelector('main')
	main.style.setProperty('width', `${width}px`)
	main.style.setProperty('height', `${height}px`)
	qrCode.append(main)
	document.querySelector('#url').onchange = e => {
		if (!e.target.value) return
		url = e.target.value
		refreshQRCode()
	}
	document.querySelector('#color-primary').onchange = e => {
		if (!e.target.value) return
		colorPrimary = e.target.value
		refreshQRCode()
	}
	document.querySelector('#color-secondary').onchange = e => {
		if (!e.target.value) return
		colorSecondary = e.target.value
		refreshQRCode()
	}
	document.querySelector('#color-accent').onchange = e => {
		if (!e.target.value) return
		colorAccent = e.target.value
		refreshQRCode()
	}
	document.querySelector('#color-bg').onchange = e => {
		if (!e.target.value) return
		colorBg = e.target.value
		refreshQRCode()
	}
	document.querySelector('#logo').onchange = e => {
		let picture = e.target.files[0]
		if (picture) reader.readAsDataURL(picture)
	}
	document.querySelector('#download').onclick = () => {
		try {
			qrCode.download({name: 'qrcode', extension: 'png'})
		} catch(e) {
			alert(e)
		}
	}
}

document.onreadystatechange = () => {
	if (document.readyState != 'complete') return
	init()
}