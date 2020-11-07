

import fetchMock from 'jest-fetch-mock'
import movieService from '../src/services/movie'

describe('movie service', () => {
    beforeEach(() => {
        fetchMock.enableMocks();
    });

    describe('get all movies', () => {
        it('return success on valid response data', async () => {
            const responseDataMock = JSON.stringify({});
            fetchMock.mockResponseOnce(responseDataMock , { status: 200 });

            try {
                const movies = await movieService.getAllMovies();
                expect(movies).toBeTruthy();
            } catch (error) {
                // we should not get here
                throw new Error('Get all movies failed')
            }
        })

        it('return failure on http response failure', async () => {
            fetchMock.mockReject(new Error('fake error message') , { status: 404 });

            try {
                const movies = await movieService.getAllMovies();
                // if we got here then the test failed
                throw new Error('failure test failed');
            } catch (error) {
                // we should not get here
                expect(error.message).toMatch('fake error message');
            }
        })
    
        it('returns a list of movies successfully', async () => {
            const responseDataMock = JSON.stringify(
                [
                    {
                    "id": "207856",
                    "title": "2001: A Space Odyssey",
                    "image": "https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABd8H3yW84QBZ7bXkGlzSmeKjpS8gUEV7S_zPN4qVOX7mQ0SNpyHlOkh0WGGlrARjpOZPFlZXyU4t5E8phADO9rq80g.jpg?r=43c",
                    "synopsis": "While investigating the appearance of mysterious monoliths throughout the universe, two astronauts battle their ship&#39;s intelligent computer system.<br><b>New on 2020-06-18</b>",
                    "rating": "8.3",
                    "type": "movie",
                    "released": "1968",
                    "runtime": "2h28m",
                    "largeimage": "https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABbjUFYCF6qVcxBNZXhL_HIGhaNXLosDyYyg6v3WP9H1FLsGMBtJx1uy9R8pEMgz0gGzPLlcF9lgH5WjpB_jl4p6DmlDw.jpg?r=43c",
                    "unogsdate": "2020-06-18",
                    "imdbid": "tt0062622",
                    "download": "0"
                    },
                    {
                    "id": "215318",
                    "title": "Ace Ventura: When Nature Calls",
                    "image": "https://occ-0-1926-41.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABd2CXwqVibqQ6X3SBFL7ADm7zczv73tuNxCW2zDwA-4SEW5Nkdfnybwn5MXfVE1fHv4IBxtpYBkjF3EZQoqHKWkHkA.jpg?r=914",
                    "synopsis": "Ace travels to the jungles of Africa to recover a rare white bat. But if he fails, a war with the violent Wachootoo tribe is sure to follow.<br><b>New on 2020-06-18</b>",
                    "rating": "6.4",
                    "type": "movie",
                    "released": "1995",
                    "runtime": "1h34m",
                    "largeimage": "https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABcAF9ZyRlOXNySt7A9ll31tYwgxUVPVtznPAqkz1L_R9iTfkyHQHK1w-3Kz0RKlXfl4KoWtU1nWkIO-dcjz1k-RYFE-6.jpg?r=914",
                    "unogsdate": "2020-06-18",
                    "imdbid": "tt0112281",
                    "download": "1"
                    }
                ]
            );

            fetchMock.mockResponseOnce(responseDataMock);

            try {
                const movies = await movieService.getAllMovies();
                const firstItem = movies[0];
                expect(movies.length).toBe(2);
                expect(firstItem.title).toEqual(expect.any(String));
    
            } catch (error) {
                // we should not get here
                throw new Error('Get all movies failed')
            }

        });

    });
        
    describe('get filtered list of movies by criterias', () => {
        let responseDataMock;

        beforeEach(() => {
            responseDataMock = JSON.stringify(
                [
                    {
                        "id": "207856",
                        "title": "2001: A Space Odyssey",
                        "synopsis": "While investigating the appearance of mysterious monoliths throughout the universe, two astronauts battle their ship&#39;s intelligent computer system.<br><b>New on 2020-06-18</b>",
                        "rating": "8.3",
                        "released": "1968",
                        "runtime": "2h28m",
                        "unogsdate": "2020-06-18",
                    },
                    {
                        "id": "215318",
                        "title": "Ace Ventura: When Nature Calls",
                        "synopsis": "Ace travels to the jungles of Africa to recover a rare white bat. But if he fails, a war with the violent Wachootoo tribe is sure to follow.<br><b>New on 2020-06-18</b>",
                        "rating": "6.4",
                        "released": "1995",
                        "runtime": "1h34m",
                        "unogsdate": "2020-06-18",
                    },
                    {
                        "id": "234365",
                        "title": "Against All Odds",
                        "synopsis": "An ex-football player agrees to track down a sleazy nightclub owner&#39;s mistress -- but when he finds the elusive woman in Mexico, he falls in love.<br><b>New on 2020-06-18</b>",
                        "rating": "5.9",
                        "type": "movie",
                        "released": "1984",
                        "runtime": "2h1m",
                        "unogsdate": "2020-06-18",
                    },
                ]
            );
        });
        
        it('filters movies by title', async () => {
            fetchMock.mockResponseOnce(responseDataMock);

            try {
                const movies = await movieService.getMoviesByCriteria(0, 10, "od", [0, 10], [0, 240]);
                expect(movies.length).toBe(2);
                expect(movies[0].title).toEqual('2001: A Space Odyssey');
                expect(movies[1].title).toEqual('Against All Odds');
    
            } catch (error) {
                // we should not get here
                throw new Error('filters movies by title failed')
            }
        });

        it('filters movies by rating', async () => {
            fetchMock.mockResponseOnce(responseDataMock);

            try {
                const movies = await movieService.getMoviesByCriteria(0, 10, null, [6, 7], [0, 240]);
                expect(movies.length).toBe(1);
                expect(movies[0].title).toEqual('Ace Ventura: When Nature Calls');
    
            } catch (error) {
                // we should not get here
                throw new Error('filters movies by rating failed')
            }
        });

        it('filters movies by runtime', async () => {
            fetchMock.mockResponseOnce(responseDataMock);

            try {
                const movies = await movieService.getMoviesByCriteria(0, 10, null, [0, 10], [120, 240]);
                expect(movies.length).toBe(2);
                expect(movies[0].title).toEqual('2001: A Space Odyssey');
                expect(movies[1].title).toEqual('Against All Odds');
    
            } catch (error) {
                // we should not get here
                throw new Error('filters movies by runtime failed')
            }
        });

        it('brings page of 2 items from index 1', async () => {
            fetchMock.mockResponseOnce(responseDataMock);

            try {
                const movies = await movieService.getMoviesByCriteria(1, 2, null, [0, 10], [0, 240]);
                expect(movies.length).toBe(2);
                expect(movies[0].title).toEqual('Ace Ventura: When Nature Calls');
                expect(movies[1].title).toEqual('Against All Odds');
    
            } catch (error) {
                // we should not get here
                throw new Error('brings page of 2 items from index 1 failed')
            }
        });
    })
});