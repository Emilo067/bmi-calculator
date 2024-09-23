import React, {useState} from 'react';
import BmiCalculator from "./BmiCalculator";

const BMI = () => {
    const [bmiValue, setBmiValue] = useState(0);

    const getBmiClass = bmi => {
        if (bmi >= 1 && bmi <= 18.5) return {text: 'Недостаток веса', class: 'underweight', color: '#FED88B'};
        if (bmi >= 18.5 && bmi <= 24.9) return {text: 'Нормальный вес', class: 'normal', color: '#80ff80'};
        if (bmi >= 24.9 && bmi <= 29.9) return {text: 'Избыточный вес', class: 'overweight', color: '#FF7F50'};
        if (bmi >= 30) return {text: 'Ожирение', class: 'obese', color: '#FF5411'};

        return ''
    }

    const bmiCategory = getBmiClass(bmiValue);

    return (
        <>
            <div
                className="calculator"
                style={{background: bmiCategory.color}}
            >
                <h3>ИМС калькулятор</h3>
                <div className="bmi-result-container">
                    <div className="bmi-result">
                        <div className="bmi-result-number">
                            Индекс массы тела (ИМС) = {bmiValue}
                        </div>
                        <div className={`bmi-category ${bmiCategory.class}`}>
                            {bmiCategory.text}
                        </div>
                    </div>
                </div>

                <BmiCalculator setBmiValue={setBmiValue}/>
            </div>
        </>
    );
};

export default BMI;
