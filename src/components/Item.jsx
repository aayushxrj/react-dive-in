import { useState } from "react"

function Item({ data }) {
    const [done, setDone] = useState(false);

    return (
        <li
            className="item"
            onClick={() => setDone((d) => !d)}
            style={{
                textDecoration: done ? "line-through" : "none",
                cursor: "pointer"
            }}
        >
            {data}
        </li>
    )
}

export default Item