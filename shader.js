// --- Params
const fps  = 30;
const size = { x: 800, y: 600 }; /* should match canvas size */
const fragments = [mandelbrot, tsXXWn, XdGGzw, MlS3Rh, MdSXzz, _3dXyWj]; // wdXSWn /* crypt roots */

// -- Render
const fragmentIndex = Math.floor(Math.random() * fragments.length);
const vs = `attribute vec4 pos; void main() { gl_Position = pos; }`;
const fs = fragments[fragmentIndex];
const canvas = document.querySelector("#glCanvas");
const gl = initGl(canvas, size.x, size.y);
const program = initProgram(gl, vs, fs);
const geometry = makeQuad(gl);
const startTime = (new Date()).getTime();
const r1 = Math.random(); const r2 = Math.random(); const r3 = Math.random();
const draw = function (time) { drawScene(gl, program, geometry, size.x, size.y, time, r1, r2, r3); }

draw(0);
setInterval(function () {
  if (window.options.animate) {
    draw((new Date()).getTime() - startTime);
  }
}, 1000 / fps);
