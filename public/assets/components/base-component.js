class BaseComponent {
    constructor (data, name, elements, template) {
        this.elementName = name
        this.data = data;
        this.elements = elements;
        this.template = template;
    }

    render() {
        let templateCopy = this.template;
        this.elements.forEach(element => {
            const regex = new RegExp(`{{ ${element} }}`, 'g')
            templateCopy = templateCopy.replace(regex, this.data[element]);
        })
        templateCopy.replace(/{{ [a-zA-Z0-9-_]* }}/g, '')
        return templateCopy;
    }
}