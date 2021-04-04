const logger = (req, res, next) => {
    console.log(`logger.originalUrl:`, req.originalUrl)
    next()
}


module.exports = {
    logger
};