import { FormControl} from '@angular/forms';

export function isSemNumberExposed(
  maxSemNumberExposed: number,
) {
  return (formControl: FormControl) => {

    if (formControl.value < maxSemNumberExposed) {
      return {semNumberExposedError: true};
    } else {
      return false;
    }
  };
}
