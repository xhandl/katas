import {PrintGenerationPipe} from './generation.pipes';
import {Generation} from '../models/generation';

describe('PrintGenerationPipe', () => {
    let pipe: PrintGenerationPipe;

    beforeEach(() => {
        pipe = new PrintGenerationPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return correct string - 1x1 false', () => {
        const generation: Generation = {
            iteration: 1,
            cells: [
                [false]
            ]
        };

        const result = pipe.transform(generation);
        expect(result).toBe('🪦');
    });

    it('should return correct string - 1x1 true', () => {
        const generation: Generation = {
            iteration: 1,
            cells: [
                [true]
            ]
        };

        const result = pipe.transform(generation);
        expect(result).toBe('❤️');
    });

    it('should return correct string - 5x5', () => {
        const generation: Generation = {
            iteration: 1,
            cells: [
                [true, true, true, true, true],
                [true, false, false, false, true],
                [true, false, true, false, true],
                [true, false, false, false, true],
                [true, true, true, true, true]
            ]
        };

        const result = pipe.transform(generation);
        expect(result).toBe('❤️❤️❤️❤️❤️\n❤️🪦🪦🪦❤️\n❤️🪦❤️🪦❤️\n❤️🪦🪦🪦❤️\n❤️❤️❤️❤️❤️');
    });

    it('should return empty string', () => {
        const generation: Generation = {
            iteration: 1,
            cells: []
        };

        const result = pipe.transform(generation);
        expect(result).toBe('');
    });
});
