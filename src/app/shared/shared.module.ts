import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatDividerModule,
        MatExpansionModule,
        MatIconModule,
        MatTabsModule,
        MatProgressBarModule
    ],
    providers: [],
    exports: [
        MatCardModule,
        MatDividerModule,
        MatExpansionModule,
        MatIconModule,
        MatTabsModule,
        MatProgressBarModule
    ],
    declarations: [],
    entryComponents: []
})
export class SharedModule {}