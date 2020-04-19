const texts = [
  // Tao
  "Produire et faire croître, produire sans s'approprier,<br/>agir sans rien attendre, guider sans contraindre</br>c'est la vertu suprême.",
  "Parler rarement est conforme à la nature.",
  "Être bon à l'égard des bons et bon aussi envers ceux qui ne le sont pas,<br/>c'est posséder la bonté même.",
  "On régit un grand État comme on fait frire un petit poisson.",
  "Un voyage de mille lieux a commencé par un pas."
];

const textIndex = Math.floor(Math.random() * texts.length);

document.getElementById("maxime").innerHTML = texts[textIndex];
