var winston = require("winston"),
  createLogger = winston.createLogger,
  format = winston.format,
  transports = winston.transports;

var label = format.label,
  timestamp = format.timestamp,
  printf = format.printf,
  colorize = format.colorize;

var getLogger = function getLogger(name) {
  var loggerName = name || "default";
  return createLogger({
    level: "debug",
    format: format.combine(
      label({
        label: "[".concat(loggerName, "]")
      }),
      timestamp(),
      printf(function(info) {
        return ""
          .concat(info.timestamp, " ")
          .concat(info.label, "  - ")
          .concat(info.level, ": ")
          .concat(info.message);
      }),
      colorize({
        all: true
      })
    ),
    transports: [new transports.Console()]
  });
};

exports.getLogger = getLogger;
