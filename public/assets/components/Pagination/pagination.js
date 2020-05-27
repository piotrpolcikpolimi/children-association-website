class Pagination {
    constructor (endpoint, lodashMatch, limit, max, targetSlot, classConstructor, constructorArgs, parseDataFunction) {
        this.endpoint = endpoint;
        this.lodashMatch = lodashMatch;
        this.limit = limit;
        this.max = max;
        this.targetSlot = targetSlot;
        this.constructor = classConstructor;
        this.constructorArgs = constructorArgs;
        this.parseDataFunction = parseDataFunction;
        this.offset = 0;
    }

    async initialize () {
        this.template = await global.getTemplate('pagination');
        global.insertCSSToHead('pagination');
    }

    render() {
        $('#pagination-slot').append(this.template);
        $('#pagination-previous').addClass('inactive');
        if (this.limit >= this.max) {
            $('#pagination-next').addClass('inactive');
        }

        if (window.innerWidth < 769) {
            $('#pagination-current').css({'font-size': '20px'});
            $('#pagination-previous').addClass('fa-2x');
            $('#pagination-next').addClass('fa-2x');
        }

    }

    async switch(direction) {
        if (direction === 'previous') this.offset--;
        else this.offset++;

        let elements;
        let data = await global.fetchData(this.endpoint, `offset=${this.offset * this.limit}&limit=${this.limit}`);
        data = await data.json();
        
        if (this.parseDataFunction) {
            elements = _.get(data, this.lodashMatch).map(el => new this.constructor(this.parseDataFunction(el), ...this.constructorArgs));
        }

        if (this.targetSlot.children().length >= elements.length) {
            this.targetSlot.css({height: this.targetSlot.outerHeight()});
        }

        this.targetSlot.animate({opacity: 0}, 300, () => { 
            this.targetSlot.empty();
            global.appendChildrenToSlot(this.targetSlot, elements);
            this.targetSlot.animate({opacity: 1}, 300, () => {
                this.targetSlot.css({height: ''});
            }); 
        });

        this.updatePagination();
    }

    updatePagination() {
        if (this.offset * this.limit + this.limit >= parseInt(this.max)) {
            $('#pagination-next').addClass('inactive');
        } else {
            $('#pagination-next').removeClass('inactive');
        }

        if (this.offset > 0) {
            $('#pagination-previous').removeClass('inactive');
        } else {
            $('#pagination-previous').addClass('inactive');
        }
        $('#pagination-current').html(this.offset+1);
    }
}