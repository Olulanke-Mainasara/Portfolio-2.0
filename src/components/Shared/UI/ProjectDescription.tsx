const ProjectDescription = ({
  project,
  children,
  showTechnologies,
}: {
  project: {
    name: string;
    shortDescription: string;
    description: string;
    technologies: string[];
  };
  children: React.ReactNode;
  showTechnologies?: boolean;
}) => {
  const pathname = window.location.pathname;

  return (
    <div className="flex items-center justify-center w-full relative">
      <div
        className={`flex flex-col max-w-xl gap-4 md:gap-6 ${pathname === "/" ? "xl:w-3/5" : ""}`}
      >
        <p className="text-4xl md:text-5xl">{project.name}</p>
        <p
          id="description"
          className="font-thin text-lg md:text-base lg:text-xl opacity-80"
        >
          {pathname === "/" ? project.shortDescription : project.description}
        </p>
        {showTechnologies && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((technology, index) => (
              <span
                key={index}
                className="text-sm border text-white px-3 py-2 rounded-full"
              >
                {technology}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-4 md:gap-2 lg:gap-4">
          {children}
          <a
            href={`/projects#${project.name}`}
            className={`${pathname === "/projects" ? "hidden" : "flex"} items-center gap-2 group`}
          >
            <span className="text-lg text-white">View details</span>
            <span className="text-white duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;
