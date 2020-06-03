(async () => {
    $(document).ready(setTimeout(() => {global.loaded()},300));
})();

const sendForm = (e) => {
    e.preventDefault();
    const formData = $('#donation-form').serializeArray();
    const data = new URLSearchParams();
    let msg = '';
    let amount;

    formData.forEach((el, i) => {
        if (el.value && el.name !== 'amount') {
            msg += `${el.name}: ${el.value} `;
        }
        if (el.name === 'amount') {
            amount = el;
        }
    });

    data.append('amount', amount.value);
    data.append('message', msg);

    global.postData('donations', data, 'application/x-www-form-urlencoded').then(
        resp => {
            global.updateForm(resp, 'Thank you for donating!', 'donation-form');
        }
    )
};

const setAmountValue = (value) => {
        if (!value) {
            $('#donationField')[0].value = '';
            return;
        }
        $('#donationField')[0].value = value;
}




