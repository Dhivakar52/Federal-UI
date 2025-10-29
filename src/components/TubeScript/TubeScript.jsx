import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("English");
  const [applyCleaning, setApplyCleaning] = useState(true);
  const [loading, setLoading] = useState(false);

  // separate states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [transcript, setTranscript] = useState([]); // array instead of string

  const apiUrl = import.meta.env.VITE_API_URL;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // clear old data
    setTitle("");
    setDescription("");
    setTranscript([]);

    try {
      const res = await fetch(`${apiUrl}/tubetwo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ youtubeUrl: url, language, applyCleaning }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setTitle(data.title || "No title found");
        setDescription(data.description || "No description available");
        setTranscript(Array.isArray(data.transcript) ? data.transcript : []);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Download transcript with timestamps
  const handleDownload = () => {
    if (!title && !description && transcript.length === 0) return;

    const transcriptText = transcript
      .map((seg) => `${seg.time} - ${seg.text}`)
      .join("\n");

    const content = `Title: ${title}\n\nDescription:\n${description}\n\nTranscript:\n${transcriptText}`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transcript.txt";
    link.click();
  };

  return (
    <div className="py-4">
      <h1 className="mb-4">YouTube → Transcript</h1>
      <div className="row">
        {/* Left: Form */}
        <div className="col-md-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">YouTube URL</label>
              <input
                className="form-control"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL here"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Language</label>
              <select
                className="form-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>English</option>
                <option>Kannada</option>
                <option>Tamil</option>
                <option>Telugu</option>
                <option>Hindi</option>
              </select>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={applyCleaning}
                onChange={(e) => setApplyCleaning(e.target.checked)}
              />
              <label className="form-check-label">Apply Gemini Cleaning</label>
            </div>

            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Processing..." : "Process"}
            </button>
          </form>
        </div>

        {/* Right: Output */}
        <div className="col-md-7">
          <div className="border p-3 rounded">
            <h5>Title</h5>
            <p>{title}</p>

            <h5>Description</h5>
            <p style={{ whiteSpace: "pre-wrap" }}>{description}</p>

            <h5>Transcript</h5>
            <div
              className="border p-2 mb-3"
              style={{
                maxHeight: "500px",
                overflowY: "auto",
                fontFamily: "monospace",
              }}
            >
              {transcript.length > 0 ? (
                transcript.map((seg, idx) => (
                  <div key={idx}>
                    <strong>{[seg.time]}</strong> — {[seg.text]}
                  </div>
                ))
              ) : (
                <p>No transcript available</p>
              )}
            </div>

            <button className="btn btn-success" onClick={handleDownload}>
              Download Transcript
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
