var tsXXWn = `
#version 100
precision highp float;
uniform float iTime;
uniform vec2 iResolution;

// Using Inigo Quilez work
// https://www.shadertoy.com/view/Xds3zN

float map (vec3 pos) {
  float cell = 3.0;
  pos = mod(pos, cell)-cell/2.0;
  return length(pos)-1.0;
}

vec3 getNormal (vec3 pos) {
  vec2 e = vec2(1.0,-1.0)*0.5773*0.0005;
  return normalize( e.xyy*map( pos + e.xyy ) + 
                    e.yyx*map( pos + e.yyx ) + 
                    e.yxy*map( pos + e.yxy ) + 
                    e.xxx*map( pos + e.xxx ) );
}

void main()
{
  vec2 uv = (gl_FragCoord.xy-0.5*iResolution.xy)/iResolution.y;
  vec3 eye = vec3(cos(iTime/4.0),sin(iTime/4.0),-2.0);
  vec3 ray = normalize(vec3(uv, 1.0));
  float shade = 0.0;
  for (float index = 100.0; index > 0.0; --index) {
    float dist = map(eye);
    if (dist < 0.001) {
      shade = index / 100.0;
      break;
    }
    eye += ray * dist;
  }
  gl_FragColor = vec4((getNormal(eye) * 0.5 + 0.5) * shade, 1);
}
`;
