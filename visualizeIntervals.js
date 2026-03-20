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

  const SCALE  = 2; // characters per unit-length segment
  // Each block represents a length-1 segment [v, v+1], so there are (max-min) blocks total
  const range  = max - min;
  const maxIdx = Math.max(...groups.map(g => g.length - 1));
  const labelW = String(maxIdx).length;
  const prefixW = labelW + SEP.length;
  const totalW = range * SCALE; // bar width

  // Ruler: tick labels at integer boundaries (i.e. block edges), every 5 units + min
  function buildRuler() {
    const chars = Array(totalW + String(max).length + 1).fill(' ');
    for (let i = 0; i <= range; i++) {
      const val = min + i;
      if (val % 5 === 0 || val === min) {
        const label = String(val);
        const pos = i * SCALE;
        for (let j = 0; j < label.length && pos + j < chars.length; j++) {
          chars[pos + j] = label[j];
        }
      }
    }
    return ' '.repeat(prefixW) + chars.join('').trimEnd();
  }

  const ruler = buildRuler();
  console.log(ruler);

  for (let g = 0; g < groups.length; g++) {
    const group = groups[g];
    for (let i = 0; i < group.length; i++) {
      const [s, e] = group[i];
      let bar = '';
      // Block col covers segment [v, v+1]; filled iff that segment is inside [s, e]
      for (let col = 0; col < range; col++) {
        const v = min + col;
        bar += ((v >= s && v < e) ? FILLED : EMPTY).repeat(SCALE);
      }
      const label = String(i).padStart(labelW);
      console.log(`${label}${SEP}${bar}  [${s}, ${e}]`);
    }
  }
}
