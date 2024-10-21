const createError = require("http-errors");

// 404 not found handler
function notFoundHandler(req, res, next) {
    next(createError(404, "Your requested content was not found!"));
}

// default error handler
function errorHandler(err, req, res, next) {
    // Set the error object based on the environment
    res.locals.error =
        process.env.NODE_ENV === "development" ? err : { message: err.message };

    // Set the response status
    res.status(err.status || 500);  

    // Check if response is HTML
    if (res.locals.html) {
        // HTML response
        res.render("error", {
            title: "Error page",
            error: res.locals.error // Send the error to the error page
        });
    } else {
        // JSON response
        res.json(res.locals.error);
    }
}

module.exports = errorHandler; // Export the function for use in your app


module.exports = {
    notFoundHandler,
    errorHandler,
};
