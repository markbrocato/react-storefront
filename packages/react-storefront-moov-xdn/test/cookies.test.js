import { rewriteCookies } from '../src/cookies'

describe('cookies', () => {
  describe('rewriteCookies', () => {
    beforeEach(() => {
      global.env = {
        host_no_port: 'app.com'
      }
    })

    it('should rewrite cookies from the upstream domain to the current domain', () => {
      global.headers_full = {
        fields: [
          ['set-cookie', 'foo=bar; domain=origin.com; path=/login']
        ]
      }

      rewriteCookies()

      expect(global.headers_full).toEqual({
        fields: [
          ['set-cookie', 'foo=bar; domain=app.com; path=/']
        ]
      })
    })

    it('should set path to /', () => {
      global.headers_full = {
        fields: [
          ['set-cookie', 'foo=bar; domain=origin.com']
        ]
      }

      rewriteCookies()

      expect(global.headers_full).toEqual({
        fields: [
          ['set-cookie', 'foo=bar; domain=app.com; path=/']
        ]
      })
    })

    it('should remove the leading .', () => {
      global.headers_full = {
        fields: [
          ['set-cookie', 'foo=bar; domain=.origin.com']
        ]
      }

      rewriteCookies()

      expect(global.headers_full).toEqual({
        fields: [
          ['set-cookie', 'foo=bar; domain=app.com; path=/']
        ]
      })
    })

    it('should skip other headers', () => {
      global.headers_full = {
        fields: [
          ['set-cookie', 'foo=bar; domain=.origin.com'],
          ['cache-control', 'nocache']
        ]
      }

      rewriteCookies()

      expect(global.headers_full).toEqual({
        fields: [
          ['set-cookie', 'foo=bar; domain=app.com; path=/'],
          ['cache-control', 'nocache']
        ]
      })
    })
  })
})