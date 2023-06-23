//#region // *** Preload ** //
const cnv = document.querySelector('.cnv')
const ctx = cnv.getContext('2d')
let [width, height] = [1000, 1000]
let aspectRatio = height / width
let doLoop = 1
const delta = 1 / 60
//#endregion

//#region // *** Variables *** //

const num_seeds = 1
const strength = {
	r: random.float(1, 10),
	g: random.float(1, 10),
	b: random.float(1, 10),
}
const grid = new Grid(width, height, 10)

//#endregion

//#region // *** Setup *** //
;(function setup() {
	size(width, height)
	translate(width / 2, height / 2, 'set')

	loop(log('%cloop started', 'font-size: 1rem; color: lightblue'))
})()
//#endregion

//#region // *** Update *** //
function update() {
	grid.update()
}
//#endregion

//#region // *** Render *** //
function render() {
	// background('rgba(0 0 0)')

	grid.render()
}
//#endregion

//#region // *** Loop *** //
function loop() {
	update()
	render()
	;(doLoop && setTimeout(loop, delta * 1000)) || log('%cloop ended', 'font-size: 1rem; color: lightgreen')
}
//#endregion
