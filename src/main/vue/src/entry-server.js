/**
 * 仅运行于服务器
 *
 *@author Terwer
 *@version 1.0
 *2019/2/27 10:00
 **/
import { createApp } from "./app";

export default context => {
  const { app } = createApp();
  return app;
};
