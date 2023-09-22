import 'highlight.js/styles/github-dark.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getPostsData } from '_services/posts';
import { formatDate } from '_utils/dates';

type Props = {
	params: {
		postId: string;
	};
};

export default async function PostPage(props: Props) {
	const posts = await getPostsData();
	const post = posts.find((i) => i.id === props.params.postId);

	if (!post) {
		return notFound();
	}

	return (
		<section>
			<h2 className="text-4xl">{post.title}</h2>
			<h3 className="text-white/75">{formatDate(post.date)}</h3>
			<article className="my-10 prose prose-xl dark:prose-invert">{post.content}</article>
			<p className="text-white/60 hover:text-white">
				<Link href="/">⬅ Back to home</Link>
			</p>
		</section>
	);
}
