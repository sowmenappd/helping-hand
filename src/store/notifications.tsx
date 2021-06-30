import React, { createContext, useContext, useReducer } from "react";
import produce from "immer";

import { Dispatch, NOTIFICATION_TYPES } from "./types";
import db from "../controller/db";
import { makeAuthConfigWithToken } from "../controller/misc";

const initialState: any = {
  data: [],
  loading: true,
  error: false,
};

const NotificationsContext = createContext(initialState);
export const useNotificationsContext = () => {
  return useContext(NotificationsContext);
};

const notificationsReducer = (state: any, action: Dispatch) => {
  switch (action.type) {
    case NOTIFICATION_TYPES.FETCH_NOTIFICATIONS:
      state.loading = true;
      state.data = [];
      state.error = false;
      break;
    case NOTIFICATION_TYPES.FETCH_NOTIFICATIONS_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = false;
      break;
    case NOTIFICATION_TYPES.FETCH_NOTIFICATIONS_ERROR:
      state.loading = false;
      state.data = [];
      state.error = true;
      break;
    case NOTIFICATION_TYPES.READ_NOTIFICATION:
      const idx = state.data.findIndex((n: any) => n.id === action.payload);
      state.data[idx].read = true;
      break;
  }
};

const NotificationsStoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    produce(notificationsReducer),
    initialState
  );

  return (
    <NotificationsContext.Provider value={[state, dispatch]}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsStoreProvider;

////////////////////////////////////////////////////////////

//                    DISPATCH FUNCTIONS

////////////////////////////////////////////////////////////

export const fetchNotifications = (
  username: string,
  dispatch: (action: Dispatch) => void,
  token: string
) => {
  const config = makeAuthConfigWithToken(token);

  dispatch({
    type: NOTIFICATION_TYPES.FETCH_NOTIFICATIONS,
  });

  const query = `SELECT * FROM ${process.env.NODE_ENV}.notifications WHERE username = "${username}" AND read = "false"`;

  db.executeSQLQuery(query, config)
    .then(({ data }) => {
      dispatch({
        type: NOTIFICATION_TYPES.FETCH_NOTIFICATIONS_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: NOTIFICATION_TYPES.FETCH_NOTIFICATIONS_ERROR,
      });
    });
};
export const readNotification = (
  id: string,
  dispatch: (action: Dispatch) => void,
  token: string
) => {
  const config = makeAuthConfigWithToken(token);
  const query = `UPDATE ${process.env.NODE_ENV}.notifications SET read = "true" WHERE id = "${id}"`;

  dispatch({
    type: NOTIFICATION_TYPES.READ_NOTIFICATION,
    payload: id,
  });
  return db.executeSQLQuery(query, config).catch((err) => {
    console.log(err.message);
  });
};
