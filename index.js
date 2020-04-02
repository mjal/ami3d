// --- Shader params
const fps  = 30;
const size = { x: 800, y: 600 }; /* should match canvas size */
const fragments = [tsXXWn]; //[tsXXWn, XdGGzw, MlS3Rh, MdSXzz, _3dXyWj]; // wdXSWn /* crypt roots */

// --- Bangs
var bangs = {};
bangs["g"]   = "https://www.google.fr/search?q={{query}}";
bangs["ddg"] = "https://www.duckduckgo.com/?q={{query}}";
bangs["yt"]  = "https://www.youtube.com/results?search_query={{query}}";
bangs["sc"]  = "https://www.soundcloud.com/search?q={{query}}";
bangs["w"]   = bangs["wen"] = "https://en.wikipedia.org/w/index.php?search={{query}}";
bangs["wfr"] = "https://fr.wikipedia.org/w/index.php?search={{query}}";
bangs["d"]   = bangs["den"] = "https://en.wiktionary.org/wiki/{{query}}";
bangs["dfr"] = "https://fr.wiktionary.org/wiki/{{query}}";

// -- Options
var options = {}
options.animate = localStorage.getItem("animate");
if (options.animate === null) options.animate = true;
if (options.animate === "false") options.animate = false;
document.getElementById("animate").addEventListener("click", function (e) {
  options.animate = !options.animate;
  localStorage.setItem("animate", options.animate);
  e.preventDefault();
});

// -- Search
function doSearch(query) {
  var bang  = "g";
  var words = query.split(/\s+/);
  for (var i = 0; i < words.length; i++) {
    if (words[i].substring(0, 1) == '!' && bangs[words[i].substring(1)]) {
      bang = words[i].substring(1);
      words.splice(i, 1);
      break;
    }
  }
  window.location.href = bangs[bang].replace('{{query}}', words.join(' '))
} 
document.getElementById("search").value = "";
document.getElementById("search").addEventListener("keypress", function (e) {
  if (e.keyCode == 13)
    doSearch(document.getElementById("search").value);
});

search = window.location.search
if (search && search.match(/^\?q=/)) {
  query = search.substring(3).replace(/\/$/, '').replace(/\+/g, ' ');
  doSearch(decodeURIComponent(query));
} else {
  document.getElementById("tools").style = "";
}

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
  if (options.animate) {
    draw((new Date()).getTime() - startTime);
  }
}, 1000 / fps);
