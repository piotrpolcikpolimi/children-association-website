( async () => {
    const elementName = 'contact-form';

    let template = await global.getTemplate(elementName);
    const templateSlot = global.getTemplateSlot(elementName);

    templateSlot.append($.parseHTML(template));
    global.insertCSSToHead(elementName);
}) ();