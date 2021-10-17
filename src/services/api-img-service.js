import axios from '../../node_modules/axios';

class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.KEY = '22984321-98218ca8e9b1f3be57a008ac4&q';
        this.BASE_URL = 'https://pixabay.com/api/';
        this.page = 1;
        this.orientation = 'all';
        this.imgType = 'all';
    }

    /* вариант используя async-away + axios + try-catch, который применен в ф-ции выше*/
    
    async fetchImages(query, page) {
        this.searchQuery = query;
        this.page = page;
        const url = `${this.BASE_URL}?image_type=${this.imgType}&orientation=${this.orientation}&page=${this.page}&per_page=12&key=${this.KEY}&q=${this.searchQuery}`;
        const response = await axios.get(url);
        return response;
    }
    
    // incrementPage() {
    //     this.page += 1;
    // }

    // resetPage() {
    //     this.page = 1;
    // }

    // get query() {
    //     return this.searchQuery;
    // }

    // set query(newQuery) {
    //     this.searchQuery = newQuery;
    // }
};

const imgApiService = new ImagesApiService();

export default imgApiService;