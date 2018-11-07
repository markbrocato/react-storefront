/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */

import fetch from 'isomorphic-unfetch'

/**
 * Wraps isomorphic-unfetch and appends ?_rsf_api to all URLs.  This allows us to transition smoothly 
 * to a new API version when a new release is deployed by ensuring that the new version of the app
 * does not get stale cached responses from the prior version.
 * @param {String} path 
 * @param {...any} others 
 * @return {Promise}
 */
export default function browserFetch(path, ...others) {

  if (window.moov) {
    const version = `_rsf_api=${encodeURIComponent(window.moov.apiVersion)}`
    path = path.indexOf('?') === -1 ? `${path}?${version}` : `${path}&${version}`
  }

  return fetch(path, ...others)
}