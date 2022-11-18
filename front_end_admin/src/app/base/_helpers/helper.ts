import { FormArray, FormControl, FormGroup } from "@angular/forms";

export function recursive(f: FormGroup | FormArray) {
    for (const i in f.controls) {
        if (typeof f.controls[i].value === 'string') {
            if (Boolean(f.controls[i].value)) {
                f.controls[i].value = f.controls[i].value.trim();
            }
        }

        if (f.controls[i] instanceof FormControl) {
            f.controls[i].markAsDirty();
            f.controls[i].updateValueAndValidity();
        } else {
            recursive(f.controls[i]);
        }
    }
};