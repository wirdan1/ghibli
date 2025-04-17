import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { imageBase64 } = req.body;

    try {
      const payload = { imageUrl: `data:image/jpeg;base64,${imageBase64}` };

      const response = await axios.post(
        "https://ghibliai-worker.ahmadjandal.workers.dev/generate",
        payload
      );

      const result = response.data.result;
      res.status(200).json({ image: result });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Failed to process image' });
    }
  } else {
    res.status(405).end();
  }
}
