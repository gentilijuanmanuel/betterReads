import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule, MatExpansionModule, MatListModule, MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule } from '@angular/material';


@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatExpansionModule,
        MatChipsModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatExpansionModule,
        MatChipsModule
    ]
})

export class MaterialModule {

}