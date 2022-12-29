import pino from "pino";
import pretty from "pino-pretty";

// const log = logger({
//     transport: {
//         target: "pino-pretty",
//         options: {
//             translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
//             ignore: "pid.hostname"
//         }
//     }
// });

const stream = pretty({
    levelFirst: true,
    colorize: true,
    ignore: "time,hostname,pid",
  });
  
  const log = pino(
    {
      name: "IAMM",
      level: process.env.NODE_ENV === "development" ? "debug" : "info",
    },
    stream
  );

export default log;