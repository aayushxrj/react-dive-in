
function Item({ data, done, onToggle }) {
    return (
        <li
            className="item"
            onClick={onToggle}
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