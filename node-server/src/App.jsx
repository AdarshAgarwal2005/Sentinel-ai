import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  FileSearch,
  Gauge,
  Home,
  MessageSquareWarning,
  Newspaper,
  Radar,
  ShieldCheck,
  SquareCode,
  Sparkles,
  Zap
} from "lucide-react";

const tools = [
  {
    id: "sentiment",
    path: "/sentiment",
    title: "Sentiment Analysis",
    shortTitle: "Sentiment",
    eyebrow: "Audience Mood",
    description: "Understand whether text trends positive, negative, or neutral.",
    longDescription:
      "Useful for product reviews, social posts, feedback forms, and customer research.",
    endpoint: "/api/predict/sentiment",
    payloadKey: "text",
    icon: BarChart3,
    accent: "#f6b44b",
    placeholder:
      "Paste customer feedback, product reviews, or social posts to read the sentiment..."
  },
  {
    id: "toxicity",
    path: "/toxicity",
    title: "Toxicity Detection",
    shortTitle: "Toxicity",
    eyebrow: "Safety Review",
    description: "Flag hostile, abusive, or unsafe language before it reaches users.",
    longDescription:
      "Designed for comment sections, community platforms, chats, and support inboxes.",
    endpoint: "/api/predict/toxicity",
    payloadKey: "text",
    icon: MessageSquareWarning,
    accent: "#e95f71",
    placeholder:
      "Paste a comment, chat message, or support ticket to screen for toxicity..."
  },
  {
    id: "fake-news",
    path: "/fake-news",
    title: "Fake News Detection",
    shortTitle: "Fake News",
    eyebrow: "Source Integrity",
    description: "Evaluate news copy for misinformation patterns and confidence signals.",
    longDescription:
      "Built for news articles, claims, and public statements where credibility needs a fast first pass.",
    endpoint: "/api/predict/fake-news",
    payloadKey: "content",
    icon: Newspaper,
    accent: "#12b3a8",
    placeholder:
      "Paste a news paragraph, press release, or claim here to evaluate its credibility signal..."
  }
];

const sampleInputs = {
  "fake-news":
    "A city health department confirmed the new vaccine clinic schedule after publishing updated guidance on its official website.",
  toxicity:
    "I disagree with your idea, but I think we can improve it by testing the onboarding flow with real users.",
  sentiment:
    "The app feels fast, polished, and genuinely useful. The dashboard helped our team make a decision in minutes."
};

const getRoute = () => window.location.pathname.replace(/\/$/, "") || "/";

function App() {
  const [route, setRoute] = useState(getRoute);
  const activeTool = tools.find((tool) => tool.path === route);

  useEffect(() => {
    const syncRoute = () => setRoute(getRoute());
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  const navigate = (path) => {
    window.history.pushState(null, "", path);
    setRoute(getRoute());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="app-shell">
      <Topbar activePath={route} onNavigate={navigate} />
      {activeTool ? (
        <ModelPage tool={activeTool} onNavigate={navigate} />
      ) : (
        <HomePage onNavigate={navigate} />
      )}
    </main>
  );
}

function Topbar({ activePath, onNavigate }) {
  return (
    <nav className="topbar floating" aria-label="Primary navigation">
      <button className="brand nav-button" onClick={() => onNavigate("/")} aria-label="SENTINEL.AI home">
        <span className="brand-mark">
          <ShieldCheck size={21} />
        </span>
        <span>SENTINEL.AI</span>
      </button>

      <div className="nav-actions">
        <button className={activePath === "/" ? "active" : ""} onClick={() => onNavigate("/")}>
          <Home size={16} />
          Home
        </button>
        {tools.map((tool) => (
          <button
            className={activePath === tool.path ? "active" : ""}
            key={tool.id}
            onClick={() => onNavigate(tool.path)}
          >
            {tool.shortTitle}
          </button>
        ))}
        <button className="icon-link" onClick={() => onNavigate("/sentiment")} aria-label="Open model pages">
          <SquareCode size={18} />
        </button>
      </div>
    </nav>
  );
}

function HomePage({ onNavigate }) {
  return (
    <>
      <section className="hero-section home-hero">
        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <div className="status-pill">
              <Sparkles size={16} />
              AI trust intelligence console
            </div>
            <h1>SENTINEL.AI</h1>
            <p>
              A recruiter-ready AI product experience for misinformation detection,
              toxicity screening, and sentiment intelligence.
            </p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => onNavigate("/sentiment")}>
                Start with Sentiment
                <ArrowRight size={18} />
              </button>
              <span className="signal-copy">Node.js backend + React UI + FastAPI ML models</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="AI system overview">
            <div className="orbital-ring">
              <Radar size={82} />
            </div>
            <div className="metric-strip top">
              <Activity size={18} />
              Live inference layer
            </div>
            <div className="metric-strip bottom">
              <Gauge size={18} />
              Confidence calibrated
            </div>
            <div className="pulse-card">
              <Brain size={26} />
              <span>NLP Pipeline</span>
              <strong>3 Model Pages</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-band" aria-label="Platform highlights">
        <div>
          <strong>Real ML backend</strong>
          <span>Node.js handles routes, API responses, and communication with the ML layer.</span>
        </div>
        <div>
          <strong>Dedicated pages</strong>
          <span>Each model has its own focused workflow and URL.</span>
        </div>
        <div>
          <strong>Portfolio focused</strong>
          <span>Designed to look like a shipped AI dashboard, not a class demo.</span>
        </div>
      </section>

      <section className="workspace">
        <div className="section-heading">
          <span>Model Suite</span>
          <h2>Choose one intelligence module.</h2>
        </div>

        <div className="model-card-grid">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                className="model-card"
                key={tool.id}
                onClick={() => onNavigate(tool.path)}
                style={{ "--accent": tool.accent }}
              >
                <span className="model-card-icon">
                  <Icon size={28} />
                </span>
                <small>{tool.eyebrow}</small>
                <strong>{tool.title}</strong>
                <span>{tool.longDescription}</span>
                <b>
                  Open model
                  <ArrowRight size={17} />
                </b>
              </button>
            );
          })}
        </div>
      </section>

      <StackBand />
    </>
  );
}

function ModelPage({ tool, onNavigate }) {
  const [text, setText] = useState(sampleInputs[tool.id]);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const wordCount = useMemo(() => text.trim().split(/\s+/).filter(Boolean).length, [text]);
  const Icon = tool.icon;
  const confidence = result?.confidence ?? 0;

  const runAnalysis = async () => {
    if (!text.trim()) {
      setError("Add text before running analysis.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");
    setResult(null);

    try {
      const response = await fetch(tool.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [tool.payloadKey]: text })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to analyze the text.");
      }

      setResult(data);
      setStatus("success");
    } catch (requestError) {
      setError(requestError.message);
      setStatus("error");
    }
  };

  return (
    <>
      <section className="model-hero" style={{ "--accent": tool.accent }}>
        <div className="model-hero-inner">
          <div>
            <button className="back-link" onClick={() => onNavigate("/")}>
              <ArrowLeft size={16} />
              All models
            </button>
            <div className="status-pill">
              <Icon size={16} />
              {tool.eyebrow}
            </div>
            <h1>{tool.title}</h1>
            <p>{tool.description} {tool.longDescription}</p>
          </div>
          <div className="model-stat-panel">
            <span>Dedicated model page</span>
            <strong>{tool.shortTitle}</strong>
            <p>Paste text, run inference, and review label confidence in a focused workspace.</p>
          </div>
        </div>
      </section>

      <section className="workspace model-workspace">
        <div className="single-tool-grid">
          <div className="analysis-panel">
            <div className="panel-header" style={{ "--accent": tool.accent }}>
              <div>
                <span>{tool.eyebrow}</span>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
              </div>
              <div className="model-badge">
                <Icon size={22} />
              </div>
            </div>

            <label className="input-label" htmlFor="analysis-text">
              Input text
            </label>
            <textarea
              id="analysis-text"
              value={text}
              placeholder={tool.placeholder}
              onChange={(event) => setText(event.target.value)}
            />

            <div className="input-footer">
              <span>{wordCount} words</span>
              <button onClick={runAnalysis} disabled={status === "loading"}>
                {status === "loading" ? "Analyzing..." : "Run AI analysis"}
                <Zap size={17} />
              </button>
            </div>
          </div>

          <aside className="result-panel" aria-live="polite">
            <div className="result-header">
              <span>Model Output</span>
              <CheckCircle2 size={20} />
            </div>

            {status === "idle" && (
              <div className="empty-state">
                <FileSearch size={42} />
                <h3>Ready to classify</h3>
                <p>Edit the sample text and run the analysis.</p>
              </div>
            )}

            {status === "loading" && (
              <div className="loading-state">
                <span className="loader" />
                <h3>Reading the signal</h3>
                <p>Sending text through the Express gateway and ML service.</p>
              </div>
            )}

            {status === "error" && (
              <div className="error-state">
                <h3>Analysis unavailable</h3>
                <p>{error}</p>
              </div>
            )}

            {status === "success" && result && (
              <div className="result-state" style={{ "--accent": tool.accent, "--score": confidence }}>
                <div className="confidence-ring">
                  <span>{confidence}%</span>
                </div>
                <small>{result.inputType}</small>
                <h3>{result.label}</h3>
                <p>
                  Confidence reflects how strongly this model matched the text to the predicted class.
                </p>
                {typeof result.toxicProbability === "number" && (
                  <div className="result-note">Toxic probability: {result.toxicProbability}%</div>
                )}
              </div>
            )}
          </aside>
        </div>
      </section>

      <StackBand />
    </>
  );
}

function StackBand() {
  return (
    <section className="stack-band" id="stack">
      <div>
        <span>Architecture</span>
        <h2>Built like a real AI product.</h2>
      </div>
      <div className="stack-list">
        <span>Node.js</span>
        <span>Express</span>
        <span>React UI</span>
        <span>Vite</span>
        <span>FastAPI Models</span>
        <span>Scikit-learn</span>
        <span>NLP</span>
      </div>
    </section>
  );
}

export default App;
