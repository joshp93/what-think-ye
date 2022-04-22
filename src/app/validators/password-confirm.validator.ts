import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordValidator {
    static notMatch = (controlName: string, matchingControlName: string) => {
        return (control: AbstractControl): ValidationErrors | null => {
            const input = control.get(controlName);
            const matchingInput = control.get(matchingControlName);

            if (input === null || matchingInput === null) {
                return null;
            }

            if (matchingInput?.errors && !matchingInput.errors['notMatch']) {
                return null;
            }

            if (input.value !== matchingInput.value) {
                matchingInput.setErrors({ notMatch: true });
                return ({ notMatch: true });
            } else {
                matchingInput.setErrors(null);
                return null;
            }
        };
    }
}