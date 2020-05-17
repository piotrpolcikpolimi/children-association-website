class SubNavbarItem extends BaseComponent { }

const subnavbar = {
    init: async () => {
        const elementName = 'subnavbar';
        let template = await global.getTemplate(`${elementName}`);

        let scrollTargets = $('[data-scroll]');
        scrollTargets = scrollTargets.map((i, el) => {
            if ($(el).is(':visible')) {
                return new SubNavbarItem({
                    target_element: $(el).attr('id'),
                    target_element_text: $(el).attr('data-scroll')
                }, 'subnavbar-item', ['target_element', 'target_element_text'], template);
            }
        });
        global.appendChildrenToSlot(global.getTemplateSlot(elementName), Array.from(scrollTargets));
    }
}

