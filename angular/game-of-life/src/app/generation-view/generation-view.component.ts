import {Component, input} from '@angular/core';
import {Generation} from '../models/generation';
import {PrintGenerationPipe} from '../pipes/generation.pipes';

@Component({
    selector: 'app-generation-view',
    standalone: true,
    imports: [
        PrintGenerationPipe
    ],
    templateUrl: './generation-view.component.html',
    styleUrl: './generation-view.component.scss'
})
export class GenerationViewComponent {
    generation = input.required<Generation>();
}
