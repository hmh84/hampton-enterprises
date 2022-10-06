export interface FormInputProps {
    name: string;
    label?: string;
    setValue?: any;
    control: any;
    options?: FormInputOption[];
}

export interface FormInputOption {
    label: string;
    value?: string | number | readonly string[];
}
