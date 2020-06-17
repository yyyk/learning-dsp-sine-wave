import { shallowMount, createLocalVue } from '@vue/test-utils'
import Index from '@/pages/index.vue'

const localVue = createLocalVue()

describe('index.vue', () => {
  const mountFunction = (options = {}) => {
    return shallowMount(Index, {
      localVue,
      mocks: {
        $nuxt: {
          $emit: () => ({})
        }
      },
      ...options
    })
  }

  it('renders correctly', () => {
    const wrapper = mountFunction({
      data: () => ({
        doc: null,
        prev: null,
        next: null
      })
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('exists', () => {
    const wrapper = mountFunction({
      data: () => ({
        doc: null,
        prev: null,
        next: null
      })
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should have nuxt-content when doc is not null', () => {
    const wrapper = mountFunction({
      data: () => ({
        doc: {},
        prev: null,
        next: null
      }),
      stubs: ['nuxt-content']
    })
    expect(wrapper.exists()).toBe(true)
  })
})
