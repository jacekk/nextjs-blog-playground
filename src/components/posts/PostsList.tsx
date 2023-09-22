import { getPostsData } from '_services/posts';
import { formatDate } from '_utils/dates';
import Link from 'next/link';

export async function PostsList() {
	const posts = await getPostsData();

	return (
		<ul className="list-none">
			{posts.map((post) => (
				<li key={post.id} className="mt-4 text-2xl dark:text-white/90">
					<Link className="underline hover:text-black/70 dark:hover:text-white" href={`/posts/${post.id}`}>
						{post.title}
					</Link>
					<br />
					<p className="text-sm mt-1">{formatDate(post.date)}</p>
				</li>
			))}
		</ul>
	);
}
