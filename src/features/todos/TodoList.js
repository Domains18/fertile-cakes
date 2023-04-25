//eslint-disable-next-line no-unused-vars
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//eslint-disable-next-line no-unused-vars
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


const TodoList = () => {

    const [newTodo, setNewTodo] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewTodo('');
    }
    const newItemSection =
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Add a new todo item</label>
            <div className="new-todo">
                <input type="text" id='new-todo' value={newTodo} onChange={(e) => { setNewTodo(e.target.value) }} placeholder='Enter the todo' />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>

    //define conditional content
    let content;
    return (
        <main>
            <h1>To do list</h1>
            {newItemSection}
            {content}
        </main>
    )

}

export default TodoList
