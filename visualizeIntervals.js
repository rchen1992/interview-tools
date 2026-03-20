/**
 * Visualizes intervals on a shared number line.
 *
 * @param {number[][] | number[][][]} input - A single group of intervals [[s,e], ...]
 *                                            or multiple groups [[[s,e], ...], ...]
 *
 * @example
 * visualizeIntervals([[1, 5], [3, 8], [0, 2]]);
 *
 * @example
 * visualizeIntervals([
 *   [[0, 4], [6, 10]],  // group 1
 *   [[2, 7]],           // group 2
 * ]);
 */
function visualizeIntervals(input) {
  const FILLED = '█';
  const EMPTY  = '░';
  const SEP    = ' │ ';

  if (!Array.isArray(input) || input.length === 0) {
    console.log('(empty)');
    return;
  }

  const isInterval = (x) =>
    Array.isArray(x) && x.length === 2 &&
    typeof x[0] === 'number' && typeof x[1] === 'number';

  const groups = isInterval(input[0]) ? [input] : input;

  // Global bounds across all groups
  let min = Infinity, max = -Infinity;
  for (const group of groups) {
    for (const [s, e] of group) {
      if (s < min) min = s;
      if (e > max) max = e;
    }
  }

  const range    = max - min;
  const maxIdx   = Math.max(...groups.map(g => g.length - 1));
  const labelW   = String(maxIdx).length;
  const prefixW  = labelW + SEP.length;

  // Ruler: show value labels at every 5-unit tick
  function buildRuler() {
    const chars = Array(range + 1).fill(' ');
    for (let i = 0; i <= range; i++) {
      const val = min + i;
      if (val % 5 === 0) {
        const label = String(val);
        for (let j = 0; j < label.length && i + j <= range; j++) {
          chars[i + j] = label[j];
        }
      }
    }
    return ' '.repeat(prefixW) + chars.join('');
  }

  const ruler = buildRuler();
  console.log(ruler);

  for (let g = 0; g < groups.length; g++) {
    const group = groups[g];
    for (let i = 0; i < group.length; i++) {
      const [s, e] = group[i];
      let bar = '';
      for (let col = 0; col <= range; col++) {
        const v = min + col;
        bar += (v >= s && v <= e) ? FILLED : EMPTY;
      }
      const label = String(i).padStart(labelW);
      console.log(`${label}${SEP}${bar}  [${s}, ${e}]`);
    }
  }
}

module.exports = { visualizeIntervals };
