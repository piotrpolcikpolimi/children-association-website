class VolounteerSmall extends BaseComponent {

    getYear = () => {
        
    };

    render = () => {
        if (this.data.hasOwnProperty('date_joined')) {
            this.data.date_joined = global.format_date_yyyy(this.data.date_joined);
        }
        return super.render();
    }


}