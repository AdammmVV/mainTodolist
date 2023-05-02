import {statusCode, TaskDomainType, TaskModuleType, tasksApi} from "api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "app/store";

// Reducer
export const tasksReducer = (state: TasksStateType = {}, action: MainActionType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS":
            return {...state, [action.payload.todoListId]: action.payload.tasks}
        case "CREATE-TASK":
            const todoListId = action.payload.taskModel.todoListId
            return {
                ...state, [todoListId]: [action.payload.taskModel, ...state[todoListId]]
            }
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(f => f.id !== action.payload.taskId)
            }
        case "UPDATE-TASK":
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.domainModel} : t)
            }
        case "CREATE-TASKS":
            return {...state, [action.payload.keyTasks]: []}
        case "REMOVE-TASKS":
            delete state[action.payload.keyTasks]
            return state
        default:
            return state
    }
}

// Actions creator
export const setTasks = (todoListId: string, tasks: TaskDomainType[]) =>
    ({type: "SET-TASKS", payload: {tasks, todoListId}} as const)
export const createTaskAC = (taskModel: TaskDomainType) =>
    ({type: "CREATE-TASK", payload: {taskModel}} as const)
export const removeTaskAC = (todoListId: string, taskId: string) =>
    ({
        type: "REMOVE-TASK", payload: {
            todoListId,
            taskId
        }
    } as const)
export const createTasksAC = (keyTasks: string) =>
    ({type: "CREATE-TASKS", payload: {keyTasks}} as const)
export const removeTasksAC = (keyTasks: string) =>
    ({type: "REMOVE-TASKS", payload: {keyTasks}} as const)
export const updateTaskAC = (todoListId: string, taskId: string, domainModel: TaskModuleType) => ({
    type: "UPDATE-TASK", payload: {domainModel, todoListId, taskId}
} as const)

// Thunk creator
export const getTasksAT = (todoListId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todoListId)
        .then(res => {
            if (!res.error) {
                dispatch(setTasks(todoListId, res.items))
            } else {
                alert(res.error)
            }
        })
}
export const createTaskAT = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    tasksApi.createTask(todoListId, title)
        .then(res => {
            if (res.resultCode === statusCode.Ok) {
                dispatch(createTaskAC(res.data.item))
            } else {
                alert(res.messages)
            }
        })
}
export const removeTaskAT = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksApi.removeTask(todoListId, taskId)
        .then(res => {
            console.log(res)
            if (res.resultCode === statusCode.Ok) {
                dispatch(removeTaskAC(todoListId, taskId))
            } else {
                alert(res.messages)
            }
        })
}
export const updateTaskAT = (todoListId: string, taskId: string, domainModel: TaskModuleType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not find')
            return
        }
            const taskModel: TaskModuleType = {
                title: task.title,
                completed: task.completed,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                ...domainModel

        }
        tasksApi.updateTask(todoListId, taskId, taskModel)
            .then((res) => {
                if (res.resultCode === statusCode.Ok) {
                    dispatch(updateTaskAC(todoListId, taskId, taskModel))
                } else {
                    alert(res.messages)
                }
            })
    }

// Types
export type TasksStateType = {
    [key: string]: TaskDomainType[]
}
type MainActionType =
    | ReturnType<typeof setTasks>
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof createTasksAC>
    | ReturnType<typeof removeTasksAC>
    | ReturnType<typeof updateTaskAC>
