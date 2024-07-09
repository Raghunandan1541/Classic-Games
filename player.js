import { ctx } from './canvas-setup.js'
/**
 * Class representing a player on the canvas.
 * @property {number} x - The x-coordinate of the player's position.
 * @property {number} y - The y-coordinate of the player's position.
 * @property {number} radius - The radius of the player.
 * @property {string} color - The color of the player.
 */
export class Player {
	/**
	 * @param {number} x - The x-coordinate of the player's position.
	 * @param {number} y - The y-coordinate of the player's position.
	 * @param {number} radius - The radius of the player.
	 * @param {string} color - The color of the player.
	 */
	constructor(x, y, radius, color) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
	}

	/**
	 * Draws the player on the canvas.
	 */
	draw = () => {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		ctx.fillStyle = this.color
		ctx.fill()
	}
}