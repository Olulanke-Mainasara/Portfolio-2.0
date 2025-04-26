import React from "react";

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
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col max-w-xl gap-4 md:gap-6">
        <p className="text-3xl">
          {index} - {name}
        </p>
        <p className="text-base font-thin xl:text-xl opacity-80">
          {description}
        </p>
        {children}
      </div>
    </div>
  );
};

export default ProjectDescription;
