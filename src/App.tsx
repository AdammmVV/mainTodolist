import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./components/Todolist";

export type StateType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

export const App = () => {

    const [state, setState] = useState<StateType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterType>('all')

    const inputCheckbox = (check: boolean, checkId:string) => {
        setState(state.map(el => el.id === checkId ? {...el,isDone: check} : {...el}))
    }

    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        setState([task, ...state])
    }

    const removeTask = (taskId:string) => {
                setState(state.filter(el => el.id !== taskId))
    }

    const tasksFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    let filterTasks = state

    if(filter === "active") {
        filterTasks = state.filter(f => !f.isDone)
    }
    if(filter === 'completed') {
        filterTasks = state.filter(f => f.isDone)
    }


    return (
        <div>
            <Todolist state={filterTasks}
                      addTask={addTask}
                      removeTask={removeTask}
                      tasksFilter={tasksFilter}
                      setCheckbox={inputCheckbox}
                      filter={filter}/>
        </div>
    )
}


