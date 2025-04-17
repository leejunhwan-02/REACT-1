import { useState } from "react";

export default function CountState() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <div>
            <button onClick={handleClick}>
                clicked {count} times
            </button>
        </div>
    );
}