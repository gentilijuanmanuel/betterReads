import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule, MatExpansionModule, MatListModule, MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatCheckboxModule, MatSnackBarModule} from '@angular/material';


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
        MatCheckboxModule,
        MatSnackBarModule
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
        MatCheckboxModule,
        MatSnackBarModule
    ]
})

export class MaterialModule {

}