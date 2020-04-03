var mandelbrot = `
#version 100
precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform float iR1;
uniform float iR2;
uniform float iR3;

vec2 next(vec2 c, vec2 uv) {
  return vec2(c.x + uv.x * uv.x - uv.y * uv.y, c.y + 2.0 * uv.x * uv.y);
}

void main()
{
  vec2 uv2;
	vec2 uv = gl_FragCoord.xy / iResolution.xy;
  uv = uv * 3.0 - vec2(2.0, 1.5);
  uv.x = uv.x + mod(iTime / 100., 0.5);
  uv.x = uv.x + mod(iTime / 50., 0.5);

  float iter = 0.0;

  uv2 = next(uv, uv);
  for (int k = 0; k < 20; k ++) {
    uv2 = next(uv, uv2);
    if (uv2.x + uv2.y < 2.0) {
      iter = float(k);
    }
  }

  float i = 1. - 1.0 / (iter / 10.);

  vec3 color = vec3(i * cos(iTime), i * sin(iTime), i * tan(iTime));

  gl_FragColor = vec4(color, 1.0);
}
`;
