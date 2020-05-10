var express = require("express");
var path = require("path");

var app = express();

var filePath = path.join(__dirname, "Desert.jpg");

// app.use(function(req, res)
// {
//     // You can have a callback function which takes the error as a parameter
//     // Then you can do stuff with the error
//     res.sendFile(filePath, function(err)
//     {
//         if (err)
//         {
//             console.error("File failed to send");
//         }
//         else
//         {
//             console.log("File sent!");
//         }
//     });
// });

app.use(function(req, res, next)
{
    res.sendFile(filePath, function(err)
    {
        if (err)
        {
            next(new Error("Error sending file!"));
        }
    });
});

app.use(function(err, req, res, next)
{
    console.error(err);
    next(err);
});

// This is error handling middleware, express knows because of
// Number of parameters, this is only called in error handling mode
app.use(function(err, req, res, next)
{
    res.status(500);
    res.send("Internal server error");
})


app.listen(3000, function()
{
    console.log("App started on port 3000");
});