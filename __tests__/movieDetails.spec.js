import MovieDetails from '../src/components/MovieDetails'
import fetchMock from 'jest-fetch-mock'
import VueTestUtils, { mount, shallowMount, createLocalVue } from '@vue/test-utils'

describe('MovieDetails Component', () => {
    // Inspect the raw component options
    it('has data', () => {
        expect(typeof MovieDetails.data).toBe('function')
    })
})

describe('Mounted MovieDetails', () => {
    let wrapper;

    beforeEach(async () => {
        fetchMock.enableMocks(); // injecting fetch mock due to created hook calling fetch api
        fetchMock.mockResponse(JSON.stringify(['stub for created hook']) , { status: 200 });
  

        wrapper = await shallowMount(MovieDetails, {
            mocks: {
                $t: () => 'batman' // mocking the $t function of VueI18n
            },
            propsData: { 
                id:   1234 // mocking prop
            },         
        })
    })

    it('is instantiated', () => {
        console.log(wrapper.html())
        expect(wrapper).toBeTruthy()
    });

    // rendering test based on parameters
    it("renders released 1995, rating 8.3 and runtime 1h34m as '1995 | 1h34m | 8.3'", async () => {
        wrapper.setData({ movie: {title: "batman", imdbid: "tt0062622", released: 1995, rating: 8.3,  runtime: "1h34m"} })
        await wrapper.vm.$forceUpdate()
        console.log(wrapper.html())
        expect(wrapper.vm.releasedRatingRuntime).toBe("1995 | 1h34m | 8.3");
    })

    it("renders released 1995, no rating and runtime 1h34m as '1995 | 8.3'", async () => {
        wrapper.setData({ movie: {title: "batman", imdbid: "tt0062622", released: 1995, rating: 8.3 } })
        await wrapper.vm.$forceUpdate()
        console.log(wrapper.html())
        expect(wrapper.vm.releasedRatingRuntime).toBe("1995 | 8.3");
    })

    // Snapshot testing
    it("renders released 1995, no rating and no runtime as '1995'", async () => {
        wrapper.setData({ movie: {title: "batman", imdbid: "tt0062622", released: 1995 } })
        await wrapper.vm.$forceUpdate()
        console.log(wrapper.html())
        expect(wrapper.element).toMatchSnapshot()
    })
})