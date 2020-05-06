class BaseComponent {
    constructor (data, name, elements) {
        this.elementName = name
        this.data = data;
        this.elements = elements;
    }

    async initialize() {
        this.template = await global.getTemplate(this.elementName);
        return this;
    };

    render() {
        let templateCopy = this.template;
        this.elements.forEach(element => {
            const regex = new RegExp(`{{ ${element} }}`, 'g')
            templateCopy = templateCopy.replace(regex, this.data[element]);
        })
        return templateCopy;
    }
}