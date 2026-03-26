function visualizeHistogram(heights) {
  if (!heights || heights.length === 0) return;

  const max = Math.max(...heights);

  for (let row = max; row >= 1; row--) {
    const line = heights.map(h => h >= row ? '█' : ' ').join(' ');
    console.log(line);
  }

  console.log(heights.map((_, i) => i + 1).join(' '));
}

// Example usage
visualizeHistogram([2,8,5,6,2,3]);
