// Angular
// -----------------------------------------------------------------------------------------------------
import {Injectable} from "@angular/core";
import {AbstractControl, FormGroup} from "@angular/forms";

// Functions
// -----------------------------------------------------------------------------------------------------
import {firstCapitalizeString} from "../prototypes/string-capitalize";

@Injectable({
  providedIn: 'root'
})
export class ValidationFormHelper {
  showErrorLabel(controlName: string, form: FormGroup, isSubmit: boolean): string {
    const formControl: AbstractControl | null = form.get(controlName);
    if (formControl?.touched && !formControl.valid) {
      if (formControl?.errors?.required) {
        return `${firstCapitalizeString(controlName)} is required`;
      }

      if (formControl?.errors?.minlength) {
        const minLength = ['password', 'title'].includes(controlName) ? 6 : 10;
        return `${firstCapitalizeString(controlName)} should be of minimum ${minLength} characters length`;
      }

      if (formControl?.errors?.email) return `Invalid email`;
    }

    if (isSubmit && formControl?.untouched && !formControl.valid)
      return `${firstCapitalizeString(controlName)} is required`;

    return '';
  }

  showError(controlName: string, form: FormGroup, isSubmit: boolean): boolean | undefined {
    const formControl: AbstractControl | null = form.get(controlName);
    return (isSubmit && formControl?.untouched && !formControl.valid)
      || (formControl?.touched && !formControl.valid);
  }
}
