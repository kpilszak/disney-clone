import { gql, GraphQLClient } from 'graphql-request'
import Section from '../components/Section'

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT
  const graphqlClient = new GraphQLClient(url, {
    headers: {
      "Authorization": process.env.GRAPH_CMS_TOKEN
    }
  })

  const query = gql`
    query {
      videos {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }`

  const data = await graphqlClient.request(query)
  const videos = data.videos

  return {
    props: {
      videos,
    }
  }
}

const Home = ({ videos }) => {
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }
  
  return (
    <>
    <div className="app">
      <div className="main-video">
        <img src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title} />
      </div>
    </div>
    <div className="video-feed">
      <Section genre={'Family'}/>
      <Section genre={'Thriller'}/>
      <Section genre={'Classic'}/>
      <Section genre={'Pixar'}/>
      <Section genre={'Marvel'}/>
      <Section genre={'National Geographic'}/>
      <Section genre={'Disney'}/>
      <Section genre={'Star Wars'}/>
    </div>
    </>
  )
}

export default Home