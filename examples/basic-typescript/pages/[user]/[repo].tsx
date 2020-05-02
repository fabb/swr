import React from 'react'
import Link from 'next/link'
import fetch from '../../libs/fetch'

import useSWR from 'swr'
import { GetStaticProps } from 'next'

export default () => {
  const id =
    typeof window !== 'undefined' ? window.location.pathname.slice(1) : ''
  const { data } = useSWR<{
    forks_count: number
    stargazers_count: number
    watchers: number
  }>('/api/data?id=' + id, fetch)

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{id}</h1>
      {data ? (
        <div>
          <p>forks: {data.forks_count}</p>
          <p>stars: {data.stargazers_count}</p>
          <p>watchers: {data.watchers}</p>
        </div>
      ) : (
        'loading...'
      )}
      <br />
      <br />
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  )
}

export const getStaticProps: GetStaticProps<{}> = async () => {
  return { props: {} }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { user: 'facebook', repo: 'flipper' } },
      { params: { user: 'vuejs', repo: 'vuepress' } },
      { params: { user: 'rust-lang', repo: 'rust' } },
      { params: { user: 'zeit', repo: 'next.js' } },
    ],
    fallback: false,
  }
}
