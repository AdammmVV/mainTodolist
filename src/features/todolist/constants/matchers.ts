import { isFulfilled, isPending } from '@reduxjs/toolkit';
import { taskThunk } from 'features/tasks/tasks.slice';

const pendingEntityStatus = isPending(
  taskThunk.removeTask,
  taskThunk.createTask,
  taskThunk.updateTask
)

const fulfilledEntityStatus = isFulfilled(
  taskThunk.removeTask,
  taskThunk.createTask,
  taskThunk.updateTask
)

export {
  pendingEntityStatus,
  fulfilledEntityStatus
}