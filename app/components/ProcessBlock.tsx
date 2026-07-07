export default function ProcessBlock() {
  const process = [
    {
      title: "Creative Ideation & Strategy",
    },
    {
      title: "Design & Development",
    },
    {
      title: "Adjustments",
    },
    {
      title: "Launch to the world",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <span className="subtitle-small">(Major Stages)</span>

      <div className="flex flex-col">
        {process.map((item, index) => (
          <ProcessItem
            key={item.title}
            index={index}
            title={item.title}
            isLast={index === process.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

const ProcessItem = ({
  index,
  title,
  isLast,
}: {
  index: number;
  title: string;
  isLast: boolean;
}) => {
  return (
    <div className={`flex flex-col gap-4 ${isLast ? "pb-0" : "pb-4"}`}>
      <div className="divider" />
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-base font-medium">{title}</span>
        </div>

        <span className="subtitle-small">
          {index + 1 < 10 ? ` (0${index + 1})` : ` (${index + 1})`}
        </span>
      </div>
    </div>
  );
};
