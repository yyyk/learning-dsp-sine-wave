import Vuex from 'vuex'
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'
import { MenuLink } from '@/types/Menu'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    menu: [
      {
        title: 'title1',
        path: '/index'
      },
      {
        title: 'title2',
        path: '/path2'
      },
      {
        title: 'title3',
        path: '/path3'
      }
    ] as MenuLink[]
  },
  getters: {
    menu: (state) => state.menu
  }
})

describe('Navbar.vue', () => {
  const mountFunction = (options = {}) => {
    return mount(Navbar, {
      store,
      localVue,
      stubs: { NuxtLink: RouterLinkStub },
      mocks: {
        $nuxt: {
          $on: () => ({}),
          $off: () => ({})
        }
      },
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

  it('should have nav css class', () => {
    const wrapper = mountFunction()
    const parentDiv = wrapper.find('.nav')
    expect(parentDiv.exists()).toBe(true)
  })

  it('should have .nav__button', () => {
    const wrapper = mountFunction()

    const title = wrapper.find('.nav__button')
    expect(title.exists()).toBe(true)
  })

  describe('Nav menu', () => {
    it('should have menu closed by default', () => {
      const wrapper = mountFunction()
      expect(wrapper.vm.$data.active).toBe(false)
    })

    it('should open when .nav__button is clicked and toggleNav is called', async () => {
      const wrapper = mountFunction()
      wrapper.setData({
        active: false
      })
      const btn = wrapper.find('.nav__button')
      await btn.trigger('click')
      expect(wrapper.vm.$data.active).toBe(true)

      const el = wrapper.find('.nav__list-container')
      expect(el.classes().includes('active')).toBe(true)
    })

    it('should have .list__item if menu is not empty', () => {
      const wrapper = mountFunction()
      const links = wrapper.findAll('.nav__list .list__item')
      expect(links.length).toBeGreaterThan(0)
    })

    it("should have .link-text replace '/index' with '/'", () => {
      const wrapper = mountFunction()
      const link = wrapper
        .findAll('.nav__list .list__item')
        .at(0)
        .find('a')
      expect(link.props('to')).toBe('/')
    })
  })
})
