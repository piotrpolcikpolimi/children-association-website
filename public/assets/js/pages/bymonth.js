
const monthHTML =
    `<a id="month-selector-{{ id }}" class="month-selector" href="../../../pages/events.html?month={{ id }}">
        <div class="wrapper">
            <p>{{ name }}</p>
            <i class="fas fa-chevron-right fa-lg"></i>
        </div>
    </a>`;

const insertIntoMonth = (month) => {
    return monthHTML.replace(/{{ id }}/g, month.id).replace(/{{ name }}/g, month.name);
}

const generateMonths = () => {
    months = [{ id: '1', name: 'January' },{ id: '2', name: 'February' },{ id: '3', name: 'March' },{ id: '4', name: 'April' },
                { id: '5', name: 'May' },{ id: '6', name: 'June' },{ id: '7', name: 'July' },{ id: '8', name: 'August' },
                { id: '9', name: 'September' },{ id: '10', name: 'October' },{ id: '11', name: 'November' },{ id: '12', name: 'December' }];
    return months.map((el) => {
        return insertIntoMonth(el);
    });
}
(async () => {
    const months = generateMonths();

    // insert elments into DOM
    const monthSlot = global.getTemplateSlot('month-selectors');
    months.forEach(month => {
        monthSlot.append(month)
    });

    $(document).ready(setTimeout(() => {global.loaded()},300));
})();