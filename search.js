// --- Bangs
var bangs = {};
bangs["g"]   = "https://www.google.fr/search?q={{query}}";
bangs["ddg"] = "https://www.duckduckgo.com/?q={{query}}";
bangs["yt"]  = "https://www.youtube.com/results?search_query={{query}}";
bangs["sc"]  = "https://www.soundcloud.com/search?q={{query}}";
bangs["wen"]   = bangs["w"] = "https://en.wikipedia.org/w/index.php?search={{query}}";
bangs["wfr"] = "https://fr.wikipedia.org/w/index.php?search={{query}}";
bangs["den"]   = bangs["d"] = "https://en.wiktionary.org/wiki/{{query}}";
bangs["dfr"] = "https://fr.wiktionary.org/wiki/{{query}}";
bangs["wr"]  = "https://www.wordreference.com/definition/{{query}}";
bangs["wres"] = "https://www.wordreference.com/definicion/{{query}}";

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
