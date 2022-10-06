import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

import { FormInputProps } from './formInputProps';

export const FormInputText = ({ name, control, sx, ...rest }: FormInputProps & TextFieldProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange }, fieldState: { error }, formState: { isSubmitting } }) => (
                <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    disabled={isSubmitting}
                    size="small"
                    sx={{
                        borderRadius: 1,
                        '.MuiOutlinedInput-root': { backgroundColor: '#fff' },
                        '.MuiInputBase-input': { pl: 1 },
                        '.MuiFormHelperText-root.Mui-error': {
                            backgroundColor: '#e01f26',
                            color: '#fff',
                            pl: 0.5,
                            mt: 0,
                            mx: 1,
                            fontWeight: 600,
                            borderBottomLeftRadius: '3px',
                            borderBottomRightRadius: '3px',
                        },
                        ...sx,
                    }}
                    {...rest}
                />
            )}
        />
    );
};
