import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule, MatListModule, MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule } from '@angular/material';


@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatExpansionModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatExpansionModule
    ]
})

export class MaterialModule {

}