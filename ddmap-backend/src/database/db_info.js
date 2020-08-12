// 코드상에서는 DB에 대한 정보가 없어야 한다 -> 환경변수로 읽어서 실행되도록
// export SESSION_SECRET="keyboard cat" 이용, 추후 변경

module.exports = (function () {
  return {
    local: { // localhost '54.180.144.37'
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '',
      database: ''
    },
    real: { // real server db info
      host: '3.35.2.138',
      port: '3306',
      user: 'sik8856',
      password: 'dkagh1..',
      database: 'ddmap'
    },
    dev: { // dev server db info - Not using now
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    }
  }
})();