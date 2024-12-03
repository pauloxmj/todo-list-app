import {useState} from "react";
import styles from "./TodoList.module.css"

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(event){
        event.preventDefault();
        if(newTask.trim() !== ""){
            setTasks(prevTasks =>[...prevTasks, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((element, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            //Destructuring array to change task index/position
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks)
        }
    }

    function moveTaskDown(index){
        const updatedTasks = [...tasks];
        [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
        setTasks(updatedTasks)
    }

    return(
        <div className={styles.toDoList}>
            <h1>To-Do List</h1>
            <form onSubmit={addTask}>
                <input 
                    type="text" 
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}/>
                <button className={styles.addButton} type="submit">
                    Add
                </button>
            </form>
            <ol>
            {tasks.map((task, index) => 
                <li key={index}>
                    <span className={styles.text}>{task}</span>
                    <button 
                        className={styles.deleteButton} 
                        onClick={() => deleteTask(index)}>
                        Delete
                    </button>
                    <button 
                        className={styles.moveButton} 
                        onClick={() => moveTaskUp(index)}>
                        ⬆️
                    </button>
                    <button 
                        className={styles.moveButton} 
                        onClick={() => moveTaskDown(index)}>
                        ⬇️
                    </button>
                </li>
            )}
            </ol>
        </div>
    )
}