import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarConfig, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

import { ScrollingModule } from '@angular/cdk/scrolling';

const modules = [
  CommonModule,
  ScrollingModule,
  MatProgressSpinnerModule, MatButtonModule, MatButtonToggleModule, MatCheckboxModule, MatTabsModule, MatCardModule,
  MatMenuModule, MatChipsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSidenavModule,
  MatToolbarModule, MatListModule, MatIconModule, MatSelectModule, MatExpansionModule, MatGridListModule,
  MatProgressBarModule, MatSortModule, MatPaginatorModule, MatTableModule, MatSlideToggleModule, MatTooltipModule,
  MatSnackBarModule, MatDatepickerModule, MatStepperModule, MatRadioModule, MatBadgeModule, MatDividerModule,
  MatAutocompleteModule,
];

export function defaultSnackBar(): MatSnackBarConfig<any> {
  const config = new MatSnackBarConfig();
  config.duration = 2000;
  config.panelClass = 'snack-bar-success';

  return config;
}

@NgModule({
  imports: [
    ...modules,
  ],
  declarations: [
  ],
  exports: [
    ...modules,
  ],
  entryComponents: [
    MatIcon
  ]
})
export class MaterialModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialModule,
      providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useFactory: defaultSnackBar },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    };
  }
}
