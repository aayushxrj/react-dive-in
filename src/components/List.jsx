
import { useState } from "react";
import Item from "./Item"
import Button from "./Button";

function List (){
    const [items, setItems] = useState([
        { key: 1, data: "Read SpringBoot" },
        { key: 2, data: "Complete assignments" },
        { key: 3, data: "Prepare breakfast" },
        { key: 4, data: "Sleep for 2 hours" },
        { key: 5, data: "Take a shower" }
    ]);

    const handleEmpty = () => setItems([]);

    return (
        <div className="list">
            <ol>
                {items.length === 0 ? (<i>Nothing to do buddy. Sleep!</i>) :
                (
                    items.map((item) => (
                        <Item key={item.key} data={item.data}  />
                    ))
                )}
            </ol>

            {items.length ===0 || <Button label="Empty" onClick={handleEmpty} />}
        </div>
    )
}

export default List