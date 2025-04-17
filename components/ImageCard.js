export default function ImageCard({ title, src }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <img src={src} alt={title} className="w-full rounded" />
    </div>
  );
}
