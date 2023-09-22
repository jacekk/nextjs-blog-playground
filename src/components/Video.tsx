type VideoProps = {
	id: string;
};

export function Video({ id }: VideoProps) {
	return (
		<div className="aspect-w-16 aspect-h-9 my-4">
			<iframe
				src={`https://www.youtube.com/embed/${id}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			/>
		</div>
	);
}
