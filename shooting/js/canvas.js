const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

width = canvas.width = window.innerWidth 
height = canvas.height = window.innerHeight 

ctx.fillRect(0, 0, width, height)

var x = canvas.width / 2
var y = canvas.height / 2
let player = new Player(x, y, 10, 'white')

player.draw();