import {add} from './string-calculator';


describe('String Calculator', () => {
    describe('add()', () => {
        it('should add one number correctly', () => {
            expect(add('1')).toEqual(1);
        });
        it('should add two numbers correctly', () => {
            expect(add('1,2')).toEqual(3);
        });
        it('should add any amount of numbers correctly', () => {
            expect(add('1,2,3,4,5')).toEqual(15);
        });
        it('should return 0 for empty input string', () => {
            expect(add('')).toEqual(0);
        });
        it('should add numbers separated by new line correctly', () => {
            expect(add('1\n2,3')).toEqual(6);
        });
        it('should omit extra separators correctly', () => {
            expect(add('1,\n')).toEqual(1);
        });
        it('should allow custom delimiter', () => {
            expect(add('//;\n1;2')).toEqual(3);
        });
        it('should throw an exception for negative number', () => {
            expect(() => add('-1,2')).toThrow('negatives not allowed: -1');
        });
        it('should throw an exception for negative numbers', () => {
            expect(() => add('//;\n-1;2;-3')).toThrow('negatives not allowed: -1,-3');
        });
        it('should ignore numbers bigger than 1000', () => {
            expect(add('2,1001')).toEqual(2);
        });
        it('should accept delimiters in any length', () => {
            expect(add('//[***]\n1***2***3')).toEqual(6);
        });
        it('should allow multiple delimiters', () => {
            expect(add('//[*][%]\n1*2%3')).toEqual(6);
        });
        it('should allow multiple delimiters with length longer than one char', () => {
            expect(add('//[***][%%%]\n1***2%%%3')).toEqual(6);
        });
    });
});
