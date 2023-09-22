import Image from 'next/image';

interface CustomImageProps {
	src: string;
	alt: string;
	priority?: string;
}

export const CustomImage: React.FC<CustomImageProps> = (props) => {
	const priority = props.priority ? true : false;
	return (
		<div className="w-full h-full">
			<Image
				alt={props.alt}
				className="rounded-lg mx-auto"
				height={650}
				priority={priority}
				src={props.src}
				width={650}
			/>
		</div>
	);
};
