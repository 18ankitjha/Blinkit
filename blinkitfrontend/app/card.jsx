export default function Card({ image }) {
  return (
    <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src={image}
            alt=""
          />
    </div>
  );
}