var url = ''
var colorPrimary = '#000'
var colorSecondary = '#000'
var colorAccent = '#000'
var logo = ''

const qrCode = new QRCodeStyling({
	width: Math.min(512, document.body.clientWidth),
	height: Math.min(512, document.body.clientWidth),
	type: "svg",
	errorCorrectionLevel: 'H',
	imageOptions: {
		crossOrigin: 'anonymous',
		imageSize: 0.5,
		margin: 10
	},
})
qrCode.append(document.querySelector('main'))

function refreshQRCode() {
	qrCode.update({
		data: url,
		image: logo,
		dotsOptions: {
			color: colorPrimary,
			type: 'extra-rounded'
		},
		cornersDotOptions: {
			color: colorSecondary
		},
		cornersSquareOptions: {
			color: colorAccent,
			type: 'extra-rounded'
		}
	})
}

const reader = new FileReader()
reader.onload = e => {
	logo = e.target.result
	refreshQRCode()
}

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
document.querySelector('#logo').onchange = e => {
	let picture = e.target.files[0]
	if (picture) reader.readAsDataURL(picture)
}
document.querySelector('#download').onclick = () => {
	try {
		qrCode.download({name: 'qrcode', extension: 'svg'})
	} catch(e) {
		alert(e)
	}
}