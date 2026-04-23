/**
 * TODO: Handle errors
 *
 * Required error format: { error: { message: "..." } }
 *
 * Handle these cases:
 * 1. Mongoose ValidationError → 400 with combined error messages
 * 2. Mongoose CastError → 400 with "Invalid id format"
 * 3. Other errors → Use err.status (or 500) and err.message
 */
export function errorHandler(err, req, res, next) {
  // Your code here
  if(err.name === "ValidationError"){
    return res.status(400).json({
    error: {
      message: Object.values(err.errors)
        .map(e => e.message)
        .join(", "),
  },
})
  }
    
  //Mongoose CastError
  else if(err.name === "CastError"){
    statusCode = 400;
    message = "Invalid  id format";
  }
   
  res.status(statusCode).json({
    error:{
      message,
    }
  })
}
