import request from '@/service'

export function getTopBanner() {
  return request.get({
    url: '/banner'
  })
}

export function getHotRecommend() {
  return request.get({
    url: '/personalized'
  })
}

export function getNewAlbum(offset = 0, limit = 10) {
  return request.get({
    url: '/album/new',
    params: {
      offset,
      limit
    }
  })
}

export function getPlayListDetail(id: number) {
  return request.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}
