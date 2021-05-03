import { GetStaticProps, GetStaticPaths } from 'next'
import PostTemplate from '../../components/templates/Post'
import { getAllPostsIds, getPostData } from '../../lib/posts'
import { getProfileData } from '../../lib/profile'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostsIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: {
  params: {
    id: string
  }
}) => {
  const post = await getPostData(params.id)
  const profile = await getProfileData()
  return {
    props: {
      post,
      profile
    }
  }
}

export default function Post({ post, profile }: {
  post: Post,
  profile: Profile
}) {
  return <PostTemplate post={post} profile={profile}/>
}
