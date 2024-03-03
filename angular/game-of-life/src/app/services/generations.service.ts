import {Injectable} from '@angular/core';
import {Generation} from '../models/generation';

@Injectable(
    {providedIn: 'root'}
)
export class GenerationsService {

    parseInput(input: string): boolean[][] {
        if (!input) throw new Error('Input is required');

        const lines = input.split('\n').filter(x => x.length);
        const cells = lines.map(line => line.split('').map(cell => cell === '*'));
        return cells;
    };

    calculateNextGeneration(generation: Generation): Generation {

        if (generation.cells.length <= 1 || generation.cells[0].length <= 1) {
            throw new Error('Generation must be two dimensional array');
        }

        const cells = generation.cells;
        const nextCells = cells.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {

                // Determine the number of live neighbors
                const liveNeighbors = this.countLiveNeighbours(cells, rowIndex, colIndex);

                // Get current cell status
                const isAlive = cells[rowIndex][colIndex];
                const nextStatus = this.calculateNextCellStatus(isAlive, liveNeighbors);

                return nextStatus;
            });
        });

        return {
            iteration: generation.iteration + 1,
            cells: nextCells
        };
    }

    private countLiveNeighbours(cells: boolean[][], rowIndex: number, colIndex: number): number {
        let liveNeighbors = 0;

        const minRow = 0;
        const maxRow = cells.length - 1;
        const minCol = 0;
        const maxCol = cells[0].length - 1;

        const startRow = Math.max(rowIndex - 1, minRow);
        const endRow = Math.min(rowIndex + 1, maxRow);
        const startCol = Math.max(colIndex - 1, minCol);
        const endCol = Math.min(colIndex + 1, maxCol);

        for (let i = startRow; i <= endRow; i++) {
            for (let j = startCol; j <= endCol; j++) {
                // Skip current cell
                if (i === rowIndex && j === colIndex) {
                    continue;
                }

                if (cells[i][j]) {
                    liveNeighbors++;
                }
            }
        }

        return liveNeighbors;
    }

    private calculateNextCellStatus(isAlive: boolean, liveNeighbors: number): boolean {
        let nextStatus = isAlive;

        if (isAlive) {
            // Rule No. 1
            if (liveNeighbors < 2) {
                nextStatus = false;
            }
            // Rule No. 2
            else if (liveNeighbors > 3) {
                nextStatus = false;
            }
            // Rule No. 3
            // else: stay alive
        }
        // Rule No. 4
        else if (liveNeighbors === 3) {
            nextStatus = true;
        }

        return nextStatus;
    }
}
