import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Pager from '@/components/Pager.vue'
import { PageLink } from '@/types/Pager'

const localVue = createLocalVue()

describe('Pager.vue', () => {
  const mountFunction = (options = {}) => {
    return mount(Pager, {
      localVue,
      stubs: { NuxtLink: RouterLinkStub },
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

  it('should have pager css class', () => {
    const wrapper = mountFunction()
    const parentDiv = wrapper.find('.pager')
    expect(parentDiv.exists()).toBe(true)
  })

  describe('Props', () => {
    describe("'prev' and 'next' are null", () => {
      const wrapper = mountFunction({
        propsData: {
          prev: null,
          next: null
        }
      })
      it("shouldn't have prev link", () => {
        const prevLink = wrapper.find('.prev')
        expect(prevLink.exists()).toBe(false)
      })
      it("shouldn't have next link", () => {
        const nextLink = wrapper.find('.next')
        expect(nextLink.exists()).toBe(false)
      })
    })

    describe("'prev' and 'next' are provided", () => {
      const wrapper = mountFunction({
        propsData: {
          prev: {
            path: '/'
          } as PageLink,
          next: {
            path: '/'
          } as PageLink
        }
      })
      it('should have prev link', () => {
        const prevLink = wrapper.find('.prev')
        expect(prevLink.exists()).toBe(true)
      })
      it('should have next link', () => {
        const nextLink = wrapper.find('.next')
        expect(nextLink.exists()).toBe(true)
      })
    })

    describe("'prev' is only provided", () => {
      const wrapper = mountFunction({
        propsData: {
          prev: {
            path: '/'
          } as PageLink,
          next: null
        }
      })
      it('should have prev link', () => {
        const prevLink = wrapper.find('.prev')
        expect(prevLink.exists()).toBe(true)
      })
      it("shouldn't have next link", () => {
        const nextLink = wrapper.find('.next')
        expect(nextLink.exists()).toBe(false)
      })
    })

    describe("'next' is only provided", () => {
      const wrapper = mountFunction({
        propsData: {
          prev: null,
          next: {
            path: '/'
          } as PageLink
        }
      })
      it("shouldn't have prev link", () => {
        const prevLink = wrapper.find('.prev')
        expect(prevLink.exists()).toBe(false)
      })
      it('should have next link', () => {
        const nextLink = wrapper.find('.next')
        expect(nextLink.exists()).toBe(true)
      })
    })
  })
})
