import React, { FormHTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Input from 'components/commons/Input';
import ArrowIcon from '/public/icons/icon-arrow.svg';
import { Control } from 'react-hook-form';
import { ERROR_MESSAGES } from 'types/message';
import { isValid, parseISO } from 'date-fns';
import CountUp from 'react-countup';

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
    control: Control<any>;
    result?: AgeCalculatorResult;
}

const AgeCalculatorForm: React.FC<IProps> = ({ control, result, className, ...props }) => {
    const currentYear = new Date().getFullYear();
    const validateDate = (day: string, month: string, year: string) => {
        if (!day || !month || !year) {
            return true;
        }
        const date = parseISO(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
        const valid = isValid(date);
        return valid;
    };

    return (
        <form className={cn(styles.ageCalculatorForm, className)}
              {...props}
        >
            <div className={styles.fieldContainer}>
                <Input control={control}
                       id={'day'}
                       name={'day'}
                       placeholder={'DD'}
                       rules={{
                           required: ERROR_MESSAGES.FIELD_REQUIRED,
                           min: {
                               value: 1,
                               message: ERROR_MESSAGES.NOT_VALID_DAY,
                           },
                           max: {
                               value: 31,
                               message: ERROR_MESSAGES.NOT_VALID_DAY,
                           },
                           validate: (value, formValues) => {
                               const { day, month, year } = formValues;
                               return !validateDate(day, month, year) ? ERROR_MESSAGES.NOT_VALID_DATE : true;
                           },
                           deps: ['month', 'year'],
                       }}
                />
                <Input control={control}
                       id={'month'}
                       name={'month'}
                       placeholder={'MM'}
                       rules={{
                           required: ERROR_MESSAGES.FIELD_REQUIRED,
                           min: {
                               value: 1,
                               message: ERROR_MESSAGES.NOT_VALID_MONTH,
                           },
                           max: {
                               value: 12,
                               message: ERROR_MESSAGES.NOT_VALID_MONTH,
                           },
                           validate: (value, formValues) => {
                               const { day, month, year } = formValues;
                               return validateDate(day, month, year);
                           },
                           deps: ['day', 'year'],
                       }}
                />
                <Input control={control}
                       id={'year'}
                       name={'year'}
                       placeholder={'YYYY'}
                       rules={{
                           required: ERROR_MESSAGES.FIELD_REQUIRED,
                           min: {
                               value: 1,
                               message: ERROR_MESSAGES.NOT_VALID_YEAR,
                           },
                           max: {
                               value: currentYear,
                               message: ERROR_MESSAGES.NOT_FUTURE_YEAR,
                           },
                           validate: (value, formValues) => {
                               const { day, month, year } = formValues;
                               return validateDate(day, month, year);
                           },
                           deps: ['day', 'month'],
                       }}
                />
            </div>

            <div className={styles.buttonContainer}>
                <button className={styles.button}
                        type={'submit'}
                        title={'Calculate'}
                >
                    <ArrowIcon />
                </button>
            </div>

            <div className={styles.result}
                 key={result && `${result.years}-${result.months}-${result.days}`}
            >
                <div>
                    <strong>{result ? (
                        <CountUp end={result.years}
                                 duration={2}
                        />
                    ) : '--'}</strong> years
                </div>
                <div>
                    <strong>{result ? (
                        <CountUp end={result.months}
                                 duration={2}
                        />
                    ) : '--'}</strong> months
                </div>
                <div>
                    <strong>{result ? (
                        <CountUp end={result.days}
                                 duration={2}
                        />
                    ) : '--'}</strong> days
                </div>
            </div>
        </form>
    );
};

export default AgeCalculatorForm;
