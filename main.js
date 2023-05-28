function register() {
    username = document.getElementById("username").value;
    email = document.getElementById("email").value;
    password1 = document.getElementById("password1").value;
    password2 = document.getElementById("password2").value;

    if (ValidateEmail(email)) {
        if (password1 == password2) {
            document.getElementById("registerForm").submit();
        } else {
            alert("Die Passwörter stimmen nicht überein.")
        }
    } else {
        alert("Bitte gib eine gültige Email ein.")
    }
}

function openRegisterForm() {
  const registerFormWindow = window.open('', 'Register', 'width=400,height=400');
  const registerFormHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="main.js"></script>
        <link rel="stylesheet" href="logstyle.css">
        <title>Register</title>
    </head>
    <body>
        <form id="registerForm" action="include/register.php" method="POST">
            <table class="center">
                <tr>
                    <td>Username: </td>
                    <td><input type="text" name="username" id="username" required></td>
                </tr>
                <tr>
                    <td>Email: </td>
                    <td><input type="text" name="email" id="email" required></td>
                </tr>
                <tr>
                    <td>Password: </td>
                    <td><input type="password" name="password1" id="password1" required></td>
                </tr>
                <tr>
                    <td>Password: </td>
                    <td><input type="password" name="password2" id="password2" required></td>
                </tr>
                <tr>
                    <td><br><input type="button" value="Registrieren" onclick="register()"></td>
                </tr>
            </table>
        </form>
    </body>
    </html>
  `;
  registerFormWindow.document.write(registerFormHTML);
}

function login() {
    document.getElementById("loginForm").submit();
}

function updateSender() {
    document.getElementById("updateForm").submit();
}

function logout() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = '../index.php';
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail))
  {
    return (true);
  }

  return (false);
}

function removeAlert(element) {
    document.getElementById(element).remove();

    $.ajax({
        method: "POST",
        url: "include/removeAlert.php",
        data: {userid: getCookie("userid"), curid: element}
    })

    location.reload();
}

function updateAlert(element) {

    $.ajax({
        method: "POST",
        url: "include/updateAlert.php",
        data: {userid: getCookie("userid"), curid: element}
    })

    location.reload();
}

