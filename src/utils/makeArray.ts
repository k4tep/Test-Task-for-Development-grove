export async function makeTable(): Promise<boolean[][]> {
    const rows = Math.floor(Math.random() * 99) + 2;
    const cols = Math.floor(Math.random() * 99) + 2;
    const matrix: boolean[][] = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(Math.random() < 0.4);
        }
        matrix.push(row);
    }
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(matrix);
    }, 1500);
  });
}