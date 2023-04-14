import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

// API TodoList

export const todoListApi = {
    getTodoLists() {
        return instance.get<TodoListDomainType[]>('todo-lists')
            .then(res => res.data)
    },
    createTodoList(title: string) {
        return instance.post<null, AxiosResponse<CommonResponseType<{ item: TodoListDomainType }>>, {title: string}>('todo-lists', {title})
            .then(res => res.data)
    },
    removeTodoList(todoListId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoListId}`)
            .then(res => res.data)
    },
    updateTodolist(todoListId: string, title: string) {
        return instance.put<null, ResponseChangeTodoListType, {title: string}>(`todo-lists/${todoListId}`, {title})
            .then(res => res.data)
    }
}

// API Tasks

export const tasksApi = {
    getTasks(todoListId: string) {
        return instance.get<ResponseTasksType>(`todo-lists/${todoListId}/tasks`)
            .then(res => res.data)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<null, CommonResponseTaskType<TaskDomainType>, {title: string}>(`todo-lists/${todoListId}/tasks`, {title})
            .then(res => res.data)
    },
    updateTask(todoListId: string, taskId: string, module: TaskModuleType) {
        return instance.put<null, CommonResponseTaskType<TaskDomainType>, TaskModuleType>(`todo-lists/${todoListId}/tasks/${taskId}`, module)
            .then(res => res.data)
    },
    removeTask(todoListId: string, taskId: string) {
        return instance.delete<CommonResponseTaskType>(`todo-lists/${todoListId}/tasks/${taskId}`)
            .then(res => res.data)
    }
}

// types

export type TodoListDomainType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string []
    data: T
}
type ResponseChangeTodoListType = {
    resultCode: number
    messages: string []
    fieldsErrors: string[]
    data: {}
}

type TaskDomainType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type CommonResponseTaskType<T = {}> ={
    resultCode: number
    messages: string []
    fieldsErrors: string[]
    data: T
}
type ResponseTasksType = {
    totalCount: number
    error: string
    items: TaskDomainType[]
}
type TaskModuleType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
