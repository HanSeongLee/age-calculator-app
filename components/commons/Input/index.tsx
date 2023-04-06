import React, { InputHTMLAttributes } from 'react';
import styles from './style.module.scss';
import { Control, useController } from 'react-hook-form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import cn from 'classnames';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
    name: string;
    control: Control<any>;
    rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

const Input: React.FC<IProps> = ({
                                     control, name, rules, className,
                                     id, ...props
                                 }) => {
    const { field, fieldState: { error } } = useController({
        name,
        rules,
        control,
    });
    return (
        <div className={cn(styles.inputWrapper, {
            [styles.error]: error,
        }, className)}
        >
            <label htmlFor={id}>
                {name}
            </label>
            <input className={styles.input}
                   id={id}
                   name={name}
                   value={field.value}
                   onChange={field.onChange}
                   {...props}
            />
            <div className={styles.errorMessage}>
                {error?.message}
            </div>
        </div>
    );
};

export default Input;
