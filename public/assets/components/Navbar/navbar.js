(async () => {
    const elementName = 'navbar';

    let template = await global.getTemplate(elementName);
    const templateSlot = global.getTemplateSlot(elementName);

    templateSlot.replaceWith($.parseHTML(template));
    global.insertCSSToHead(elementName);
    navbar.setActiveNavbarElement();
})();

const navbar = {
    setActiveNavbarElement: () => {
        const currentPath = window.location.pathname;
        let activeElement;

        if (currentPath === '/') {
            activeElement = 'home';
        } else {
            activeElement = currentPath.match(/\/pages\/([a-z]+).html/)[1];
        }

        const navElement = $(`li.nav-item.${activeElement}`);

        if (navElement) {
            navElement.addClass('active');
        }
    }
}