import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import React, { createContext, ReactNode, useContext } from "react";

export interface NotificationContextValue {
  notification: NotificationInstance;
}

const NotificationContext = createContext<NotificationContextValue>(
  {} as NotificationContextValue,
);

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={{ notification: api }}>
      {contextHolder}
      <>{children}</>
    </NotificationContext.Provider>
  );
};

const useNotify = () => useContext(NotificationContext);

export { useNotify };

export default NotificationProvider;
