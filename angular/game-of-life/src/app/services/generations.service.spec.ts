import {GenerationsService} from './generations.service';
import {Generation} from '../models/generation';

describe('GenerationsService', () => {

    let generationsService: GenerationsService;

    beforeEach(() => {
        generationsService = new GenerationsService();
    });

    it('should calculate correct next generation', () => {
        const generation: Generation = {
            iteration: 1,
            cells: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, true, true, true, false],
                [false, false, false, false, false],
                [false, false, false, false, false]
            ]
        };

        const expectedCells = [
            [false, false, false, false, false],
            [false, false, true, false, false],
            [false, false, true, false, false],
            [false, false, true, false, false],
            [false, false, false, false, false]
        ];

        let result = generationsService.calculateNextGeneration(generation);
        expect(result).not.toBeNull();
        expect(result.iteration).toBe(2);
        expect(result.cells).toEqual(expectedCells);

        // Next generation should be the same as the first one
        result = generationsService.calculateNextGeneration(result);
        expect(result).not.toBeNull();
        expect(result.iteration).toBe(3);
        expect(result.cells).toEqual(generation.cells);
    });

    describe('parseInput', () => {

        it('should parse the first generation input correctly', () => {
            const input: string = '*****\n*...*\n*.*.*\n*...*\n*****';

            const expectedCells = [
                [true, true, true, true, true],
                [true, false, false, false, true],
                [true, false, true, false, true],
                [true, false, false, false, true],
                [true, true, true, true, true]
            ];

            let result = generationsService.parseInput(input);
            expect(result).toEqual(expectedCells);
        });
    });

    describe('countLiveNeighbours', () => {

        let cells: boolean[][];

        beforeEach(() => {
            cells = [
                [true, true, true, true, true],
                [true, false, false, false, true],
                [true, false, true, false, true],
                [true, false, false, false, true],
                [true, true, true, true, true]
            ];
        });

        it('should have correct neighbours count', () => {
            // @ts-ignore - test of private method
            let result = generationsService.countLiveNeighbours(cells, 0, 0);
            expect(result).toBe(2);

            // @ts-ignore - test of private method
            result = generationsService.countLiveNeighbours(cells, 0, 4);
            expect(result).toBe(2);

            // @ts-ignore - test of private method
            result = generationsService.countLiveNeighbours(cells, 4, 0);
            expect(result).toBe(2);

            // @ts-ignore - test of private method
            result = generationsService.countLiveNeighbours(cells, 4, 4);
            expect(result).toBe(2);

            // @ts-ignore - test of private method
            result = generationsService.countLiveNeighbours(cells, 1, 1);
            expect(result).toBe(6);

            // @ts-ignore - test of private method
            result = generationsService.countLiveNeighbours(cells, 2, 2);
            expect(result).toBe(0);
        });
    });

    describe('calculateNextCellStatus', () => {

        it('should check rule No. 1 - underpopulation', () => {
            // @ts-ignore - test of private method
            let result = generationsService.calculateNextCellStatus(true, -1);
            expect(result).toBe(false);

            // @ts-ignore - test of private method
            result = generationsService.calculateNextCellStatus(true, 0);
            expect(result).toBe(false);

            // @ts-ignore - test of private method
            result = generationsService.calculateNextCellStatus(true, 1);
            expect(result).toBe(false);
        });

        it('should check rule No. 2 - overcrowding', () => {
            // @ts-ignore - test of private method
            let result = generationsService.calculateNextCellStatus(true, 4);
            expect(result).toBe(false);

            // @ts-ignore - test of private method
            result = generationsService.calculateNextCellStatus(true, 5);
            expect(result).toBe(false);

            // @ts-ignore - test of private method
            result = generationsService.calculateNextCellStatus(true, 10);
            expect(result).toBe(false);
        });

        it('should check rule No. 3 - stay alive', () => {
            // @ts-ignore - test of private method
            let result = generationsService.calculateNextCellStatus(true, 2);
            expect(result).toBe(true);

            // @ts-ignore - test of private method
            result = generationsService.calculateNextCellStatus(true, 3);
            expect(result).toBe(true);
        });

        it('should check rule No. 4 - become alive', () => {
            // @ts-ignore - test of private method
            let result = generationsService.calculateNextCellStatus(false, 3);
            expect(result).toBe(true);
        });

        it('should check dead cell stays dead', () => {
            // @ts-ignore - test of private method
            let result = generationsService.calculateNextCellStatus(false, -1);
            expect(result).toBe(false);

            // @ts-ignore - test of private method
            result = generationsService.calculateNextCellStatus(false, 0);
            expect(result).toBe(false);

            // @ts-ignore - test of private method
            result = generationsService.calculateNextCellStatus(false, 1);
            expect(result).toBe(false);

            // @ts-ignore - test of private method
            result = generationsService.calculateNextCellStatus(false, 2);
            expect(result).toBe(false);

            // @ts-ignore - test of private method
            result = generationsService.calculateNextCellStatus(false, 4);
            expect(result).toBe(false);

            // @ts-ignore - test of private method
            result = generationsService.calculateNextCellStatus(false, 5);
            expect(result).toBe(false);

            // @ts-ignore - test of private method
            result = generationsService.calculateNextCellStatus(false, 10);
            expect(result).toBe(false);
        });
    });
});
