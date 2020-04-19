// -- Options
var options = {}

options.animate = (localStorage.getItem("animate") === "false") ? false : true;

document.getElementById("animate").addEventListener("click", function (e) {
  options.animate = !options.animate;
  localStorage.setItem("animate", options.animate);
  e.preventDefault();
});

window.options = options;
