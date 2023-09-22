import { compileMDX } from 'next-mdx-remote/rsc';
import { Octokit } from 'octokit';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

import { PostMeta } from '_types/posts';

import { CustomImage } from '../components/CustomImage';
import { Video } from '../components/Video';

const EXT = '.mdx';

const REPO_CONFIG = {
	owner: 'gitdagray',
	repo: 'test-blogposts',
	tree_sha: 'main',
};

export async function getPostsData(): Promise<PostMeta[]> {
	const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_TOKEN });
	const { data } = await octokit.rest.git.getTree({
		...REPO_CONFIG,
		recursive: 'true',
	});
	const files = data.tree.map((i) => i.path || '');
	const onlyMdx = files.filter((i) => i.endsWith(EXT)).map((i) => i.replace(EXT, ''));

	const posts: PostMeta[] = [];

	for (const id of onlyMdx) {
		const post = await getPostMeta(id);
		if (post) {
			posts.push(post);
		}
	}

	return posts;
}

async function getPostMeta(id: string): Promise<PostMeta | null> {
	const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_TOKEN });
	let content = '';

	try {
		const { data } = await octokit.rest.repos.getContent({
			...REPO_CONFIG,
			path: id + EXT,
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
		options: {
			parseFrontmatter: true,
			mdxOptions: {
				rehypePlugins: [
					rehypeHighlight,
					rehypeSlug,
					[
						rehypeAutolinkHeadings,
						{
							behavior: 'wrap',
						},
					],
				],
			},
		},
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
