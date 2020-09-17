import {FormGroup} from '@angular/forms';


export function checkFreeHours(
  controlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.value < 0) {
      control.setErrors({negativeFreeHours: true});
    } else {
      control.setErrors(null);
    }
  };
}
