import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule, MatExpansionModule, MatListModule, MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatCheckboxModule } from '@angular/material';


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
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatCheckboxModule
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
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatCheckboxModule
    ]
})

export class MaterialModule {

}