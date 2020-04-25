( async () => {
    const elementName = 'footer';

    let template = await global.getTemplate(elementName);
    const templateSlot = global.getTemplateSlot(elementName);

    templateSlot.append($.parseHTML(template));

}) ();