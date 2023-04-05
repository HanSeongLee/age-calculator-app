import React, { InputHTMLAttributes } from 'react';
import styles from './style.module.scss';
import { Control, useController } from 'react-hook-form';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
    name: string;
    control: Control<any>;
}

const Input: React.FC<IProps> = ({ control, name, className, ...props }) => {
    const { field } = useController({
        name,
        control,
    });
    return (
        <input className={styles.input}
               name={name}
               value={field.value}
               onChange={field.onChange}
               {...props}
        />
    );
};

export default Input;
