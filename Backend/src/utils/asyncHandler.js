const asyncHandler = (fn) => (req,res,next) => {
    return ((req,res,next) => {
        Promise.resolve(fn(req,res,next)).catch( (error) => {next(error)})
    }
    )(req,res,next)
}
export {asyncHandler}