const ProjectDescription = ({
  name,
  description,
  children,
  showTechnologies,
  technologies,
}: {
  index: number;
  name: string;
  description: string;
  children: React.ReactNode;
  showTechnologies?: boolean;
  technologies: string[];
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
        {showTechnologies && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((technology, index) => (
              <span
                key={index}
                className="text-sm border text-white px-3 py-2 rounded-full"
              >
                {technology}
              </span>
            ))}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default ProjectDescription;
