const NerdDescription = ({
  index,
  name,
  description,
}: {
  index: number;
  name: string;
  description: string;
}) => {
  return (
    <div
      className={`flex items-center py-8  ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"} w-full relative`}
    >
      <div className="flex flex-col max-w-xl gap-4 md:gap-6">
        <p className="text-4xl md:text-5xl">{name}</p>
        <p
          id="description"
          className="font-thin text-lg md:text-base lg:text-xl opacity-80"
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default NerdDescription;
