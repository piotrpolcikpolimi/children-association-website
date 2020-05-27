( async () => {
    const elementName = 'footer';

    let template = await global.getTemplate(elementName);
    const templateSlot = global.getTemplateSlot(elementName);

    templateSlot.append($.parseHTML(template));
    global.insertCSSToHead(elementName);

    if (window.innerWidth <= 768) {
        $('.social-media a i').each((i, el) => {
            $(el).addClass('fa-2x');
        })
    }
}) ();