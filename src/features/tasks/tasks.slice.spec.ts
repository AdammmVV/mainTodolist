import { describe, it, expect } from '@jest/globals';
import { InitialTasksStateType, tasksAction, tasksReducer, taskThunk } from 'features/tasks/tasks.slice';
import { TaskDomainType, TaskStatuses } from 'api/api';
import { clearAppState } from 'common/actions/clearAppState.action';

describe('tasks slice', () => {
  let initialState: InitialTasksStateType
  const todoList1 = 'todoList-1'
  const todoList2 = 'todoList-2'
  const todoList3 = 'todoList-3'

  beforeEach(() => {
    initialState = {
      [todoList1]: [
        {
          todoListId: todoList1,
          id: '123',
          status: TaskStatuses.New,
          startDate: '22.11',
          priority: 0,
          title: 'Hello Task',
          deadline: 'string',
          description: 'string',
          completed: false,
          order: 0,
          addedDate: '22.11'
        },
        {
          todoListId: todoList2,
          id: '234',
          status: TaskStatuses.New,
          startDate: '22.11',
          priority: 0,
          title: 'Hello Task-2',
          deadline: 'string',
          description: 'string',
          completed: false,
          order: 0,
          addedDate: '22.11'
        },
      ],
      [todoList2]: [
        {
          todoListId: 'todoList-2',
          id: '123-123',
          status: TaskStatuses.New,
          startDate: '22.10',
          priority: 0,
          title: 'Bay Task',
          deadline: 'string',
          description: 'string',
          completed: false,
          order: 0,
          addedDate: '22.11'
        },
        {
          todoListId: 'todoList-2',
          id: '234-123',
          status: TaskStatuses.New,
          startDate: '22.10',
          priority: 0,
          title: 'Bay Task-2',
          deadline: 'string',
          description: 'string',
          completed: false,
          order: 0,
          addedDate: '22.11'
        },
      ]
    };
  });
  it('should remove specific todo list from state when deleteTodoList action is dispatched', () => {
    const action = { type: tasksAction.deleteTodoList, payload: { todoListId: todoList1 } }
    const nextState = tasksReducer(initialState, action)
    expect(nextState[todoList1]).toBeUndefined()
  })
  it('should add an empty tasks array to state when createTasksState action is dispatched', () => {
    const action = { type: tasksAction.createTasksState, payload: { todoListId: todoList3}}
    const nextState = tasksReducer(initialState, action)
    expect(nextState[todoList3]).toEqual([])
  })
  it('should clear the tasks state when clearAppState action is dispatched', () => {
    const action = { type: clearAppState }
    const nextState = tasksReducer(initialState, action)
    expect(nextState).toEqual({})
  })
  it('1', () => {
    const tasks: TaskDomainType[] = [
      {
        todoListId: todoList3,
        id: '123-123-123',
        status: TaskStatuses.New,
        startDate: '22.10',
        priority: 0,
        title: 'New Task',
        deadline: 'string',
        description: 'string',
        completed: false,
        order: 0,
        addedDate: '22.11'
      },
      {
        todoListId: todoList3,
        id: '234-123',
        status: TaskStatuses.New,
        startDate: '22.10',
        priority: 0,
        title: 'New Task-2',
        deadline: 'string',
        description: 'string',
        completed: false,
        order: 0,
        addedDate: '22.11'
      },
    ]

    const action = { type: taskThunk.getTasks.fulfilled.type, payload: { todoListId: todoList3, tasks: tasks }}
    const nextState = tasksReducer(initialState, action)
    expect(nextState[todoList3]).toHaveLength(2)
    expect(nextState[todoList3][0].todoListId).toEqual(todoList3)
    expect(nextState[todoList3][1].title).toEqual('New Task-2')
  })
  it('2', () => {
    const task: TaskDomainType = {
      todoListId: todoList2,
      id: 'new-new',
      status: TaskStatuses.New,
      startDate: '22.10',
      priority: 0,
      title: 'New Task-Create',
      deadline: 'string',
      description: 'string',
      completed: false,
      order: 0,
      addedDate: '22.11'
    }

    const action = { type: taskThunk.createTask.fulfilled.type, payload: { todoListId: todoList2, task }}
    const nextState = tasksReducer(initialState, action)
    expect(nextState[todoList2]).toHaveLength(3)
    expect(nextState[todoList2][0].title).toEqual('New Task-Create')
    expect(nextState[todoList2][0].todoListId).toEqual(todoList2)
  })
})