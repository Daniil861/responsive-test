let log = console.log

// import Phaser from '../lib/phaser.js'
import { app } from '../lib/appScale.js'

export default class Game extends Phaser.Scene {
	constructor() {
		super('game')
	}

	preload() {
		this.load.image('bg', 'assets/background.png')
		this.load.image('logo', 'assets/chip-3.svg')
		this.load.image('fullscreen', 'assets/fullscreen.png')
	}

	create() {
		this.imageList = []
		let scaleLogo = 2

		// background -------------------------------------------------------------
		let bg = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'bg')

		bg.orgWidth = bg.displayWidth;
		bg.orgHeight = bg.displayHeight;
		bg.update = function () {
			console.log(bg);
			if (app.width * this.orgHeight / this.orgWidth < app.height) {
				this.displayWidth = app.height * this.orgWidth / this.orgHeight
				this.displayHeight = app.height
			} else {
				this.displayWidth = app.width
				this.displayHeight = app.width * this.orgHeight / this.orgWidth
			}
		}

		// logoCenter -------------------------------------------------------------
		let logoCenter = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'logo').setScale(scaleLogo)

		// fullscreen -------------------------------------------------------------
		let fullscreen = this.add.image(window.innerWidth / 2, window.innerHeight / 2 + window.innerHeight / 4, 'fullscreen').setScale(2).setInteractive()
		fullscreen.on('pointerup', function () {
			if (this.scale.isFullscreen) {
				this.scale.stopFullscreen();
				this.cameraUpdate()
			}
			else {
				this.scale.startFullscreen();
				this.cameraUpdate()
			}
		}, this);

		fullscreen.update = function () {
			this.setPosition(app.centerX, app.centerY + app.height / 4)
		}

		// logoLeftTop -------------------------------------------------------------
		let logoLeftTop = this.add.image(0, 0, 'logo').setScale(scaleLogo).setOrigin(0, 0)
		logoLeftTop.update = function () {
			this.setPosition(app.left, app.top)
		}

		// logoRightTop -------------------------------------------------------------
		let logoRightTop = this.add.image(0, 0, 'logo').setScale(scaleLogo).setOrigin(1, 0)
		logoRightTop.update = function () {
			this.setPosition(app.right, app.top)
		}

		// logoLeftBottom -------------------------------------------------------------
		let logoLeftBottom = this.add.image(0, 0, 'logo').setScale(scaleLogo).setOrigin(0, 1)
		logoLeftBottom.update = function () {
			this.setPosition(app.left, app.bottom)
		}

		// logoRightBottom -------------------------------------------------------------
		let logoRightBottom = this.add.image(0, 0, 'logo').setScale(scaleLogo).setOrigin(1, 1)
		logoRightBottom.update = function () {
			this.setPosition(app.right, app.bottom)
		}

		// text -------------------------------------------------------------
		var style = { font: ' 150px Arial', fill: "#ffeeff" };
		let text = this.add.text(app.centerX, app.centerY - 200, 'Qugurun', style).setOrigin(0.5)

		text.update = function () {
			this.text = window.innerWidth + ' ' + window.innerHeight
		}

		text.setInteractive({ cursor: 'pointer' })

		text.on('pointerover', function (event) {
			this.alpha = 0.5;
		});

		text.on('pointerout', function (event) {
			this.alpha = 1.0;
		});

		// -------------------------------------------------------------
		this.imageList.push(bg, fullscreen, logoLeftTop, logoRightTop, logoLeftBottom, logoRightBottom, text)

		// all sprite update
		for (let index = 0; index < this.imageList.length; index++) {
			this.imageList[index].update()
		}
		// -------------------------------------------------------------

		this.scale.on('resize', this.resize, this)

		this.cameraUpdate()
		this.resize()
	}

	cameraUpdate() {
		app.update()
		const camera = this.cameras.main
		camera.setZoom(app.zoom)
		camera.centerOn(app.centerX, app.centerY)
	}

	resize() {
		this.cameraUpdate()
		// all sprite update
		for (let index = 0; index < this.imageList.length; index++) {
			this.imageList[index].update()
		}
	}

}
