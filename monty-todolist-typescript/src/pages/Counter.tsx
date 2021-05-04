import { useCallback, useState } from "react";
import Button from "../components/common/Button";
import { useSelector, useDispatch } from "react-redux";

import { increase, decrease } from "../modules/counter";
import { RootState } from "../modules";

function Counter() {
    const dispatch = useDispatch();

    const { count } = useSelector(({ counter }: RootState) => ({
        count: counter.count,
    }));

    const [value, setValue] = useState<string>("");

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);

    const onIncrease = useCallback(() => {
        dispatch(value === "" ? increase() : increase(Number(value)));
    }, [dispatch, value]);

    const onDecrease = useCallback(() => {
        dispatch(decrease());
    }, [dispatch]);

    return (
        <div>
            <input value={value} onChange={onChange} />
            {count}
            <Button onClick={onIncrease}>+</Button>
            <Button onClick={onDecrease}>-</Button>
        </div>
    );
}

export default Counter;
