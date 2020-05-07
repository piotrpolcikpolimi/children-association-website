const global = {

    getTemplateSlot: (elementName) => {
        return $(`#${elementName}-slot`);
    },

    formatElementName: (elementName) => {
        return elementName.charAt(0).toUpperCase() + elementName.slice(1);
    },

    getTemplate: async (elementName) => {
        elementName = global.formatElementName(elementName);
        const template = await fetch(`/assets/components/${elementName}/${elementName.toLowerCase()}.html`);
        return template.text();
    },

    insertCSSToHead: (elementName) => {
        elementName = global.formatElementName(elementName);
        let found = false;
        const href = `/assets/components/${elementName}/${elementName.toLowerCase()}.css`;
        $("head link[rel='stylesheet']").last().after(`<link rel='stylesheet' href='${href}' type='text/css' media='screen'>`);
    },

    appendChildrenToSlot: (slot, elements) => {
        elements.forEach(element => {
            slot.append(`${element.render()}`);
        })
    },

    initMap: (lat, lng) => {
        const coordinates = {lat: lat, lng: lng};
        const mapSlot = $('#map');
        const map = new google.maps.Map(
            mapSlot[0],
            {zoom: 14, center: coordinates, gestureHandling: 'none'}
        );
        new google.maps.Marker({position: coordinates, map: map});

        mapSlot.click(() => {
            window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank')
        })
    }
}