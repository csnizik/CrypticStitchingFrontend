import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetServerSideProps } from 'next'
import api from '../../utils/api'

type PatternProps = {
  pattern: {
    uid: number
    title: string
    creator: string
    category: string[]
    tags: string[]
    width: number
    height: number
    date_added: string
    ratingsOverall: number
    ratingsDifficulty: number
    ratingsFun: number
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.params as ParsedUrlQuery

  try {
    const response = await api.get(`/patterns/${uid}`)
    const pattern = response.data

    return {
      props: { pattern },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

const Pattern: React.FC<PatternProps> = ({ pattern }) => {
  return (
    <div>
      <h1>{pattern.title}</h1>
      <p>Creator: {pattern.creator}</p>
      <p>Category: {pattern.category.join(', ')}</p>
      <p>Tags: {pattern.tags.join(', ')}</p>
      <p>Width: {pattern.width}</p>
      <p>Height: {pattern.height}</p>
      <p>Date Added: {new Date(pattern.date_added).toLocaleString()}</p>
      <p>Ratings Overall: {pattern.ratingsOverall.toFixed(2)}</p>
      <p>Ratings Difficulty: {pattern.ratingsDifficulty.toFixed(2)}</p>
      <p>Ratings Fun: {pattern.ratingsFun.toFixed(2)}</p>
    </div>
  )
}

export default Pattern
