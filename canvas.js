// Query and cache the canvas element and its 2D rendering context
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// Resize the canvas to fit the window dimensions
canvas.width = window.innerWidth 
canvas.height = window.innerHeight 

// Cache important elements for later use
// These are the elements that control the game's UI
const scoreEl = document.querySelector('#scoreEl') // The element to display the player's score
const startGameBtn = document.querySelector('#startGameBtn') // The button to start the game
const modalEl = document.querySelector('#modalEl') // The modal element for the game over screen
const finalScoreEl = document.querySelector('#finalScoreEl') // The element to display the final score

/**
 * Class representing a player on the canvas.
 * @property {number} x - The x-coordinate of the player's position.
 * @property {number} y - The y-coordinate of the player's position.
 * @property {number} radius - The radius of the player.
 * @property {string} color - The color of the player.
 */
class Player {
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

class Projectile {
	/**
	 * @param {number} x - The x-coordinate of the projectile's position.
	 * @param {number} y - The y-coordinate of the projectile's position.
	 * @param {number} radius - The radius of the projectile.
	 * @param {string} color - The color of the projectile.
	 * @param {Object} velocity - The velocity of the projectile.
	 * @param {number} velocity.x - The x-component of the velocity.
	 * @param {number} velocity.y - The y-component of the velocity.
	 */
	constructor(x, y, radius, color, velocity) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity
	}
	
	/**
	 * Draws the projectile on the canvas.
	 */
	draw = () => {
		
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		ctx.fillStyle = this.color
		ctx.fill()
	}

	/**
	 * Updates the position of the projectile and redraws it.
	 */
	update = () => {
		this.draw()
		this.x = this.x + this.velocity.x
		this.y = this.y + this.velocity.y
	}
}

/**
 * Represents an enemy that can be drawn on the canvas.
 * It has a position, radius, color, and velocity.
 * The enemy moves in a random direction.
 */
class Enemy {
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

const friction = 0.99

/**
 * Represents a particle that can be drawn on the canvas.
 * It has a position, radius, color, velocity, and alpha.
 * The alpha is used to control the opacity of the particle.
 */
class Particles {
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


// Define the initial position of the player on the canvas
var x = canvas.width / 2
var y = canvas.height / 2

// Initialize the player with the initial position and other properties
let player = new Player(x, y, 10, 'white')

// Initialize empty arrays for projectiles, enemies, and particles
let projectiles = []
let enemies = []
let particles = []

/**
 * Initialize the game by resetting the player position, projectiles, enemies, and particles arrays.
 * Also reset the score displayed on the screen.
 */
function init() {
	player = new Player(x, y, 10, 'white') // Create a new player object
	projectiles = [] // Clear the projectiles array
	enemies = [] // Clear the enemies array
	particles = [] // Clear the particles array
	score = 0 // Reset the score
	scoreEl.innerHTML = score // Display the score on the screen
	finalScoreEl.innerHTML = score // Display the score on the final score display
}


/**
 * Spawns enemies at random locations on the canvas.
 * Each enemy is given a random radius, color, and velocity.
 * The enemy is spawned at a random location on the canvas, either at the top, bottom, left, or right edge.
 * The velocity of the enemy is calculated based on the angle between the player and the enemy's position on the canvas.
 * The spawn interval is set to 1000 milliseconds (1 second).
 */
function spawnEnemies() {
	setInterval(() => {
		// Generate a random radius between 5 and 30
		const radius = Math.random() * (30 - 5) + 5
		let x
		let y
		let cond = Math.random() < 0.5 // Generate a random boolean

		if(cond) { // Spawn enemy at top, bottom, left, or right edge
			x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
			y = Math.random() * canvas.height
		} else {
			x = Math.random() * canvas.width
			y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
		}

		// Generate a random color in the HSL color space
		const color = `hsl(${Math.random() * 360} , 50%, 50%)`

		// Calculate the angle between the player and the enemy's position on the canvas
		const angle = Math.atan2(
			canvas.height / 2 - y, 
			canvas.width / 2 - x
			)
			
		// Calculate the velocity of the enemy based on the angle
		const velocity = {
			x: Math.cos(angle),
			y: Math.sin(angle)
		}

		// Create a new enemy object and add it to the enemies array
		enemies.push(new Enemy(x, y, radius, color, velocity))
	}, 1000) // Spawn new enemy every 1 second
}

// This is the main animation loop
let animationId
let score = 0
function animate() {
	animationId = requestAnimationFrame(animate)

	// Clear the canvas
	ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	// Draw the player
	player.draw()

	// Update and remove particles
	particles.forEach((particle, index) => {
		if(particle.alpha <= 0) {
			particles.splice(index, 1)
		} else {
			particle.update()
		}
	})

	// Update and remove projectiles
	projectiles.forEach((projectile, index) => {
		projectile.update()

		if(
			projectile.x + projectile.radius < 0 ||
			projectile.x - projectile.radius > canvas.width ||
			projectile.y + projectile.radius < 0 ||
			projectile.y - projectile.radius > canvas.height
		) {
			setTimeout(() => {
				projectiles.splice(index, 1)
			}, 0)
		}
	})

	// Update and remove enemies
	enemies.forEach((enemy, index) => {
		enemy.update()

		const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

		if(dist - enemy.radius - player.radius < 1) {
			// If player collides with enemy, game over
			cancelAnimationFrame(animationId)
			modalEl.style.display = 'flex'
			finalScoreEl.innerHTML = score
		}

		projectiles.forEach((projectile, projectileIndex) => {
			const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

			if(dist - enemy.radius - projectile.radius < 1) {
				// If projectile collides with enemy, create particles
				for (let i = 0; i < enemy.radius * 2; i++) {
					particles.push(new Particles(
						projectile.x, 
						projectile.y, 
						Math.random() * 2, 
						enemy.color, 
						{
							x: (Math.random() - 0.5) * (Math.random() * 5),
							y: (Math.random() - 0.5) * (Math.random() * 5)
						}))
				}

				if(enemy.radius - 10 > 10) {
					// If enemy is not destroyed yet, reduce its size
					score += 100
					scoreEl.innerHTML = score

					gsap.to(enemy, {
						radius: enemy.radius - 10
					})
					setTimeout(() => {
						projectiles.splice(projectileIndex, 1)
					}, 0)
				} else {
					// If enemy is destroyed, give score and remove enemy and projectile
					score += 250
					scoreEl.innerHTML = score

					setTimeout(() => {
						enemies.splice(index, 1)
						projectiles.splice(projectileIndex, 1)
					}, 0)
				}
			}
		})
	})
}

/*
 * Event listener for the canvas click event
 * When canvas is clicked, create a new projectile at the center of the canvas
 * with a velocity calculated from the mouse position
 */
addEventListener('click', (event) => {
	// Calculate the angle between the mouse position and the center of the canvas
	const angle = Math.atan2(
		event.clientY - canvas.height / 2, 
		event.clientX - canvas.width / 2
		)

	// Calculate the velocity of the projectile based on the angle
	const velocity = {
		x: Math.cos(angle) * 5, // Multiply by 5 for faster projectile speed
		y: Math.sin(angle) * 5
	}
	
	// Create a new projectile with the calculated properties
	projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', velocity))
})

/*
 * Event listener for the startGameBtn click event
 * When startGameBtn is clicked, initialize the game, start the animation loop,
 * and spawn enemies at regular intervals
 */
startGameBtn.addEventListener('click', () => {
	init() // Initialize the game
	animate() // Start the animation loop
	spawnEnemies() // Start spawning enemies
	modalEl.style.display = 'none' // Hide the modal
})
