import { reactive, readonly, provide, inject } from 'vue'
import axios from 'axios'
import { Post, User } from './types'

interface PostsState {
  ids: string[]
  all: Record<string, Post>
  loaded: boolean
}

interface State {
  posts: PostsState
}

const initialPostsState = (): PostsState => ({
  ids: [
  ],
  all: {
  },
  loaded: false
})

const initialState = (): State => ({
  posts: initialPostsState()
})

class Store {
  protected state: State

  constructor(initialState: State) {
    this.state = reactive(initialState)
  }

  public getState() {
    return readonly(this.state)
  }

  async createUser(user: User) {
    // ...
  }

  async createPost(post: Post) {
    const response = await axios.post<Post>('/posts', post)
    this.state.posts.all[response.data.id] = response.data
    this.state.posts.ids.push(response.data.id.toString())
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>('/posts')
    console.log(response.data)
    for (const post of response.data) {
      if (!this.state.posts.ids.includes(post.id.toString())) {
        this.state.posts.ids.push(post.id.toString())
      }

      this.state.posts.all[post.id] = post
    }

    this.state.posts.loaded = true
  }
}

const store = new Store(initialState())
store.getState()

export const provideStore = () => {
  provide('store', store)
}

export const createStore = () => {
  return new Store(initialState())
}

export const useStore = (): Store => {
  const store = inject<Store>('store')
  return store
}
