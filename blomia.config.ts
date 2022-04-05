const URL_API_OPTIONS = {
  development: 'https://blomia-api-dev.herokuapp.com/api/v2',
  staging: 'https://blomia-api-staging.herokuapp.com/api/v2',
  production: 'https://blomia-api.herokuapp.com/api/v2',
};

const URL_STARK_BANK_OPTIONS = {
  development: 'https://sandbox.api.starkbank.com/',
  staging: 'https://sandbox.api.starkbank.com/',
  production: 'https://api.starkbank.com',
};

const URL_ACTION_CABLE_OPTIONS = {
  development: 'wss://blomia-api-dev.herokuapp.com/cable/',
  staging: 'wss://blomia-api-staging.herokuapp.com/cable/',
  production: 'wss://blomia-api.herokuapp.com/cable/',
};

const KEY_PUB_WIRE_CARD_OPTIONS = {
  development: `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArFdbQvGN365sKTVS//gZ
  zken/UUiKicP7hPqNhCJ8tHSyGd/zDEs3v4v7lIssB55GMj1uJsF9lStJ97GbRWD
  AxQg49QWqQj/4snklqLxd3ZLcQkJIN1E0L5x7v5VddXh4e1pGYSaXWLdVD8R1BRl
  Gsv+tFF+5tfhCoCkNa96gI5CQUvZlFdz0otY0d1jT7GcfGlIfN9F0Xe32dFaRtQa
  2hehvBkI4k63uSaoFsD5cuQyIkukjKw+RpatG0iIA3augIKlOJ1dCe/B/ufZ/d0Q
  HiXNDzAx3O9SM1FTjTDdmk/KXrPi2+owlBs6zdoDJC818OSZ2WGxFd2lfXNjNS43
  fwIDAQAB
  -----END PUBLIC KEY-----`,
  staging: `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArFdbQvGN365sKTVS//gZ
  zken/UUiKicP7hPqNhCJ8tHSyGd/zDEs3v4v7lIssB55GMj1uJsF9lStJ97GbRWD
  AxQg49QWqQj/4snklqLxd3ZLcQkJIN1E0L5x7v5VddXh4e1pGYSaXWLdVD8R1BRl
  Gsv+tFF+5tfhCoCkNa96gI5CQUvZlFdz0otY0d1jT7GcfGlIfN9F0Xe32dFaRtQa
  2hehvBkI4k63uSaoFsD5cuQyIkukjKw+RpatG0iIA3augIKlOJ1dCe/B/ufZ/d0Q
  HiXNDzAx3O9SM1FTjTDdmk/KXrPi2+owlBs6zdoDJC818OSZ2WGxFd2lfXNjNS43
  fwIDAQAB
  -----END PUBLIC KEY-----`,
  production: `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh6E0vMx2857kg7l/q9op
  cb5LJ1y/AiLruo4b5WbDmOwSseefrcnMUB8PGLDGL0jHmg+mTgPu/xKmuGpGVECi
  1zTsl/rCm5fwNDOqKrdTiTvbgKeJ8m56VZXCXOSn2jbNIYMsAyvdZneGq+bzAsFW
  lT2zMHwBt5SVc4a24DYVSUEuFwwSDn7vQWIjumnhjvVW46fPv6Q864SGBe8S62aw
  eTydHFmLtm+/0A4x0G6CORL76P9vqzZs683fhaK74x4GHb6bSCzt5jX4M4WuDKf5
  5chOW/hawvLwqa9GNIbXJrJGaGt6Oh1ZP3AA4bIX88cz9yN9M2nIsZxLO/Vi2qZC
  FQIDAQAB
  -----END PUBLIC KEY-----`,
};

export const URL_API = URL_API_OPTIONS.development;
export const URL_STARK_BANK = URL_STARK_BANK_OPTIONS.development;
export const URL_ACTION_CABLE = URL_ACTION_CABLE_OPTIONS.development;
export const KEY_PUB_WIRE_CARD = KEY_PUB_WIRE_CARD_OPTIONS.development;
