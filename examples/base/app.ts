import axios from '../../src/index'
import logger from '../util';

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })
// //
// const date = new Date()

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 2,
    b: 3
  }
}).then(res => {
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type1': 'application/json;charset=utf-8',
    'hello': 'test'
  },
  data: {
    a: 5,
    b: 5
  }
}).then(res => {
  console.log(res)
})
//
// const arr = new Int32Array([21, 31])

// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })

//
const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// }).then((res) => {
//   console.log(res)
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   responseType: 'json',
//   data: {
//     a: 3,
//     b: 4
//   }
// }).then((res) => {
//   console.log(res)
// })
