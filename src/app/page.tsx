import { PostsList } from '_components/posts/PostsList';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-800">
			<PostsList />
		</main>
	);
}
