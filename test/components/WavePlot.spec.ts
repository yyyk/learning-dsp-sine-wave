import { mount, createLocalVue } from '@vue/test-utils'
import WavePlot from '@/components/WavePlot.vue'

const localVue = createLocalVue()

describe('WavePlot.vue', () => {
  const mountFunction = (options = {}) => {
    return mount(WavePlot, {
      localVue,
      ...options
    })
  }

  it('renders correctly', () => {
    const wrapper = mountFunction()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('exists', () => {
    const wrapper = mountFunction()
    expect(wrapper.exists()).toBe(true)
  })

  it('sets viewBox', () => {
    const wrapper = mountFunction({
      data: () => ({
        innerWidth: 810,
        innerHeight: 480,
        margin: {
          top: 40,
          bottom: 50,
          left: 60,
          right: 60
        }
      })
    })
    expect(wrapper.attributes('viewBox')).toBe('0 0 930 570')
  })
})
