module.exports = {
  initialiseLogger: function (config, winston, Elasticsearch) {
    const { format } = winston;
    const { combine, timestamp } = format;

    let env = 'dev';
    if (process.env.NODE_ENV === 'production') {
      env = 'prod';
    }

    // Custom format function that will look for an error object and log out the stack and if
    // its not production, the error itself
    const myFormat = format.printf((info) => {
      const { timestamp: tmsmp, level, message, error, ...rest } = info;
      let log = `${tmsmp} - ${level}:\t${message}`;
      // Only if there is an error
      if ( error ) {
        if ( error.stack) log = `${log}\n${error.stack}`;
        if (process.env.NODE_ENV !== 'production') log = `${log}\n${JSON.stringify(error, null, 2)}`;
      }
      // Check if rest is object
      if ( !( Object.keys(rest).length === 0 && rest.constructor === Object ) ) {
        log = `${log}\n${JSON.stringify(rest, null, 2)}`;
      }
      return log;
    });

    const esTransportOpts = {
      level: 'info',
      indexPrefix: 'logs_mupbot',
      clientOpts: {
          host: config.elasticsearch.elasticsearch_address,
          log: 'info'
      },
      transformer: logData => {
          return {
            timestamp: new Date().toISOString(),
            severity: logData.level,
            message: logData.message,
            meta: {
              app: 'mupbot',
              env: env,
              stack: logData.meta.stack
            }
          }
      }
    };

    const logger = winston.createLogger({
      level: 'info',
      format: combine(
        winston.format.errors({ stack: true }), // <-- use errors format
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        myFormat,
        winston.format.json()
      ),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new Elasticsearch(esTransportOpts)
      ],
    });

    //
    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    //if (process.env.NODE_ENV !== 'production') {
      logger.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    //}

    return logger;
  },
};
