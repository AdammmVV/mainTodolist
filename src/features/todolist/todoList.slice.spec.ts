import { describe, it, expect } from '@jest/globals';
import {
  InitialTodolistStateType,
  todoListAction,
  todoListReducer,
  todoListThunk
} from 'features/todolist/todoList.slice';
import { FilterType, TodoListDomainType } from 'api/api';
import { clearAppState } from 'common/actions/clearAppState.action';

describe('todoList slice', () => {
  let initialState: InitialTodolistStateType[];
  const todoList1 = 'todoList-1';
  const todoList2 = 'todoList-2';
  const todoList3 = 'todoList-3';

  beforeEach(() => {
    initialState = [
      {
        id: todoList1,
        filter: 'all',
        entityStatus: false,
        order: 0,
        title: 'Main todoList-1',
        addedDate: '22.11'
      },
      {
        id: todoList2,
        filter: 'all',
        entityStatus: false,
        order: 0,
        title: 'Main todoList-2',
        addedDate: '22.11'
      }
    ];
  });

  it('should update the filter for a specific todo list when setTasksFilter action is dispatched', () => {
    const action = {
      type: todoListAction.setTasksFilter,
      payload: { todoListId: todoList2, filter: 'active' as FilterType }
    };
    const nextState = todoListReducer(initialState, action);
    expect(nextState[1].filter).toEqual('active');
    expect(nextState[0].filter).toEqual('all');
  });
  it('should update the entity status for specific todo lists when setEntityStatus action is dispatched', () => {
    const action = { type: todoListAction.setEntityStatus, payload: { todoListId: todoList1, entityStatus: true } };
    const nextState = todoListReducer(initialState, action);
    expect(nextState[0].entityStatus).toEqual(true);
    expect(nextState[1].entityStatus).toEqual(false);
  });
  it('should clear the todo lists when clearAppState action is dispatched', () => {
    const action = { type: clearAppState };
    const nextState = todoListReducer(initialState, action);
    expect(nextState).toEqual([]);
  });
  it('should populate the todo lists with data when getTodoList action is fulfilled', () => {
    const initialWithoutState = [] as InitialTodolistStateType[];
    const todoLists: TodoListDomainType[] = [
      {
        id: todoList1,
        order: 0,
        title: 'Main todoList-1',
        addedDate: '22.11'
      },
      {
        id: todoList2,
        order: 0,
        title: 'Main todoList-2',
        addedDate: '22.11'
      }
    ];
    const action = { type: todoListThunk.getTodoList.fulfilled.type, payload: { todoLists } };
    const nextState = todoListReducer(initialWithoutState, action);
    expect(nextState).toHaveLength(2);
    expect(nextState[0].filter).toEqual('all');
    expect(nextState[1].filter).toEqual('all');
    expect(nextState[0].entityStatus).toEqual(false);
    expect(nextState[1].entityStatus).toEqual(false);
  });
  it('should remove a specific todo list from state and reset its entityStatus when removeTodoList action is fulfilled', () => {
    const initialStateChanged = initialState.map(todo => todo.id === todoList1 ? {...todo, entityStatus: true} : todo)
    const action = { type: todoListThunk.removeTodoList.fulfilled.type, payload: { todoListId: todoList1 }, meta: {arg: { todoListId: todoList1 }}};
    const nextState = todoListReducer(initialStateChanged, action)
    expect(nextState).toHaveLength(1)
    expect(nextState[0].id).toEqual(todoList2)
    expect(nextState[0].entityStatus).toEqual(false)
  });
  it('should add a new todo list to state with default filter when createTodoList action is fulfilled', () => {
    const payload = {
      todoList:   {
        id: todoList3,
        order: 0,
        title: 'Main todoList-3',
        addedDate: '22.11'
      }
    }
    const action = { type: todoListThunk.createTodoList.fulfilled.type, payload }
    const nextState = todoListReducer(initialState, action)
    expect(nextState).toHaveLength(3)
    expect(nextState[0].id).toEqual(todoList3)
    expect(nextState[0].filter).toEqual('all')
    expect(nextState[0].entityStatus).toEqual(false)
  })
  it('should update the title and entityStatus of a specific todo list in the state when updateTodolist action is fulfilled', () => {
    const initialStateChanged = initialState.map(todo => todo.id === todoList2 ? {...todo, entityStatus: true} : todo)
    const payload = {
      todoListId: todoList2,
      title: 'Main todoList-2 Updated'
    }
    const action = { type: todoListThunk.updateTodolist.fulfilled.type, payload, meta: {arg: { todoListId: todoList2 }}}
    const nextState = todoListReducer(initialStateChanged, action)
    expect(nextState).toHaveLength(2)
    expect(nextState[1].title).toEqual('Main todoList-2 Updated')
    expect(nextState[1].entityStatus).toEqual(false)
  });
  it('should set the entityStatus to true for the specified todo list and false for other todo lists when updateTodolist action is pending', () => {
    const payload = {
      todoListId: todoList1,
      title: 'Main todoList-2 Updated'
    }
  const action = {type: todoListThunk.updateTodolist.pending.type, payload, meta: {arg: { todoListId: todoList1 }}}
    const nextState = todoListReducer(initialState, action)
    expect(nextState[0].entityStatus).toEqual(true)
    expect(nextState[1].entityStatus).toEqual(false)
  })
});
