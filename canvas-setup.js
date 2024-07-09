// Query and cache the canvas element and its 2D rendering context
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

export { canvas, ctx }