import { FormGroup, FormArray, FormControl } from '@angular/forms';
export function prepareSubmitForm(formGroup: FormGroup | FormArray): void {
    const recursive = (form: FormGroup | FormArray) => {
        for (const f in form.controls) {
            const control = form.controls[f];

            if (typeof control.value == 'string' && Boolean(control.value)) {
                control.setValue(control.value);
                console.log(control.value)
            }

            if (control instanceof FormControl) {
                control.markAsDirty();
                control.updateValueAndValidity();
            } else { 
                recursive(control);
            }
        }
    }
    recursive(formGroup);
}