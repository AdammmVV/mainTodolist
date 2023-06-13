import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
});

// API TodoList
export const todoListApi = {
  getTodoLists() {
    return instance
      .get<TodoListDomainType[]>('todo-lists')
      .then((res) => res.data);
  },
  createTodoList(title: string) {
    return instance
      .post<{},
        AxiosResponse<CommonResponseType<{ item: TodoListDomainType }>>,
        { title: string }
      >('todo-lists', { title })
      .then((res) => res.data);
  },
  removeTodoList(todoListId: string) {
    return instance
      .delete<CommonResponseType>(`todo-lists/${todoListId}`)
      .then((res) => res.data);
  },
  updateTodolist(todoListId: string, title: string) {
    return instance
      .put<{}, AxiosResponse<ResponseChangeTodoListType>, { title: string }>(
        `todo-lists/${todoListId}`,
        { title }
      )
      .then((res) => res.data);
  },
};

// API tasks
export const tasksApi = {
  getTasks(todoListId: string) {
    return instance
      .get<ResponseTasksType>(`todo-lists/${todoListId}/tasks`)
      .then((res) => res.data);
  },
  createTask(todoListId: string, title: string) {
    return instance
      .post<
        {},
        AxiosResponse<CommonResponseTaskType<TaskDomainType>>,
        { title: string }
      >(`todo-lists/${todoListId}/tasks`, { title })
      .then((res) => res.data);
  },
  updateTask(todoListId: string, taskId: string, module: TaskModuleType) {
    return instance
      .put<
        {},
        AxiosResponse<CommonResponseTaskType<TaskDomainType>>,
        TaskModuleType
      >(`todo-lists/${todoListId}/tasks/${taskId}`, module)
      .then((res) => res.data);
  },
  removeTask(todoListId: string, taskId: string) {
    return instance
      .delete<CommonResponseTaskType>(
        `todo-lists/${todoListId}/tasks/${taskId}`
      )
      .then((res) => res.data);
  },
};

//API Auth
export const authApi = {
  getMe() {
    return instance
      .get<CommonResponseType<{ id: number; email: string; login: string }>>(
        'auth/me'
      )
      .then((res) => res.data);
  },
  logIn(data: DataRequestLoginType) {
    return instance
      .post<
        {},
        AxiosResponse<CommonResponseType<{ userId: number }>>,
        DataRequestLoginType
      >('auth/login', data)
      .then((res) => res.data);
  },
  logout() {
    return instance
      .delete<CommonResponseType>('auth/login')
      .then((res) => res.data);
  },
};

// types
export type FilterType = 'all' | 'active' | 'completed';
export type DataRequestLoginType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};
export type TodoListDomainType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
  filter: FilterType;
  entityStatus: boolean;
};
type CommonResponseType<T = {}> = {
  resultCode: number;
  messages: string[];
  data: T;
};
type ResponseChangeTodoListType = {
  resultCode: number;
  messages: string[];
  fieldsErrors: string[];
  data: {};
};
export type TaskDomainType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
type CommonResponseTaskType<T = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: string[];
  data: {
    item: T;
  };
};
type ResponseTasksType = {
  totalCount: number;
  error: string;
  items: TaskDomainType[];
};
export type TaskModuleType = {
  title?: string;
  description?: string;
  completed?: boolean;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};
export enum StatusCode {
  Ok = 0,
  error = 1,
  captcha = 10,
}
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}
