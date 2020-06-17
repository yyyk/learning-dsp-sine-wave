export default async function({ store, $content }) {
  let menu = []

  try {
    menu = await $content('')
      .only(['title', 'path'])
      .sortBy('page')
      .fetch()
  } finally {
    store.dispatch('setMenu', menu)
  }
}
