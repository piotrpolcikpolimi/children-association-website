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
        $('#pagination-previous').css({display: 'none'});
        $('#pagination-current').css({'border-left-width': '4px'});
        if (this.limit >= this.max) {
            $('#pagination-next').css({display: 'none'});
            $('#pagination-current').css({'border-right-width': '4px'});
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

        this.targetSlot.css({height: this.targetSlot.outerHeight()});
        this.targetSlot.animate({opacity: 0}, 300, () => { 
            this.targetSlot.empty();
            global.appendChildrenToSlot(this.targetSlot, elements);
            this.targetSlot.css({height: ''});
            this.targetSlot.animate({opacity: 1}, 300); 
        });

        this.updatePagination();
    }

    updatePagination() {
        $('#pagination-current').html(this.offset+1);
        $('#pagination-previous').html(this.offset);
        $('#pagination-next').html(this.offset+2);

        if (this.offset * this.limit + 1 >= parseInt(this.max)) {
            $('#pagination-current').css({'border-right-width': '4px'});
            $('#pagination-next').css({display: 'none'});
        } else {
            $('#pagination-current').css({'border-right-width': '2px'});
            $('#pagination-next').css({display: ''});
        }

        if (this.offset > 0) {
            $('#pagination-current').css({'border-left-width': '2px'});
            $('#pagination-previous').css({display: ''});
        } else {
            $('#pagination-current').css({'border-left-width': '4px'});
            $('#pagination-previous').css({display: 'none'});
        }
    }
}