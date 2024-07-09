import { ctx } from './canvas-setup.js'

const friction = 0.99

/**
 * Represents a particle that can be drawn on the canvas.
 * It has a position, radius, color, velocity, and alpha.
 * The alpha is used to control the opacity of the particle.
 */
export class Particles {
	constructor(x, y, radius, color, velocity) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity
		this.alpha = 1 // Initial alpha value
	}
	
	/**
	 * Draws the particle on the canvas.
	 */
	draw = () => {
		ctx.save()
		ctx.globalAlpha = this.alpha // Set the alpha of the particle
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		ctx.fillStyle = this.color
		ctx.fill()
		ctx.restore()
	}

	/**
	 * Updates the particle's position and alpha based on its velocity and friction.
	 */
	update = () => {
		this.draw()
		this.velocity.x *= friction // Apply friction to the x velocity
		this.velocity.y *= friction // Apply friction to the y velocity
		this.x = this.x + this.velocity.x // Update the x position
		this.y = this.y + this.velocity.y // Update the y position
		this.alpha -= 0.01 // Decrease the alpha by 0.01
	}
}
