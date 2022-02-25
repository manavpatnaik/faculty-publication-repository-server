exports.welcomeTemplate = (name) => `<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        .container {
            font-family: sans-serif;
            padding: 10px;
            border: 1px solid rgb(0, 68, 0);
            border-radius: 10px;
            width: 400px;
            text-align: center;
        }
        .container h3 {
            color: rgb(0, 68, 0);
        }
        .container p {
            color: grey;
        }
    </style>
</head>
<body>
    <div class="container">
        <h3>Hey ${name}, Welcome to FPR!</h3>
        <p>About FPR: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum voluptatibus, enim hic molestias quaerat, dolore laboriosam pariatur accusamus optio, sed inventore voluptas asperiores? Veniam illo sit itaque similique facilis excepturi?</p>
    </div>
</body>
</html>`;
