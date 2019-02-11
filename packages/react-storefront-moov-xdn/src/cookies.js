/**
 * @license
 * Copyright © 2017-2019 Moov Corporation.  All rights reserved.
 */
/**
 * Rewrites all set-cookie headers from the upstream domain so that they use the current 
 * domain and "/" for the path.
 */
export function rewriteCookies() {
  allCookies((cookie, value, attribs) => {
    attribs.domain = env.host_no_port
    attribs.path = '/'
  })
}

// NOTE: This function is lifted from the guts of moov_rewriter/lib/reponse_post.js
function allCookies(callback) {
  /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
  const { fields } = global.headers_full;
  for (let i = 0, len = fields.length; i < len; i++) {
    if (fields[i][0]) {
      const k = fields[i][0];
      if (k && k.toLowerCase() === 'set-cookie') {
        const txt = fields[i][1];
        const parts = txt.split(';');
        const nv = parts[0].split('=');
        const attrs = {};

        // parse the cookie and create the attribs structure to represent each part of the cookie and lower cases the key.
        // e.g. set-cookie: a=b;Expires=Tue, 15-Jan-2013 21:47:38 GMT; Path=/
        // attrs= { a: 'b', expires: 'Tue, 15-Jan-2013 21:47:38 GMT', path: '/'
        for (let i2 = 1; i2 < parts.length; i2++) {
          const kv = parts[i2].split('=');
          const n = kv[0];
          attrs[n.trim().toLowerCase()] = kv[1];
        }

        // This is an emit, not really a callback because we call it multiple times
        // eslint-disable-next-line callback-return
        callback(nv[0], nv[1], attrs);

        let join = parts[0];
        const attrnames = Object.keys(attrs);
        for (let i3 = 0; i3 < attrnames.length; i3++) {
          const k3 = attrnames[i3];
          // According to the RFC for cookies, the space after the ; is required
          join += `; ${k3}`;
          const val = attrs[k3.trim().toLowerCase()];
          if (val) {
            join += `=${val}`;
          }
        }
        fields[i][1] = join;
      }
    }
  }
}
