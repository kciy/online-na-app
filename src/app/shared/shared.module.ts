import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatDividerModule,
        MatExpansionModule,
        MatTabsModule
    ],
    providers: [],
    exports: [
        MatCardModule,
        MatDividerModule,
        MatExpansionModule,
        MatTabsModule
    ],
    declarations: [],
    entryComponents: []
})
export class SharedModule {}