( async () => {
    const elementName = 'contact-form';

    let template = await global.getTemplate(elementName);
    const templateSlot = global.getTemplateSlot(elementName);

    templateSlot.append($.parseHTML(template));
    global.insertCSSToHead(elementName);
}) ();

const contact = {
    submitForm: async (e) => {
        e.preventDefault();
        const data = new URLSearchParams();

        data.append('name', document.contactForm.name.value);
        data.append('email', document.contactForm.email.value);
        data.append('message', document.contactForm.message.value);

        global.postData('contact', data, 'application/x-www-form-urlencoded')
        .then(resp => {
            contact.updateContactForm(resp);
        });
        const width = $('#contact-form-slot').width();
        const height = $('#contact-form-slot').height();
        $('#contact-form-slot').css({'height':height, 'width':width});
        $('#contact-form-slot').html(
            '<div style="position:relative;left:2%; top:18%" id="animated-div-2"></div>'
        );
    },

    updateContactForm: (resp) => {
        if (resp.status === 200) {
            $('#contact-form-slot').html(
                '<span style="position:relative;top:30%;">Thank you for your message!</span>'
            );
        } else {
            $('#contact-form-slot').html(
                '<span>Something went wrong. Please, try again later.</span>'
            )
        }
    }
}

const updateContactForm = {

}