import TimeFormatter from '../../utils/timeFormatter';
import {Configuration} from '../../configuration'

class MovieService {
    async getAllMovies(){
        try {
            const response = await fetch(`${Configuration.apiUrl}/movies`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error({id: 'getAllMovies', error: error});
        }
    }

    async getMoviesByCriteria(startIndex, pageSize, searchText, rating, movieLength){
        // usually the paging and filtering is happening on the server side
        // which returns a page and toatl matching items
        // however api does not expose such filtering capabilities
        // thus we need to filter on client side
        try {
            const data = await this.getAllMovies();
            // To do: break this function into smaller pieces of code
            //        consider creating array utils to return itemInBetween function
            //        as well as searchContains function etc.
            const searchTextFilteredResult = !searchText ? data : data.filter(movie => {
                                        return movie.title.toLowerCase()
                                                .includes(searchText.toLowerCase())
                                                ||
                                                movie.synopsis.toLowerCase()
                                                .includes(searchText.toLowerCase())
            })

            const ratingFilteredResult = searchTextFilteredResult
                                    .filter(movie => {
                                        return !movie.rating ? true
                                        :
                                        +movie.rating >= rating[0] //min rating
                                        &&
                                        +movie.rating <= rating[1]; // max rating
                                    });
            const movieLengthFilteredResult = ratingFilteredResult.filter(movie => {
                                        return !movie.runtime ? true
                                        :
                                        TimeFormatter.formatTimeToMinutes(movie.runtime) >= movieLength[0] // min
                                        &&
                                        TimeFormatter.formatTimeToMinutes(movie.runtime) <= movieLength[1] // max
                                        });

            // return the desired page size
            const page = movieLengthFilteredResult.slice(startIndex, pageSize + 1); // + 1 since slice does not bring last value
            return page;

        } catch (error) {
            throw new Error({id: 'getMoviesByCriteria', error: error});
        }
        


    }

    async getMovieById(id){
        try {
            const response = await fetch(`${Configuration.apiUrl}/movies/${id}`);
            const data = await response.json();
            return data[0];
        } catch (error) {
            throw new Error({id: 'getMoviesByCriteria', error: error});
        }
    }
}

export default new MovieService();