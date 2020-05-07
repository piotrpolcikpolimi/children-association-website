( async () => {
    const elementName = 'contact-form';

    let template = await global.getTemplate(elementName);
    const templateSlot = global.getTemplateSlot(elementName);

    templateSlot.append($.parseHTML(template));
    global.insertCSSToHead(elementName);
}) ();

const contact = {
    submitForm: (e) => {
        e.preventDefault();
        const data = {
            name: document.contactForm.name.value,
            email: document.contactForm.email.value,
            message: document.contactForm.message.value
        }
        console.log(data);
    }
}