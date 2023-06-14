import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { errorSelector, infoMessageSelector } from 'app/app.selectors';
import { clearNotifyState } from 'common/actions/clearNotifyState.action';

export const AppNotify = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorSelector);
  const infoMessage = useAppSelector(infoMessageSelector);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearNotifyState());
    }
    if (infoMessage) {
      toast.success(infoMessage);
      dispatch(clearNotifyState());
    }
  }, [dispatch, error, infoMessage]);

  return (
    <ToastContainer
      position='bottom-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='colored'
    />
  );
};