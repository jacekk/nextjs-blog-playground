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
			<article className="mt-10">{post.content}</article>
		</section>
	);
}
