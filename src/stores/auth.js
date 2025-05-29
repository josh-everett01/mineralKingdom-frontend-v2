import { defineStore } from 'pinia'
import axios from 'axios'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    async register(email, password) {
      await axios.post('http://localhost:5177/auth/register', { email, password })
    },
    async login(email, password) {
      try {
        const res = await axios.post('http://localhost:5177/auth/login', {
          email,
          password,
        })
        this.accessToken = res.data.accessToken
        this.refreshToken = res.data.refreshToken

        localStorage.setItem('accessToken', this.accessToken)
        localStorage.setItem('refreshToken', this.refreshToken)

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`
      } catch (err) {
        throw err // Let the caller handle it
      }
    },
    async refresh() {
      const res = await axios.post('http://localhost:5177/auth/refresh', {
        refreshToken: this.refreshToken,
      })
      this.accessToken = res.data.accessToken
      this.refreshToken = res.data.refreshToken
      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('refreshToken', this.refreshToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`
    },
    async logout() {
      await axios.post('http://localhost:5177/auth/logout', this.refreshToken, {
        headers: { 'Content-Type': 'application/json' }
      })
      this.accessToken = null
      this.refreshToken = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      delete axios.defaults.headers.common['Authorization']
    },
  },
})
