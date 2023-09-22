import Link from 'next/link';

export function Header() {
	return (
		<nav className="sticky top-0 p-2 bg-slate-600 grid place-items-center">
			<div className="w-full max-w-4xl text-white/75 hover:text-white font-bold">
				<Link href="/">Home</Link>
			</div>
		</nav>
	);
}
