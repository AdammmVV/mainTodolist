import { createAction } from '@reduxjs/toolkit';

export const setInfoMessageAction = createAction<{infoMessage: string}>('app/setInfoMessage')