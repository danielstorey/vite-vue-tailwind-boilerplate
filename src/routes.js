import Home from './pages/home.vue'
import Contact from './pages/contact.vue'

export default [
  {
    path: '/',
    component: Home,
    meta: {
      title: 'Hardcode',
      description: 'Site description',
      image: '/images/',
    },
  },
  {
    path: '/contact',
    component: Contact,
    meta: {
      title: 'Contact Us',
      description: 'Fill out the form to get in touch',
      image: 'images/hardcode-preview.png',
    },
  },
]
