// --- Shader params
const fps  = 30;
const size = { x: 800, y: 600 }; /* should match canvas size */
const fragments = [XdGGzw, MlS3Rh, MdSXzz, /*WslyzX,*/ _3dXyWj];

// --- Bangs
var bangs = {};
bangs["g"]   = "https://www.google.fr/search?q={{query}}";
bangs["ddg"] = "https://www.duckduckgo.com/?q={{query}}";
bangs["yt"]  = "https://www.youtube.com/results?search_query={{query}}";
bangs["sc"]  = "https://www.soundcloud.com/search?q={{query}}";
bangs["w"]   = bangs["wen"] = "https://en.wikipedia.org/w/index.php?search={{query}}";
bangs["wfr"] = "https://fr.wikipedia.org/w/index.php?search={{query}}";
bangs["d"]   = bangs["den"] = "https://en.wiktionary.org/wiki/{{query}}":
bangs["dfr"] = "https://fr.wiktionary.org/wiki/{{query}}";

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
  document.getElementById("search").style = "";
}

// --- Render
const fragmentIndex = Math.floor(Math.random() * fragments.length);
const vs = `attribute vec4 pos; void main() { gl_Position = pos; }`;
const fs = fragments[fragmentIndex];
const canvas = document.querySelector("#glCanvas");
const gl = initGl(canvas, size.x, size.y);
const program = initProgram(gl, vs, fs);
const geometry = makeQuad(gl)
const startTime = (new Date()).getTime();
setInterval(function () {
  const currentTime = (new Date()).getTime();
  const time = currentTime - startTime;
  drawScene(gl, program, geometry, size.x, size.y, time);
}, 1000 / fps);
