import { gql, GraphQLClient } from 'graphql-request'
import { useState } from 'react';

export const getServerSideProps = async (pageContext) => {
    const url = process.env.ENDPOINT
    const graphqlClient = new GraphQLClient(url, {
        headers: {
            "Authorization": process.env.GRAPH_CMS_TOKEN
        }
    })
    const pageSlug = pageContext.query.slug

    const query = gql`
        query($pageSlug: String!) {
        video(where: {
            slug: $pageSlug
        }) {
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

    const variables = {
        pageSlug,
    }

    const data = await graphqlClient.request(query, variables)
    const video = data.video
    return {
        props: {
            video
        }
    }

}

const Video = ({ video }) => {
    const [watching, setWatching] = useState(false)
    console.log(video)
    return (
        <>
            <img className="video-image" src={video.thumbnail.url} alt={video.title} />
            <div className="info">
                <p>{video.tags.join(', ')}</p>
                <p>{video.description}</p>
                <a href="/"><p>go back</p></a>
                <button className={"video-overlay"} onClick={() => {
                    watching ? setWatching(false) : setWatching(true)
                }}>PLAY</button>
            </div>
        </>
    )
}

export default Video