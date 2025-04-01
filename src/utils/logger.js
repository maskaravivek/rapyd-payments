import morgan from 'morgan';

const stream = {
  write: (message) => console.log(message.trim()),
};

const logger = morgan('dev', { stream });

export default { logger, stream };
