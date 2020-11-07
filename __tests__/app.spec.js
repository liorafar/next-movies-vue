import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import App from '../src/App.vue'

describe('App', () => {
    // Inspect the raw component options
    it('has data', () => {
      expect(typeof App.data).toBe('function')
    })
  })

describe('Mounted App', () => {
    it('is instantiated', async () => {
        // inject router view
        const localVue = createLocalVue()
        localVue.use(VueRouter)
        const router = new VueRouter();
        const wrapper = await shallowMount(App, {
          localVue,
          router
        })
        expect(wrapper.vm).toBeTruthy()
    })
})