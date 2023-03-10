import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import BlogCard from '@/components/BlogCard';
const graphcms = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cleo8x3yy0zd101rq7hjfhnh4/master"
);

const QUERY = gql`
{
  posts {
    id
    title
    datePublished
    slug
    content {
      html
    }
    author {
      name
      avatar {
        url
      }
    }
    coverPhoto {
      publishedAt
      createdBy {
        id
      }
      url
    }
  }
}`

console.log(QUERY);


export async function getStaticProps() {
  try {
    const { posts } = await graphcms.request(QUERY);
    return {
      props: {
        posts,
      },
      revalidate: 30,
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        posts: [],
      },
      revalidate: 30,
    };
  }
}

export default function Home({ posts }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Блог мой на GraphQLClient + Next</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.datePublished}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  );
}