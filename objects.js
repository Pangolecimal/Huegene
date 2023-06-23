class Grid {
	constructor(width, height, cell_size) {
		this.grid_size = { x: width, y: height }
		this.cell_size = cell_size
		this.cell_num = width / this.cell_size

		this.cells = createArray(2, width / cell_size)
		for (let i = 0; i < this.cell_num; i++) {
			for (let j = 0; j < this.cell_num; j++) {
				this.cells[i][j] = new Cell(
					(i + 0.5) * this.cell_size - this.grid_size.x / 2,
					(j + 0.5) * this.cell_size - this.grid_size.y / 2,
					this.cell_size,
					{ r: 0, g: 0, b: 0 },
				)
			}
		}

		for (let i = 0; i < num_seeds; i++) {
			const seed = random.array(random.array(this.cells))
			seed.color = {
				r: random.int(256),
				g: random.int(256),
				b: random.int(256),
			}
			seed.activate()
		}
	}

	update() {
		const n = this.cell_num
		const spreads = []

		for (let i = 0; i < this.cell_num; i++) {
			for (let j = 0; j < this.cell_num; j++) {
				if (this.cells[i][j].state === 0) continue

				const offsets = random.array_subset([
					[i + 1, j + 0],
					[i - 1, j + 0],
					[i + 0, j + 1],
					[i + 0, j - 1],
				])
				for (let k = 0; k < offsets.length; k++) {
					if (offsets[k][0] < 0 || offsets[k][0] >= n || offsets[k][1] < 0 || offsets[k][1] >= n) continue

					if (this.cells[offsets[k][0]][offsets[k][1]].state === 0)
						spreads.push([this.cells[i][j], this.cells[offsets[k][0]][offsets[k][1]]])
				}
			}
		}

		for (let i = 0; i < spreads.length; i++) spreads[i][0].spread(spreads[i][1])

		for (let i = 0; i < this.cell_num; i++) {
			for (let j = 0; j < this.cell_num; j++) {
				this.cells[i][j].update()
			}
		}
	}

	render() {
		stroke()
		rectMode('RADIUS')
		for (let i = 0; i < this.cell_num; i++) {
			for (let j = 0; j < this.cell_num; j++) {
				this.cells[i][j].render()
			}
		}
	}
}

class Cell {
	constructor(x, y, size, color) {
		this.x = x
		this.y = y
		this.size = size
		this.color = color

		//? 0=TAIL 1=HEAD   HEAD (active) -> TAIL (inactive)
		this.state = 0
	}

	activate() {
		this.state = 1
	}

	spread(cell) {
		if (cell.state === 1) return false
		cell.activate()
		cell.color = {
			r: this.color.r + random.sign() * random.float(strength.r),
			g: this.color.g + random.sign() * random.float(strength.g),
			b: this.color.b + random.sign() * random.float(strength.b),
		}
	}

	update() {
		// if (this.state === 0) return
		// this.color = {
		// 	r: this.color.r % 256,
		// 	g: this.color.g % 256,
		// 	b: this.color.b % 256,
		// }
	}

	render() {
		fill(`rgb(${this.color.r} ${this.color.g} ${this.color.b})`)
		// fill(`rgb(${this.state * 20} ${this.state * 20} ${this.state * 20})`)
		rect(this.x, this.y, this.size / 2, this.size / 2)
	}
}

/**
 * @typedef  {Object} Color
 * @property {number} r
 * @property {number} g
 * @property {number} b
 */

/**
 * @param {Color} color
 */
function derivate(color) {}
