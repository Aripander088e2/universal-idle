const keybinds = {
  shift: () => {},
  1: () => buyMaxGenerator(1),
  2: () => buyMaxGenerator(2),
  3: () => buyMaxGenerator(3),
  4: () => buyMaxGenerator(4),
  5: () => buyMaxGenerator(5),
  6: () => buyMaxGenerator(6),
  7: () => buyMaxGenerator(7),
  8: () => buyMaxGenerator(8),
  m: () => buyMaxAllGenerator(),
  b: () => buyGeneratorBoost(),
};

// Declaring it once is probably faster
window.onkeypress = _ => {
  const k = _.key.toLowerCase();
  if (keybinds[k]) keybinds[k]();
};