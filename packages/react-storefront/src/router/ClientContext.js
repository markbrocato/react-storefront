/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
export default class ClientContext {

  /**
   * The setting for service-worker caching
   */
  clientCache = 'default'

  /**
   * Controls caching in the service worker
   * @param {Boolean} shouldCache Set to true to cache the response on the client
   * @return {Response} this
   */
  cacheOnClient(shouldCache) {
    if (shouldCache == null) throw new Error('shouldCache cannot be null in call to response.cacheOnClient')
    this.clientCache = shouldCache ? 'force-cache' : 'default'
    return this
  }

}