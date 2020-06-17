import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { MenuLink } from '@/types/Menu'

export const state = () => ({
  menu: [] as MenuLink[]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  menu: (state) => state.menu
}

export const mutations: MutationTree<RootState> = {
  SET_MENU: (state, menu) => (state.menu = menu)
}

export const actions: ActionTree<RootState, RootState> = {
  setMenu: ({ commit }, menu) => {
    commit('SET_MENU', menu)
  }
}
