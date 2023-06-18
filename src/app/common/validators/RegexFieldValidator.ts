import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function RegexFieldValidator(emailRegex: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !emailRegex.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
