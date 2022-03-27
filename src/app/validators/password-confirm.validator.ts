import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordConfirmValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        const dontMatch = control.get('password').value !== control.get('confirm_password').value;
        return dontMatch ? { passwordsDontMatch: true } : null;
    };
}