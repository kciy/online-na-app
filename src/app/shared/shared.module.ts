import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatExpansionModule,
        MatTabsModule
    ],
    providers: [],
    exports: [
        MatCardModule,
        MatExpansionModule,
        MatTabsModule
    ],
    declarations: [],
    entryComponents: []
})
export class SharedModule {}