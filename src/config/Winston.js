import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "combinado.log",
    }),
    new winston.transports.File({
      filename: "http.log",
      level: "http",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

logger.add(new DailyRotateFile({
    filename:"logs/application-%DATE%.log",
    datePattern:"YYYY-MM-DD",
    maxSize:"20m",
    maxFiles:"14d"
}))