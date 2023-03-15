import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TasksType[]
}

type MainActionType = InputCheckboxAT
    | AddTaskAT
    | RemoveTaskAT
    | ChangedTaskAT
    | AddNewTodoListAndTaskAT
    | RemoveTasksAT

export const tasksReducer = (state: TasksStateType = {}, action: MainActionType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK":
            const task: TasksType = {id: v1(), title: action.payload.newTitle, isDone: false}
            return {...state, [action.payload.todoListId]: [task, ...state[action.payload.todoListId]]}
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(f => f.id !== action.payload.taskId)
            }
        case "INPUT-CHECKBOX-CHECKED":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(m => m.id === action.payload.taskId ? {...m, isDone: action.payload.isDone} : m)
            }
        case "ADD-NEW-TODO-LIST-AND-TASK":
            return {...state, [action.payload.keyTasks]: []}
        case "REMOVE-TASKS":
            delete state[action.payload.keyTasks]
            return state
        default:
            return state
    }
}

type InputCheckboxAT = {
    type: "INPUT-CHECKBOX-CHECKED",
    payload: {
        todoListId: string
        taskId: string
        isDone: boolean
    }
}

export const inputCheckboxAC = (todoListId: string, taskId: string, isDone: boolean): InputCheckboxAT => {
    return {
        type: "INPUT-CHECKBOX-CHECKED",
        payload: {
            todoListId,
            taskId,
            isDone,
        }
    }
}

type AddTaskAT = {
    type: "ADD-TASK"
    payload: {
        todoListId: string
        newTitle: string
    }
}

export const addTaskAC = (todoListId: string, newTitle: string): AddTaskAT => {
    return {
        type: "ADD-TASK",
        payload: {
            todoListId,
            newTitle
        }
    }
}

type RemoveTaskAT = {
    type: "REMOVE-TASK",
    payload: {
        todoListId: string
        taskId: string
    }
}

export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskAT => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todoListId,
            taskId
        }
    }
}

type ChangedTaskAT = {
    type: "CHANGE-TASK",
    payload: {
        todoListId: string
        taskId: string
        newTitle: string
    }
}

export const changedTaskAC = (todoListId: string, taskId: string, newTitle: string): ChangedTaskAT => {
    return {
        type: "CHANGE-TASK",
        payload: {
            todoListId,
            taskId,
            newTitle
        }
    }
}

type AddNewTodoListAndTaskAT = {
    type: "ADD-NEW-TODO-LIST-AND-TASK",
    payload: {
        keyTasks: string
    }
}

export const addNewTodoListAndTaskAC = (keyTasks: string): AddNewTodoListAndTaskAT => {
    return {
        type: "ADD-NEW-TODO-LIST-AND-TASK",
        payload: {
            keyTasks
        }
    }
}

type RemoveTasksAT = {
    type: "REMOVE-TASKS"
    payload: {
        keyTasks: string
    }
}

export const removeTasksAC = (keyTasks: string): RemoveTasksAT => {
    return {
        type: "REMOVE-TASKS",
        payload: {
            keyTasks
        }
    }
}