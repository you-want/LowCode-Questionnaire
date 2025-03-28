/* eslint-disable camelcase */
import { GET } from '@/utils/axios'

const APIs = {
  GET_USERS: '/users'
}

export interface IGithubUsers {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string
  html_url: string;
  id: number
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}
export function getUsers (params?: {}) {
  return GET<IGithubUsers[]>({
    url: APIs.GET_USERS,
    params
  })
}
