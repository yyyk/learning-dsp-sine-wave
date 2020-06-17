import { MenuLink } from './../../types/Menu'
import { actions, getters, mutations } from '@/store'

describe('mutations', () => {
  describe('SET_MENU', () => {
    it('sets menu', () => {
      const state = {
        menu: [] as MenuLink[]
      }
      const menu: MenuLink[] = [
        {
          title: 'title-1',
          path: 'path-1'
        }
      ]
      mutations.SET_MENU(state, menu)
      expect(state).toEqual({
        menu: [
          {
            title: 'title-1',
            path: 'path-1'
          }
        ]
      })
    })
  })
})

describe('actions', () => {
  describe('setMenu', () => {
    it('sets menu', () => {
      const commit = jest.fn()
      const menu: MenuLink[] = [
        {
          title: 'title-1',
          path: 'path-1'
        }
      ]
      ;(actions as any).setMenu({ commit }, menu)
      expect(commit).toHaveBeenCalledWith('SET_MENU', [
        {
          title: 'title-1',
          path: 'path-1'
        }
      ])
    })
  })
})

describe('getters', () => {
  describe('menu', () => {
    it('returns menu', () => {
      const state = {
        menu: [
          {
            title: 'title-1',
            path: 'path-1'
          }
        ]
      }
      const actual = (getters as any).menu(state)
      expect(actual).toEqual([
        {
          title: 'title-1',
          path: 'path-1'
        }
      ])
    })
  })
})
