let rightClick = false;
let selectedBox = null;
let scaling = false;
let removeButtonsVisible = false;
let contextMenuOpen = false; // Neue Variable zur Überprüfung, ob das Kontextmenü bereits geöffnet ist

document.addEventListener('contextmenu', function (e) {
  if (scaling || contextMenuOpen) { // Überprüfe, ob das Skalieren aktiv ist oder das Kontextmenü bereits geöffnet ist
    return;
  }

  e.preventDefault();

  if (e.target.className === 'box') {
    if (removeButtonsVisible) {
      toggleRemoveButtons();
    }
    return;
  }

  const menu = document.createElement('div');
  menu.style.position = 'absolute';
  menu.style.left = e.clientX + 'px';
  menu.style.top = e.clientY + 'px';
  menu.className = 'menu';

  const closeButton = document.createElement('button');
  closeButton.innerText = 'X';

  const createButton = document.createElement('button');
  createButton.innerText = 'Kästchen erstellen';

  const saveViewButton = document.createElement('button');
  saveViewButton.innerText = 'Ansicht speichern';

  const removeButton = document.createElement('button');
  removeButton.innerText = 'Kästchen entfernen';

  const setBackgroundButton = document.createElement('button');
  setBackgroundButton.innerText = 'Hintergrund festlegen';

  const loginButton = document.createElement('button'); // Neuer Button "Login"
  loginButton.innerText = 'Login';


  closeButton.addEventListener('click', function (event) {
    event.stopPropagation();
    document.body.removeChild(menu);
    contextMenuOpen = false; // Setze die Variable auf false, wenn das Kontextmenü geschlossen wird
  });

  menu.appendChild(closeButton);
  menu.appendChild(createButton);
  menu.appendChild(saveViewButton);
  menu.appendChild(removeButton);
  menu.appendChild(setBackgroundButton);
  menu.appendChild(loginButton);

  createButton.addEventListener('click', function (event) {
    event.stopPropagation();
    const x = e.clientX;
    const y = e.clientY;
    createBox(x, y);
    document.body.removeChild(menu);
    contextMenuOpen = false; // Setze die Variable auf false, wenn das Kontextmenü geschlossen wird
  });

  saveViewButton.addEventListener('click', function (event) {
    event.stopPropagation();
    saveView();
    document.body.removeChild(menu);
    contextMenuOpen = false; // Setze die Variable auf false, wenn das Kontextmenü geschlossen wird
  });

  removeButton.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleRemoveButtons();
    document.body.removeChild(menu);
    contextMenuOpen = false; // Setze die Variable auf false, wenn das Kontextmenü geschlossen wird
  });

  setBackgroundButton.addEventListener('click', function (event) {
    event.stopPropagation();
    const bgImageUrl = prompt('Bitte geben Sie die URL für den Hintergrund ein:');
    if (bgImageUrl) {
      setWebsiteBackground(bgImageUrl);
      saveBackground(bgImageUrl);
    }
    document.body.removeChild(menu);
    contextMenuOpen = false; // Setze die Variable auf false, wenn das Kontextmenü geschlossen wird
  });
  loginButton.addEventListener('click', function (event) {
    event.stopPropagation();
    openLoginForm(); // Neue Funktion zum Öffnen des Login-Formulars aufrufen
    document.body.removeChild(menu);
    contextMenuOpen = false; // Setze die Variable auf false, wenn das Kontextmenü geschlossen wird
  });
  document.body.appendChild(menu);
  contextMenuOpen = true; // Setze die Variable auf true, um anzuzeigen, dass das Kontextmenü geöffnet ist
});

document.addEventListener('mousemove', function (e) {
  if (selectedBox && rightClick && !scaling) {
    const offsetX = e.clientX - selectedBox.offsetX;
    const offsetY = e.clientY - selectedBox.offsetY;
    selectedBox.style.left = offsetX + 'px';
    selectedBox.style.top = offsetY + 'px';
  }
});

document.addEventListener('mousedown', function (e) {
  if (e.button === 2) {
    rightClick = true;
    const clickedBox = e.target;
    if (clickedBox && clickedBox.className === 'box') {
      selectedBox = clickedBox;
      selectedBox.offsetX = e.clientX - selectedBox.offsetLeft;
      selectedBox.offsetY = e.clientY - selectedBox.offsetTop;
    }
  }
});

document.addEventListener('mouseup', function (e) {
  if (e.button === 2) {
    rightClick = false;
    selectedBox = null;
  }
});
function openLoginForm() {
  const loginFormWindow = window.open('', 'Login', 'width=400,height=300');
  const loginFormHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="main.js"></script>
        <link rel="stylesheet" href="logstyle.css">
        <title>Login</title>
    </head>
    <body>
        <form id="loginForm" action="include/login.php" method="POST">
            <table class="center">
                <tr>
                    <td>Username: </td>
                    <td><input type="text" name="username" id="username" required></td>
                </tr>
                <tr>
                    <td>Password: </td>
                    <td><input type="password" name="password1" id="password1" required></td>
                </tr>
                <tr>
                    <td><br><input type="button" value="Login" onclick="login()"></td>
                    <td><br><input type="button" value="Registrieren" onclick="openRegisterForm()"></td> <!-- Neuer Button zum Öffnen des Registrierungs-Formulars -->
                </tr>
            </table>
        </form>
    </body>
    </html>
  `;
  loginFormWindow.document.write(loginFormHTML);
}


// Funktion zum Öffnen des Registrierungs-Formulars

function createBox(x, y, url = '', imgUrl = '', isLoadView = false, width = 300, height = 150) {
  const box = document.createElement('div');
  box.className = 'box';
  box.style.width = width + 'px';
  box.style.height = height + 'px';
  box.style.position = 'absolute';
  box.style.left = x + 'px';
  box.style.top = y + 'px';
  box.dataset.url = url;
  box.dataset.imgurl = imgUrl;
  box.style.backgroundImage = `url('${imgUrl}')`;
  box.isSaved = isLoadView;
  box.style.cursor = 'default';

  const scaleBox = document.createElement('div');
  scaleBox.style.width = '10px';
  scaleBox.style.height = '10px';
  scaleBox.style.position = 'absolute';
  scaleBox.style.right = '0';
  scaleBox.style.bottom = '0';
  scaleBox.style.cursor = 'nw-resize';
  scaleBox.style.display = isLoadView ? 'block' : 'none';
  box.appendChild(scaleBox);

  let scaling = false;
  let initialWidth = box.offsetWidth;
  let initialHeight = box.offsetHeight;

  scaleBox.addEventListener('mousedown', function (e) {
    if (e.button === 0) {
      e.stopPropagation();
      scaling = true;
      initialWidth = box.offsetWidth;
      initialHeight = box.offsetHeight;
    }
  });

  document.addEventListener('mousemove', function (e) {
    if (scaling) {
      const dx = e.clientX - box.offsetLeft;
      const dy = dx * (initialHeight / initialWidth);

      box.style.width = dx + 'px';
      box.style.height = dy + 'px';
      box.style.backgroundSize = '100% auto';
    }
  });

  document.addEventListener('mouseup', function (e) {
    if (e.button === 0) {
      scaling = false;
    }
  });

  box.addEventListener('click', function (e) {
    if (e.button === 0 && !e.shiftKey && this.isSaved) {
      e.stopPropagation();
      window.open(box.dataset.url, '_blank');
    }
  });

  if (!isLoadView && !box.isSaved) {
    const urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.placeholder = 'URL';
    urlInput.value = url;

    const imgUrlInput = document.createElement('input');
    imgUrlInput.type = 'text';
    imgUrlInput.placeholder = 'BILDURL';
    imgUrlInput.value = imgUrl;

    const transparencySlider = document.createElement('input');
    transparencySlider.type = 'range';
    transparencySlider.min = '0';
    transparencySlider.max = '1';
    transparencySlider.step = '0.1';
    transparencySlider.value = '1';

    const jsColorInput = document.createElement('input');
    jsColorInput.type = 'text';
    jsColorInput.placeholder = 'Hintergrundfarbe';
    jsColorInput.className = 'jscolor';

    let saveBtn = document.createElement('button');
    saveBtn.innerText = 'Speichern';

    const jsColorPicker = new jscolor(jsColorInput, {
        closeButton: true,
        closeText: 'ok'
    });
    jsColorPicker.value = '';
    //jsColorPicker.option();

    saveBtn.addEventListener('click', function (event) {
      event.stopPropagation();

      box.style.backgroundImage = `url('${imgUrlInput.value}')`;
      box.dataset.url = urlInput.value;
      box.dataset.imgurl = imgUrlInput.value;
      // Überprüfen, ob das jsColorInput.value leer ist
      if(jsColorInput.value != '' && jsColorInput.value != '#FFFFFF') {
      box.style.backgroundColor = jsColorInput.value;
      }
      box.style.opacity = transparencySlider.value;
      box.isSaved = true;
      scaleBox.style.display = 'block';

      box.removeChild(urlInput);
      box.removeChild(imgUrlInput);
      box.removeChild(transparencySlider);
      box.removeChild(jsColorInput);
      box.removeChild(saveBtn);
    });

    box.appendChild(urlInput);
    box.appendChild(imgUrlInput);
    box.appendChild(transparencySlider);
    box.appendChild(jsColorInput);
    box.appendChild(saveBtn);
  }

  document.body.appendChild(box);

  if (rightClick) {
    const closeButton = document.createElement('div');
    closeButton.innerText = 'X';
    closeButton.className = 'close-button';
    closeButton.style.display = 'block';

    closeButton.addEventListener('click', function (event) {
      event.stopPropagation();
      document.body.removeChild(box);
    });

    box.appendChild(closeButton);
  }
}



function toggleRemoveButtons() {
  const boxes = Array.from(document.getElementsByClassName('box'));

  boxes.forEach(box => {
    const removeButton = box.querySelector('.remove-button');

    if (removeButton) {
      if (removeButton.style.display === 'none') {
        removeButton.style.display = 'block';
      } else {
        removeButton.style.display = 'none';
      }
    } else {
      const newRemoveButton = document.createElement('div');
      newRemoveButton.innerText = 'X';
      newRemoveButton.className = 'remove-button';
      newRemoveButton.style.display = 'block';

      newRemoveButton.addEventListener('click', function (event) {
        event.stopPropagation();
        box.removeChild(newRemoveButton);
        box.parentNode.removeChild(box);
      });

      box.appendChild(newRemoveButton);
    }
  });
}





function getCookie(cname) {
     let name = cname + "=";
     let decodedCookie = decodeURIComponent(document.cookie);
     let ca = decodedCookie.split(';');

     for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
           c = c.substring(1);
           }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
                }
            }

            return false;
        }
function saveView() {
  const boxes = Array.from(document.getElementsByClassName('box'));
  const boxData = boxes.map(box => ({
    x: parseInt(box.style.left, 10),
    y: parseInt(box.style.top, 10),
    width: parseInt(box.style.width, 10),
    height: parseInt(box.style.height, 10),
    url: encodeURIComponent(box.dataset.url),
    imgUrl: box.dataset.imgurl,
    bgColor: box.style.backgroundColor,
    opacity: box.style.opacity
  }));
  const backgroundUrl = localStorage.getItem('background');
  const userId = getCookie("userid").toString();

  localStorage.setItem('boxData', JSON.stringify(boxData));

  // Sende die Ansichtsdaten an den Server
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'include/save_view.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.responseText); // Erfolgreiche Speicherung der Ansicht
      } else {
        console.error('Fehler beim Speichern der Ansicht.');
      }
    }
  };

  let viewData = JSON.stringify(boxData);
  xhr.send(`userId=${userId}&viewData=${encodeURIComponent(viewData)}&backgroundUrl=${encodeURIComponent(backgroundUrl)}`);
}


function loadView() {
  //const boxData = JSON.parse(localStorage.getItem('boxData'));
  const userId = getCookie("userid").toString(); // Hier musst du die tatsächliche Benutzer-ID des eingeloggten Benutzers verwenden

  if (userId !== "") {
    // Sende die Benutzer-ID an den Server, um die gespeicherte Ansicht und das Hintergrundbild abzurufen
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'include/load_view.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          let response;
           try {
                response = JSON.parse(xhr.responseText);
           } catch(e) {
                console.error('Error parsing server response:', e);
                return;
           }
          if (response.viewData) {
            let boxData = JSON.parse(response.viewData);
            boxData = boxData.map(box => ({
                ...box,
                url: decodeURIComponent(box.url)
            }));
            createSavedBoxes(boxData);
          }
 else {
            console.log('Keine gespeicherte Ansicht gefunden.');
          }
          if (response.backgroundUrl) {
            setWebsiteBackground(response.backgroundUrl);
          } else {
            console.log('Kein gespeichertes Hintergrundbild gefunden.');
          }
        } else {
          console.error('Fehler beim Laden der Ansicht und des Hintergrundbilds.');
        }
      }
    };
    xhr.send(`userId=${userId}`);
  } else {
    if (boxData) {
      boxData.forEach(data => {
        createBox(
          data.x,
          data.y,
          data.url,
          data.imgUrl,
          true,
          data.width,
          data.height
        );
        const boxes = Array.from(document.getElementsByClassName('box'));
        const box = boxes[boxes.length - 1];
        box.style.backgroundColor = data.bgColor;
        box.style.opacity = data.opacity;
      });
    }
  }
}
// Hilfsfunktion zum Erstellen der gespeicherten Boxen
function createSavedBoxes(boxData) {
  boxData.forEach(data => {
    createBox(
      data.x,
      data.y,
      data.url,
      data.imgUrl,
      true,
      data.width,
      data.height
    );
    const boxes = Array.from(document.getElementsByClassName('box'));
    const box = boxes[boxes.length - 1];
    box.style.backgroundColor = data.bgColor;
    box.style.opacity = data.opacity;
  });
}

function setWebsiteBackground(bgImageUrl) {
  document.body.style.backgroundImage = `url('${bgImageUrl}')`;
}

function saveBackground(bgImageUrl) {
  localStorage.setItem('background', bgImageUrl);
}

function loadBackground() {
  const bgImageUrl = localStorage.getItem('background');
  if (bgImageUrl) {
    setWebsiteBackground(bgImageUrl);
  }
}

// Box für die Anleitung erstellen und anzeigen
function createGuideBox() {
  const guideBox = document.createElement('div');
  guideBox.className = 'guide-box';
  guideBox.style.position = 'fixed';
  guideBox.style.top = '10px';
  guideBox.style.right = '10px';
  guideBox.style.zIndex = '1000';
  guideBox.style.padding = '20px';
  guideBox.style.backgroundColor = '#fff';
  guideBox.style.border = '1px solid #000';

  const closeButton = document.createElement('button');
  closeButton.innerText = 'X';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '5px';
  closeButton.style.right = '5px';

  closeButton.addEventListener('click', function () {
    document.body.removeChild(guideBox);
  });

  const guideText = document.createElement('p');
  guideText.innerText = '1. Ein Rechtsklick auf eine beliebige Stelle auf der Webseite, öffnet ein Kontextmenü.\n2. "Kästchen erstellen" klicken, um ein neues Kästchen auf der Seite zu erstellen.\n3. Nachdem das Kästchen erstellt wurde, können Sie es mit Rechtsklick auswählen und verschieben.\n4. Sie können auch auf "Ansicht speichern" klicken, um Ihre aktuelle Anordnung der Kästchen zu speichern.\n5. Wählen Sie "Kästchen entfernen", um die Entfernen-Schaltflächen auf den Kästchen zu aktivieren oder zu deaktivieren.\n6.SHIFT + Linke Maustaste in rechter unterer Ecke um die Größe anzupassen\n7. Klicken Sie auf "Hintergrund festlegen", um eine URL für ein Hintergrundbild einzugeben.'; // Ihre Anleitung hier

  guideBox.appendChild(closeButton);
  guideBox.appendChild(guideText);
  document.body.appendChild(guideBox);
}

// Überprüfen, ob der Nutzer die Webseite das erste Mal besucht
function checkFirstVisit() {
  if (!localStorage.getItem('visited')) {
    localStorage.setItem('visited', 'true');
    createGuideBox();
  }
}

window.onload = function() {
  loadView();
  loadBackground();
  checkFirstVisit();
};

