import { defineStore } from 'pinia'
import axios from 'axios'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    userProfile: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    async fetchUserProfile() {
      try {
        const res = await axios.get('http://localhost:5177/api/UserProfile/me')
        this.userProfile = res.data
      } catch (err) {
        console.error('Failed to fetch user profile:', err)
      }
    },
    async updateUserProfile(updatedProfile) {
      try {
        const res = await axios.post('http://localhost:5177/api/UserProfile/update', updatedProfile)
        // Use Object.assign to keep reactivity
        Object.assign(this.userProfile, updatedProfile)
      } catch (err) {
        console.error('Failed to update user profile:', err)
        throw err
      }
    },

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

        // 🆕 Fetch user profile after successful login
        await this.fetchUserProfile()
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
      await axios.post('http://localhost:5177/auth/logout', {
        refreshToken: this.refreshToken  // Wrap in object
      });

      this.accessToken = null;
      this.refreshToken = null;
      this.userProfile = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
})

if (localStorage.getItem('accessToken')) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
}
