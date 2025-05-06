import NextImage from "next/image";

export default function Image({
  ...props
}: React.ComponentProps<typeof NextImage>) {
  return (
    <>
      <div className="image-wrapper-wrapper">
        <div className="image-wrapper">
          <NextImage {...props} />
        </div>
      </div>
      <style jsx>{`
        .image-wrapper-wrapper {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
