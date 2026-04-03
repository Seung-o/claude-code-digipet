// One-time script to decode braille art into a dot pattern for BrailleSpriteData

const brailleArt = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠔⡩⠠⡑⡩⢐⠲⣐⠢⢲⢐⠔⠢⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⢊⠅⡊⠔⡡⢂⠪⢐⠡⠢⠩⡲⡐⠡⡑⠌⠜⡐⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢢⢑⠌⢔⠨⢂⢕⢼⠔⠥⡑⢌⢊⠌⡪⠢⡑⠌⢌⢊⠬⡨⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⢘⠒⢅⠢⡑⠴⡯⣳⡀⢀⡸⡆⠢⡡⢑⠅⡊⢌⠢⢂⠅⢍⠢⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢆⠢⡑⡡⢂⠢⠡⡯⡻⣿⢿⢏⣇⠕⡨⢐⠌⡂⢅⠪⡐⡡⢑⠌⠌⠕⡢⣀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠡⢊⠔⡐⢅⠪⠨⡘⡪⡧⡠⡓⠍⡢⠨⡂⠪⡐⡡⢊⢐⠌⢔⠨⢊⠌⡂⡢⢑⠢⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⠨⢂⢌⠢⡁⡪⠨⢂⠕⡈⡂⡪⠨⡐⡡⠊⢌⠔⡐⡡⢂⠕⡐⢅⠣⣑⢐⠌⠔⡡⢊⡄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⡈⡂⡢⢑⢐⠌⢌⢂⢞⠦⢕⠠⡑⠔⡐⠅⠕⡨⢐⠌⢔⠨⢂⠅⢍⢚⢐⠅⡑⡐⡱⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⡨⢐⠡⡂⢅⠕⡐⡡⠨⢂⢓⡸⡨⠴⠥⣑⢌⠔⡨⢂⠅⢅⠪⡐⠔⡐⢅⢊⠔⡸⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢢⠡⡚⢔⠨⢂⠌⡪⢐⠡⢂⠪⢐⠡⢂⠇⡓⡢⣡⣊⡔⠅⡢⢑⠌⡂⡢⠡⡊⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⢂⢊⢦⠡⡑⡨⢐⠔⡡⢑⠌⠢⡡⢑⠨⡐⠔⡐⡐⡐⠍⡒⢇⠪⡰⠨⠎⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⢓⢂⠆⡊⠕⠕⡚⡂⡣⢑⠰⠸⡨⡢⡱⡨⡢⡑⢌⢂⢊⠌⡂⢅⠊⡔⠉⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢊⠔⡐⢔⠨⢂⢑⠱⡐⡔⡨⢢⢱⢩⢪⠪⠚⠈⠀⠉⠉⠉⠈⠈⠊⠈⠉⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡨⢂⢌⠢⠡⡪⢐⠡⢊⠔⡨⢊⠪⡊⡣⡣⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡰⢈⢂⠢⠡⡕⢅⠢⡡⢑⢐⠌⠔⡁⡢⢂⢗⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡠⠠⡠⠠⢲⠨⢂⠅⢅⢽⡸⡠⡑⡐⢅⠢⢡⢑⠌⢔⢡⣣⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡇⡑⡐⢥⡃⠪⡐⡉⡲⣑⠎⡚⢚⠚⠌⢍⠅⠕⡨⠨⠡⡓⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢇⢂⠪⢸⠌⡊⠔⡐⢔⠨⢒⢌⢂⠅⡣⠡⢊⠌⡢⠡⢃⠚⡌⡊⡢⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⡄⢅⠅⢗⢌⢌⠢⠡⢊⠔⡨⢑⢪⢠⠡⡑⡨⢐⠡⡑⠌⡇⡂⡊⠔⡑⠤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠩⡢⠡⠩⢎⢆⠪⠨⡂⢅⢊⠔⡐⠅⢇⡂⡪⠐⢅⢊⠔⡇⡇⡎⠌⠔⡡⢊⠢⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⢇⢇⠍⢎⢎⢌⠔⡁⡢⢪⢂⠅⡅⠝⢦⠡⡑⡔⠵⠫⡪⡪⡌⡊⠔⡱⡅⡊⡢⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⡡⠡⢓⢕⢌⢂⠢⠡⢣⢣⠂⡅⡍⡱⣱⢜⠁⠀⠈⠚⡎⡆⡕⢠⠱⡱⡐⡘⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢌⠢⢑⢕⢅⠅⡣⣁⢧⣱⠌⡀⠡⠱⡐⡱⡀⠀⠀⠘⠵⣱⢐⠉⢓⠩⡀⢃⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⡠⢑⠸⢌⠪⢮⠊⡀⢁⠈⢣⡂⡂⢡⢃⢂⠇⠀⠀⠀⠀⠀⢢⠂⠸⠱⡈⡘⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡰⢂⢊⠔⠡⡂⢕⡍⢢⠂⢘⢠⢣⢙⢄⠌⡎⢴⠀⠀⠀⠀⠀⠀⠈⣎⠀⡂⠱⡀⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠠⡃⢆⠢⡪⢨⠢⠧⣄⡀⢪⠀⡇⡃⡂⣊⡦⡇⢎⠀⠀⠀⠀⠀⠀⠀⠡⡓⠀⠀⠁⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡰⢑⠌⡂⢅⠢⡑⠬⡒⡒⠬⡡⢣⠩⣑⡪⠢⡌⢍⠪⡪⠵⠔⠮⡒⣒⢆⢜⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢰⢑⠐⢅⠊⢔⠡⡨⠨⡂⡜⡉⠑⡔⡑⡡⢈⠑⡍⡐⢅⠢⡡⢡⠕⡉⠣⡠⢑⢐⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠒⠕⠅⡎⣔⣅⢦⢑⢔⠅⡂⢅⠸⣐⢐⢐⢐⢘⡐⠄⡇⣊⠼⡐⡐⡐⣘⠄⠆⠇⠅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠈⠀⠁⠁⠈⠈⠁⠉⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`;

const BRAILLE_BASE = 0x2800;
const DOT_BITS = [
  [0x01, 0x08],
  [0x02, 0x10],
  [0x04, 0x20],
  [0x40, 0x80],
];

const lines = brailleArt.split('\n').filter(l => l.length > 0);

// Find actual dimensions
const maxCols = Math.max(...lines.map(l => [...l].length));
const pixelRows = lines.length * 4;
const pixelCols = maxCols * 2;

console.log(`// Braille art: ${lines.length} lines x ${maxCols} max chars`);
console.log(`// Pixel grid: ${pixelRows} rows x ${pixelCols} cols`);

// Create pixel grid
const grid = Array.from({length: pixelRows}, () => Array(pixelCols).fill('.'));

for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
  const chars = [...lines[lineIdx]];
  for (let colIdx = 0; colIdx < chars.length; colIdx++) {
    const code = chars[colIdx].codePointAt(0) - BRAILLE_BASE;
    if (code <= 0) continue;

    for (let dr = 0; dr < 4; dr++) {
      for (let dc = 0; dc < 2; dc++) {
        if (code & DOT_BITS[dr][dc]) {
          const py = lineIdx * 4 + dr;
          const px = colIdx * 2 + dc;
          grid[py][px] = 'A';
        }
      }
    }
  }
}

// Trim empty rows/cols
let minRow = pixelRows, maxRow = 0, minCol = pixelCols, maxCol = 0;
for (let r = 0; r < pixelRows; r++) {
  for (let c = 0; c < pixelCols; c++) {
    if (grid[r][c] !== '.') {
      minRow = Math.min(minRow, r);
      maxRow = Math.max(maxRow, r);
      minCol = Math.min(minCol, c);
      maxCol = Math.max(maxCol, c);
    }
  }
}

console.log(`// Trimmed bounds: rows [${minRow}..${maxRow}], cols [${minCol}..${maxCol}]`);
console.log(`// Trimmed size: ${maxRow - minRow + 1} rows x ${maxCol - minCol + 1} cols`);

// Pad to align to 4-row and 2-col boundaries for clean braille rendering
const startRow = minRow - (minRow % 4);
const startCol = minCol - (minCol % 2);
const endRow = maxRow + (4 - ((maxRow + 1) % 4)) % 4;
const endCol = maxCol + (maxCol % 2 === 0 ? 1 : 0);

console.log(`// Aligned bounds: rows [${startRow}..${endRow}], cols [${startCol}..${endCol}]`);
console.log(`// Aligned size: ${endRow - startRow + 1} rows x ${endCol - startCol + 1} cols`);
console.log('');

// Output trimmed pattern
const trimmedRows = [];
for (let r = startRow; r <= endRow; r++) {
  let row = '';
  for (let c = startCol; c <= endCol; c++) {
    row += grid[r][c];
  }
  trimmedRows.push(row);
}

console.log('const pattern = [');
for (const row of trimmedRows) {
  console.log(`  '${row}',`);
}
console.log('];');
