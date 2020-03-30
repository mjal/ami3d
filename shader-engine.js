function initGl(canvas, width, height) {
  const gl = canvas.getContext("webgl2");

  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return null;
  }

  gl.viewport(0, 0, width, height);

  return gl;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function initProgram(gl, vs_src, fs_src) {
  const vs = loadShader(gl, gl.VERTEX_SHADER, vs_src);
  const fs = loadShader(gl, gl.FRAGMENT_SHADER, fs_src);
  const program = gl.createProgram();

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }
  return program;
}

function makeQuad(gl) {
  const quad = gl.createBuffer();
  const positions = new Float32Array([
    -1.0,  1.0,
    1.0,  1.0,
    -1.0, -1.0,
    1.0, -1.0,
  ]);

  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  return quad;
}

function clear(gl) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function drawScene(gl, program, geometry, width, height, time) {
  const vertexPosition = gl.getAttribLocation(program, 'pos');

  clear(gl);

  gl.bindBuffer(gl.ARRAY_BUFFER, geometry);
  gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertexPosition);

  gl.useProgram(program);

  gl.uniform1f(gl.getUniformLocation(program, 'iTime'), time / 1000.0);
  gl.uniform2f(gl.getUniformLocation(program, 'iResolution'), width, height);

  /*gl.uniform1f(gl.getUniformLocation(program, 'iResolution'), time / 1000.0);*/

  gl.drawArrays(gl.TRIANGLE_STRIP, 0 /* offset */, 4 /* vertexCount */);
}
