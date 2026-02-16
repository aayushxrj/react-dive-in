
import { useEffect, useState } from "react";
import Item from "./Item"
import Button from "./Button";
import axios from "axios";

function List (){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const apiURL = "https://mocki.io/v1/5af01e4d-ed9f-4ed5-871f-2c7477860e25";

    useEffect(() => {
        axios
        .get(apiURL)
        .then((response) => {
            setItems(response.data);
            setLoading(false);
        })
        .catch((err) => {
            setError("Failed to fetch data");
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleToggle = (key) => {
        setItems(items => items.map(item =>
            item.id === key ? { ...item, completed: !item.completed } : item
        ));
    };

    const removeCompleted = () => {
        setItems(items => items.filter(item => !item.completed));
    };

    return (
        <div className="list">
            <ol>
                {items.length === 0 ? (<i>Nothing to do buddy. Sleep!</i>) :
                (
                    items.map((item) => (
                        <Item
                            key={item.id}
                            data={item.title}
                            done={item.completed}
                            onToggle={() => handleToggle(item.id)}
                        />
                    ))
                )}
            </ol>
            {items.length === 0 || (
                <Button
                    label="Remove Completed"
                    onClick={removeCompleted}
                    disabled={!items.some(item => item.completed)}
                />
            )}
        </div>
    )
}

export default List