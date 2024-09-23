import React, {useState} from 'react';
import FormInput from "./FormInput";
import PropTypes from "prop-types";

const BmiCalculator = (props) => {
    const {setBmiValue} = props;
    const [heightUnit, setHeightUnit] = useState('см');
    const [weightUnit, setWeightUnit] = useState('кг');
    const [unit, setUnit] = useState('Metric');
    const [count, setCount] = useState({
        heightCount: '0',
        inchesCount: '0',
        weightCount: '0',
    });

    const {heightCount, inchesCount, weightCount} = count;

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setCount(prevState => ({...prevState, [name]: value}));
    }

    const onSelectTag = (e) => {
        setUnit(e.target.value);
        setCount({
            heightCount: '0',
            weightCount: '0',
            inchesCount: '0',
        });
        setBmiValue(0);
        if (e.target.value === 'Metric') {
            setCount(prevState => ({...prevState, inchesCount: '0'}));
            setHeightUnit('см');
            setWeightUnit('кг');
        } else {
            setHeightUnit('фн');
            setWeightUnit('фт');
        }
    }

    const metricBMI = (height, weight) => {
        if (height > 0 && weight > 0) {
            const heightToMeter = height / 100;
            const bmi = weight / Math.pow(heightToMeter, 2);
            setBmiValue(Math.round(bmi));
        }
    }

    const imperialBMI = (height, weight, inches) => {
        if (height > 0 && weight > 0 && inches > 0) {
            const heightToInches = (height * 12) + parseInt(inches);
            const bmi = 703 * (weight / Math.pow(heightToInches, 2));
            setBmiValue(Math.round(bmi));
        }
    }

    const calculateBMI = () => {
        if(unit === 'Metric') {
            metricBMI(heightCount, weightCount);
        } else {
            imperialBMI(heightCount, weightCount, inchesCount);
        }
    }

    const resetData = (e) => {
        e.preventDefault();

        setBmiValue(0);
        setUnit('Metric');
        setCount({
            heightCount: '0',
            weightCount: '0',
            inchesCount: '0',
        });
        setWeightUnit('кг');
        setHeightUnit('см');
    }

    return (
        <>
            <div className="bmi-inputs">
                <div className="inputs-fields">
                    <div className="select-container">
                        <span className="label-unit">
                            Системы измерения
                        </span>
                        <div className="unit">
                            <select
                                name="unit"
                                value={unit}
                                className="form-control form-control-sm"
                                onChange={onSelectTag}
                            >
                                <option value="Metric">Метрическая</option>
                                <option value="Imperial">Английская</option>
                            </select>
                        </div>
                    </div>
                    <FormInput
                        name="heightCount"
                        title={`Рост (${heightUnit})`}
                        value={heightCount}
                        onChange={onChangeInput}
                        type="text"
                    />
                    {
                        unit === 'Imperial' ?
                            <FormInput
                                name="inchesCount"
                                title={` (in)`}
                                value={inchesCount}
                                onChange={onChangeInput}
                                type="text"
                            /> : null
                    }

                    <FormInput
                        name="weightCount"
                        title={`Вес (${weightUnit})`}
                        value={weightCount}
                        onChange={onChangeInput}
                        type="text"
                    />
                </div>
                <div className="button-container">
                    <button className="button" type="submit" onClick={calculateBMI}>
                        Рассчитать
                    </button>
                    <button className="button" onClick={resetData}>
                        Сброс
                    </button>
                </div>

            </div>
        </>
    );
};

BmiCalculator.propTypes = {
    setBmiValue: PropTypes.func.isRequired,
}

export default BmiCalculator;
