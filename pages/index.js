import { gql, GraphQLClient } from 'graphql-request'
import Section from '../components/Section'
import NavBar from '../components/NavBar'

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT
  const graphqlClient = new GraphQLClient(url, {
    headers: {
      "Authorization": process.env.GRAPH_CMS_TOKEN
    }
  })

  const videosQuery = gql`
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

  const accountQuery = gql`
    query {
      account(where: { id: "013581dcff9044b58dd4b662d247d92f"}) {
        username
        avatar {
          url
        }
      }
    }`

  const data = await graphqlClient.request(videosQuery)
  const videos = data.videos
  const accountData = await graphqlClient.request(accountQuery)
  const account = accountData.account

  return {
    props: {
      videos,
      account
    }
  }
}

const Home = ({ videos, account }) => {
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  
  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  const unseenVideos = (videos) => {
    return videos.filter(video => video.seen == false || video.seen == null)
  }

  return (
    <>
    <NavBar account={account}/>
    <div className="app">
      <div className="main-video">
        <img src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title} />
      </div>

      <div className="video-feed">
          <a href="#disney"><div className="franchise" id="disney"></div></a>
          <a href="#pixar"><div className="franchise" id="pixar"></div></a>
          <a href="#star-wars"><div className="franchise" id="star-wars"></div></a>
          <a href="#nat-geo"><div className="franchise" id="nat-geo"></div></a>
          <a href="#marvel"><div className="franchise" id="marvel"></div></a>
          <Section genre={'Recommended for you'} videos={unseenVideos(videos)} />
          <Section genre={'Family'} videos={filterVideos(videos, 'family')} />
          <Section genre={'Thriller'} videos={filterVideos(videos, 'thriller')} />
          <Section genre={'Classic'} videos={filterVideos(videos, 'classic')} />
          <Section id="pixar" genre={'Pixar'} videos={filterVideos(videos, 'pixar')} />
          <Section id="marvel" genre={'Marvel'} videos={filterVideos(videos, 'marvel')} />
          <Section id="nat-geo" genre={'National Geographic'} videos={filterVideos(videos, 'national-geographic')} />
          <Section id="disney" genre={'Disney'} videos={filterVideos(videos, 'disney')} />
          <Section id="star-wars" genre={'Star Wars'} videos={filterVideos(videos, 'star-wars')} />
      </div>
    </div>
    </>
  )
}

export default Home