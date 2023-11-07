'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center
}) => {
  return (
    <div className={`
    grid
    mt-6
    p-2
    ${center ? 'text-center' : 'text-start'}`}
    >
      <div className="text-2xl font-bold">
        {title}
      </div>
    </div>
  );
}

export default Heading;