import { FormControl } from "@angular/forms";

export interface MapAnamnese {
    key: string;
    required: boolean;
    render: boolean;
    label?: string;
    control: FormControl
}