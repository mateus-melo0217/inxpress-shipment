export type ValidationType = {
    required: string | boolean;
    min?: {value: number, message: string};
    max?: {value: number, message: string};
    minLength?: {value: number, message: string};
    maxLength?: {value: number, message: string};
}