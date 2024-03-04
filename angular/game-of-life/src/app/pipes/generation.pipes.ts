import {Pipe, PipeTransform} from '@angular/core';
import {Generation} from '../models/generation';

@Pipe({
    standalone: true,
    name: 'printGeneration'
})
export class PrintGenerationPipe implements PipeTransform {
    transform(generation: Generation): string {
        return generation.cells.map(row => row.map(cell => cell ? '❤️' : '☠️').join('')).join('\n');
    }
}
