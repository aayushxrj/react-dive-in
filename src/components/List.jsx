
import { useState } from "react";
import Item from "./Item"
import Button from "./Button";


function List (){
    const [items, setItems] = useState([
        { key: 1, data: "Read SpringBoot", done: false },
        { key: 2, data: "Complete assignments", done: false },
        { key: 3, data: "Prepare breakfast", done: false },
        { key: 4, data: "Sleep for 2 hours", done: false },
        { key: 5, data: "Take a shower", done: false }
    ]);


    const handleToggle = (key) => {
        setItems(items => items.map(item =>
            item.key === key ? { ...item, done: !item.done } : item
        ));
    };

    const removeCompleted = () => {
        setItems(items => items.filter(item => !item.done));
    };

    return (
        <div className="list">
            <ol>
                {items.length === 0 ? (<i>Nothing to do buddy. Sleep!</i>) :
                (
                    items.map((item) => (
                        <Item
                            key={item.key}
                            data={item.data}
                            done={item.done}
                            onToggle={() => handleToggle(item.key)}
                        />
                    ))
                )}
            </ol>
            {items.length === 0 || (
                <Button
                    label="Remove Completed"
                    onClick={removeCompleted}
                    disabled={!items.some(item => item.done)}
                />
            )}
        </div>
    )
}

export default List