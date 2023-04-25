//eslint-disable-next-line no-unused-vars
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//eslint-disable-next-line no-unused-vars
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

//add imports
import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from '../api/apiSlice'
import Spinner from '../../components/spinner/Spinner'
const TodoList = () => {

    const [newTodo, setNewTodo] = useState('')
    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();



    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ userId: 1, title: newTodo, completed: false });
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
    if (isLoading) {
        content = <Spinner />
    } else if (isSuccess) {
        content = todos.map(todo => {
            return (
                <article key={todo.id}>
                    <div className="todo">
                        <input type="checkbox" checked={todo.completed} id={todo.id} onChange={() => updateTodo({ ...todo, completed: !todo.completed })} />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button className="trash" onClick={() => deleteTodo({id: todo.id})}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            )
        })
    } else if (isError) {
        content = <div className="error">{error}</div>
    }
    return (
        <main>
            <h1>To do list</h1>
            {/* <Spinner/> */}
            {newItemSection}
            {content}
        </main>
    )

}

export default TodoList
