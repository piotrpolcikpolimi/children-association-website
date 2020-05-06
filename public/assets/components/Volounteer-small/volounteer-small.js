class VolounteerSmall extends BaseComponent {

    getYear = () => {
        return new Date(this.data.date_joined).getFullYear();
    };

    render = () => {
        if (this.data.hasOwnProperty('date_joined')) {
            this.data.date_joined = this.getYear();
        }
        return super.render();
    }


}