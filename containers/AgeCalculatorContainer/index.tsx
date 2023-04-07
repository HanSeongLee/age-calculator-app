import React, { useState } from 'react';
import AgeCalculatorForm from 'components/AgeCalculatorForm';
import { useForm } from 'react-hook-form';

type IForm = {
    day: number;
    month: number;
    year: number;
};

const AgeCalculatorContainer: React.FC = () => {
    const [result, setResult] = useState<AgeCalculatorResult | undefined>();
    const { control, handleSubmit } = useForm<IForm>();

    const calculateAge = (day: number, month: number, year: number): AgeCalculatorResult => {
        const birthDate = new Date(year, month - 1, day);
        const now = new Date();
        let ageYears = now.getFullYear() - birthDate.getFullYear();
        let ageMonths = now.getMonth() - birthDate.getMonth();
        let ageDays = now.getDate() - birthDate.getDate();

        if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
            ageYears--;
            ageMonths += 12;
        }

        if (ageDays < 0) {
            const daysInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            ageDays += daysInLastMonth;
            ageMonths--;
        }

        return { years: ageYears, months: ageMonths, days: ageDays };
    };

    const onSubmit = (data: IForm) => {
        const { day, month, year } = data;
        if (!day || !month || !year) {
            return;
        }

        setResult(calculateAge(day, month, year));
    };

    return (
        <AgeCalculatorForm control={control}
                           onSubmit={handleSubmit(onSubmit)}
                           result={result}
        />
    );
};

export default AgeCalculatorContainer;
