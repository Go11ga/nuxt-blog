export default function ({ $axios, redirect, store, route }) {
  $axios.onError(error => {
    if (error.response) {
      if (error.response.status === 401) {
        if(route.path == '/admin'){
          redirect('/admin/login?message=login')
          store.dispatch('auth/logout')
        } 
      }

      if (error.response.status === 500) {
        console.error('Server 500 error')
      }
    }
  })
}