
import { useEffect, useState } from "react";
import Item from "./Item"
import Button from "./Button";
import axios from "axios";

function List (){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newTodo, setNewTodo] = useState("");

    const apiURL = "http://localhost:3001/todos";

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

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        
        const newItem = {
            id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
            title: newTodo.trim(),
            completed: false
        };
        
        axios.post(apiURL, newItem)
            .then((response) => {
                setItems([...items, response.data]);
                setNewTodo("");
            })
            .catch((err) => {
                console.error("Failed to add todo:", err);
            });
    };

    return (
        <div className="list">
            <form onSubmit={handleAddTodo} className="add-todo-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter a new todo..."
                    className="todo-input"
                />
                <Button label="Add Todo" onClick={handleAddTodo} disabled={!newTodo.trim()} />
            </form>
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