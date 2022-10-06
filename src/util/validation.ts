export const emailRegEx =
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
export const validateEmail = (input: string) => {
    return emailRegEx.test(input);
};

export const validateZip = (input: string) => {
    return input.length === 5;
};

export const phoneRegEx = /^(\([0-9]{3}\)) [0-9]{3}( |-|.)([0-9]{4})/;
export const validatePhone = (input: string) => {
    // Only validates whether the number is in the preferred format
    return phoneRegEx.test(input);
};
