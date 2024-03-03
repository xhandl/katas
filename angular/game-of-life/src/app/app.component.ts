import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Generation} from './models/generation';
import {GenerationsService} from './services/generations.service';
import {PrintGenerationPipe} from './pipes/generation.pipes';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatFormField, MatInput, MatButton, MatLabel, PrintGenerationPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    firstGeneration = `.......
.......
..***..
.......
.......`;

    generation = signal<Generation>({iteration: 0, cells: []});

    private generationService = inject(GenerationsService);

    onLoadFirstGeneration(startGenerationStr: string) {
        const generation = {
            iteration: 1,
            cells: this.generationService.parseInput(startGenerationStr)
        };

        this.generation.set(generation);
    }

    onCalculateNextGeneration() {
        const generation = this.generation();
        const nextGeneration = this.generationService.calculateNextGeneration(generation);
        this.generation.set(nextGeneration);
    }
}
