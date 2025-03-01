const SectionHeading = ({ title, description }: { title: string; description: React.ReactNode | string }) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-center mb-3">{title}</h2>
      <p className="text-center text-base">{description}</p>
    </div>
  );
};

export default SectionHeading;
