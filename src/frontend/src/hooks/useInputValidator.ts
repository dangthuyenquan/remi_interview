import React from "react";

const useInputValidator = (initialValue: TInputValue, validationRules:
    Array<{
        message: string
        validator: (value: TInputValue) => boolean
    }>
) => {
    const [value, setValue] = React.useState(initialValue);
    const [error, setError] = React.useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const validate = () => {
        for (const rule of validationRules) {
            const { validator, message } = rule;
            if (!validator(value)) {
                setError(message);
                return false;
            }
        }
        setError(null);
        return true;
    };

    return { value, error, handleChange, validate };
};

export default useInputValidator;

type TInputValue = string | number 