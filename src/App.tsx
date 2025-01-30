/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Client, client } from "@gradio/client";
import {
  ImagePlus,
  Wand2,
  Loader2,
  Download,
  Github,
  Copyright,
  Linkedin,
  FileStack as StackOverflow,
} from "lucide-react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState(1234);
  const [guidance, setGuidance] = useState(5);
  const [temperature, setTemperature] = useState(1);
  const [generatedImages, setGeneratedImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // const app = await client("https://deepseek-ai-janus-pro-7b.hf.space/");
      const client = await Client.connect("deepseek-ai/Janus-Pro-7B", {
        hf_token: import.meta.env.VITE_HUGGING_FACE_TOKEN,
      });
      const result = await client.predict("/generate_image", {
        prompt: prompt,
        seed: seed,
        guidance: guidance,
        t2i_temperature: temperature,
      });

      if (!result.data?.[0]) {
        throw new Error("No image data received");
      }

      setGeneratedImages(result.data[0]);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
      console.error("Generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `generated-image-${index + 1}.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Download error:", err);
      setError("Failed to download image. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <ImagePlus className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-bold">AI Image Generator</h1>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white"
                placeholder="Describe the image you want to generate..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Seed (Optional)
                </label>
                <input
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Guidance (CFG Weight): {guidance}
                </label>
                <input
                  type="range"
                  min="5"
                  max="10"
                  value={guidance}
                  onChange={(e) => setGuidance(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Temperature: {temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {error && <div className="text-red-400 text-sm">{error}</div>}

            <button
              onClick={generateImage}
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Wand2 className="w-5 h-5" />
              )}
              {loading ? "Generating..." : "Generate Images"}
            </button>
          </div>

          {generatedImages.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-medium mb-4">Generated Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedImages.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-lg p-4 space-y-4"
                  >
                    <img
                      src={item.image.url}
                      alt={`Generated ${index + 1}`}
                      className="w-full h-auto rounded-lg"
                    />
                    <button
                      onClick={() => handleDownload(item.image.url, index)}
                      className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="mt-12 max-w-6xl mx-auto w-full shadow-md pb-5">
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Copyright className="w-4 h-4" />
              <span>AJOY SARKER - All rights reserved 2025</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/ajoysr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/ajoysrju/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://stackoverflow.com/users/22562200/ajoy-sarker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <StackOverflow className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
