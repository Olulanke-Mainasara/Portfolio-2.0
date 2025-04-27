const ProjectDescription = ({
  index,
  name,
  description,
  children,
}: {
  index: number;
  name: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-center w-full relative">
      <div className="flex flex-col max-w-xl gap-4 md:gap-6">
        <p className="text-4xl md:text-5xl">{name}</p>
        <p
          id="description"
          className="font-thin text-lg md:text-base lg:text-xl opacity-80"
        >
          {description}
        </p>
        {children}
      </div>
    </div>
  );
};

export default ProjectDescription;
