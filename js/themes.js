const html = document.querySelector('html');
const toggleSwitcher = document.querySelector('#toggle-switcher');
let currentTheme;

toggleSwitcher.addEventListener('click', () => {    
    currentTheme = html.attributes["data-theme"].nodeValue;
    switch (currentTheme) {
        case "1":
            html.dataset.theme = 2;
            toggleSwitcher.setAttribute("data-theme", 2);
            break;
        case "2":
            html.dataset.theme = 3;
            toggleSwitcher.setAttribute("data-theme", 3);
            break;
        case "3":
            html.dataset.theme = 1;
            toggleSwitcher.setAttribute("data-theme", 1);

    };
})