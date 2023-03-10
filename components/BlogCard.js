import styles from "../styles/BlogCard.module.css";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";


function BlogPost({ title, author, coverPhoto, datePublished, slug }) {
    return (

        <div className={styles.card}>
            <Link href={`/posts/${slug}`}>
                <div className={styles.imgContainer}>
                    {coverPhoto && <Image layout="fill" src={coverPhoto.url} alt="" />}
                </div>
            </Link>
            <div className={styles.text}>
                <h2>{title}</h2>
                исправь ошибку
                <div className={styles.details}>
                    {author && (
                        <div className={styles.author}>
                            <h3>{author.name}</h3>
                        </div>
                    )}
                    <div className={styles.date}>
                        <h3>{moment(datePublished).format("MMMM d, YYYY")}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BlogPost;