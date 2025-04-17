import { useState } from "react";
import ImageCard from "../components/ImageCard";

export default function Home() {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      setPreview(reader.result);
      setLoading(true);

      const res = await fetch("/api/ghibli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      const data = await res.json();
      setResult(data.image);
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
        Ghibli AI Dashboard
      </header>
      <main className="p-4 max-w-3xl mx-auto">
        <div className="bg-gray-100 p-4 rounded-xl shadow mb-4">
          <input type="file" onChange={handleUpload} />
          {loading && <p className="text-blue-600 mt-2">Processing image...</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preview && (
            <ImageCard title="Original Image" src={preview} />
          )}
          {result && (
            <ImageCard title="Ghibli Result" src={result} />
          )}
        </div>
      </main>
    </div>
  );
}
