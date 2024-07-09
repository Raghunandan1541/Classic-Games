import { ctx } from './canvas-setup.js'
/**
 * Represents an enemy that can be drawn on the canvas.
 * It has a position, radius, color, and velocity.
 * The enemy moves in a random direction.
 */
export class Enemy {
	/**
	 * @param {number} x - The x-coordinate of the enemy's position.
	 * @param {number} y - The y-coordinate of the enemy's position.
	 * @param {number} radius - The radius of the enemy.
	 * @param {string} color - The color of the enemy.
	 * @param {Object} velocity - The velocity of the enemy.
	 * @param {number} velocity.x - The x-coordinate of the velocity.
	 * @param {number} velocity.y - The y-coordinate of the velocity.
	 */
	constructor(x, y, radius, color, velocity) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity
	}
	
	/**
	 * Draws the enemy on the canvas.
	 */
	draw = () => {
		
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		ctx.fillStyle = this.color
		ctx.fill()
	}

	/**
	 * Updates the position of the enemy based on its velocity.
	 */
	update = () => {
		this.draw()
		this.x = this.x + this.velocity.x
		this.y = this.y + this.velocity.y
	}
}

