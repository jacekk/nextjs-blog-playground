import { Octokit } from 'octokit';
import { PostMeta } from '_types/posts';
import { compileMDX } from 'next-mdx-remote/rsc';
import { CustomImage } from '../components/CustomImage';
import Video from '../components/Video';

export async function getPostsData(): Promise<PostMeta[]> {
	const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_TOKEN });
	const { data } = await octokit.rest.git.getTree({
		owner: 'gitdagray',
		recursive: 'true',
		repo: 'test-blogposts',
		tree_sha: 'main',
	});
	const files = data.tree.map((i) => ({ id: i.path || '', url: i.url || '' }));
	const onlyMdx = files.filter((i) => i.id.endsWith('.mdx'));

	const posts: PostMeta[] = [];

	for (const file of onlyMdx) {
		const post = await getPostMeta(file);
		if (post) {
			posts.push(post);
		}
	}

	return posts;
}

async function getPostMeta({ id, url }: { id: string; url: string }): Promise<PostMeta | null> {
	const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_TOKEN });
	let content = '';

	try {
		const { data } = await octokit.rest.repos.getContent({
			owner: 'gitdagray',
			repo: 'test-blogposts',
			tree_sha: 'main',
			path: id,
		});
		if (!data) {
			return null;
		}
		content = (data as { content?: string }).content ?? '';
	} catch (err) {
		console.error(err);
		return null;
	}

	const lines = Buffer.from(content, 'base64').toString('utf-8');
	const parsed = await compileMDX<Pick<PostMeta, 'title' | 'date' | 'tags'>>({
		components: { CustomImage, Video },
		options: { parseFrontmatter: true },
		source: lines,
	});

	return {
		content: parsed.content,
		date: parsed.frontmatter.date,
		id,
		tags: parsed.frontmatter.tags,
		title: parsed.frontmatter.title,
	};
}
