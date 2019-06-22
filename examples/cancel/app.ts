import axios from '../../src/index'

const CancelToken = axios.cancelToken
const source = CancelToken.source()

console.log("1")
axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {

  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})
console.log("2")

setTimeout(() => {
  console.log("4")

  source.cancel('Operation canceled by the user.')

  axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)

interface Canceler {
  (message?: string): void
}

let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})
console.log("3")

// setTimeout(() => {
//   cancel()
// }, 200)
