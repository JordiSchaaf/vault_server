const logger = require('pino')
const dayjs = require('dayjs')

const log = logger({
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format("HH:mm:ss")}"`,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        }
    }
})

module.exports = log