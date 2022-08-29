let app = {
	centerX: window.innerWidth / 2,
	centerY: window.innerHeight / 2,
	// defaultWidth: 1270,
	// defaultHeight: 720,
	defaultWidth: 1920,
	defaultHeight: 1080,
}

app.update = function () {
	// -- [experiment] --
	// this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
	// this.aspect = window.innerWidth > window.innerHeight ? window.innerWidth / window.innerHeight : window.innerHeight / window.innerWidth

	// app.isMobile = navigator.userAgent.indexOf("Mobile");
	// if (app.isMobile == -1) {
	//     app.isMobile = navigator.userAgent.indexOf("Tablet");
	// }
	// app.isMobile = app.isMobile == -1 ? false : true

	// let zoomX = window.innerWidth >= 520 ? (window.innerWidth / (app.defaultWidth / 100)) / 100 : (520 / (app.defaultWidth / 100)) / 100
	// let zoomY = window.innerHeight >= 400 ? (window.innerHeight / (app.defaultHeight / 100)) / 100 : (400 / (app.defaultHeight / 100)) / 100
	// this.zoom = this.orientation === 'landscape' ? zoomX: zoomY

	this.zoom = window.innerHeight >= 400 ? (window.innerHeight / (app.defaultHeight * 2 / 100)) / 100 : (400 / (app.defaultHeight * 2 / 100)) / 100

	console.log(this.zoom);
	//Если высота больше 400, то высота девайса / дефалт высота *2 / 100 и все разделить на 100
	// пример (500 / 720*2/100) / 100 = (500 / 14,4) / 100 = 0,34

	// Если меньше - (400 / 14,4) / 100 = 0,27

	this.width = window.innerWidth / this.zoom // 700 / 0,34 = 2058
	this.height = window.innerHeight / this.zoom // 500 / 0,34 = 1470



	this.left = this.centerX - this.width / 2
	// console.log(`this.left - ${this.left}`);
	this.top = this.centerY - this.height / 2
	// console.log(`this.top - ${this.top}`);
	this.right = this.centerX + this.width / 2
	// console.log(`this.right - ${this.right}`);
	this.bottom = this.centerY + this.height / 2
	// console.log(`this.bottom - ${this.bottom}`);
}
app.update()

export {
	app
}
