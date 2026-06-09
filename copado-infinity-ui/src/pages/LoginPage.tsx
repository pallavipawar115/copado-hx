import { useEffect, useState } from "react";

type Session = {
  loggedIn: boolean;
  user: string;
  environment: string;
  lastAction: string;
  lastUpdated: string;

  currentStory?: string;
  currentStoryTitle?: string;
  currentStoryStatus?: string;
};


type Validation = {
  status: string;
  coverage: number;
  testsPassed: number;
  risk: string;
};

export default function LoginPage() {
  const [session, setSession] =
    useState<Session | null>(null);

 const [validation, setValidation] =
  useState<Validation | null>(null);

  useEffect(() => {
  const timer = setInterval(async () => {
    try {

      // Session Data
      const res = await fetch(
        "http://localhost:3000/session"
      );

      const data =
        await res.json();

      setSession(data);

      // Validation Data
      const validationRes =
        await fetch(
          "http://localhost:3000/validation"
        );

      const validationData =
        await validationRes.json();

      setValidation(
        validationData
      );

    } catch (err) {
      console.error(err);
    }
  }, 1000);

  return () =>
    clearInterval(timer);

}, []);

  if (!session) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "30px",
        fontFamily: "Segoe UI"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto"
        }}
      >
        {/* HEADER */}

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.08)"
          }}
        >
          <h1>
            🚀 CopadoInfinity
          </h1>

          <h3>
            Smart Headless Autopilot Beyond The Browser
          </h3>
        </div>

        {/* KPI CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4,1fr)",
            gap: "20px",
            marginTop: "20px"
          }}
        >
          {[
            ["Stories", "3"],
            ["Deployments", "8"],
            ["Success Rate", "98%"],
            ["Pipelines", "2"]
          ].map((card) => (
            <div
              key={card[0]}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "16px",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.08)"
              }}
            >
              <h3>{card[0]}</h3>

              <h1>{card[1]}</h1>
            </div>
          ))}
        </div>

        {/* USER INFO */}

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            marginTop: "20px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)"
          }}
        >
          <h2>
  {session.loggedIn
    ? "🟢 Connected"
    : "🔴 Disconnected"}
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    marginTop: "20px"
  }}
>
  <div>
    <h3>👤 User</h3>
    <p>{session.user}</p>
  </div>

  <div>
    <h3>🌍 Environment</h3>
    <p>{session.environment}</p>
  </div>

  <div>
    <h3>🔑 Status</h3>
    <p>
      {session.loggedIn
        ? "Authenticated"
        : "Logged Out"}
    </p>
  </div>
</div>

</div>

          {/* STORY + VALIDATION + AI PANEL */}

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    marginTop: "20px"
  }}
>

  {/* CURRENT STORY */}

  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "16px",
      boxShadow:
        "0 2px 10px rgba(0,0,0,0.08)"
    }}
  >
    <h2>📋 Current User Story</h2>

    <h1
      style={{
        color: "#0176d3"
      }}
    >
      {session.currentStory || "No Story"}
    </h1>

    <h3>
      {session.currentStoryTitle || "-"}
    </h3>

    <span
      style={{
        background: "#d8f3dc",
        padding: "8px 16px",
        borderRadius: "20px",
        fontWeight: "bold"
      }}
    >
      {session.currentStoryStatus || "N/A"}
    </span>
  </div>

  {/* VALIDATION */}

  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "16px",
      boxShadow:
        "0 2px 10px rgba(0,0,0,0.08)"
    }}
  >
    <h2>🔍 Validation</h2>

    <h2
      style={{
        color:
          validation?.status?.includes("Failed")
            ? "#dc2626"
            : validation?.status?.includes("Running")
            ? "#f59e0b"
            : "#16a34a"
      }}
    >
      {validation?.status}
    </h2>

    <p>
      Coverage:
      <b> {validation?.coverage}%</b>
    </p>

    <p>
      Tests Passed:
      <b> {validation?.testsPassed}</b>
    </p>

    <p>
      Risk:
      <b> {validation?.risk}</b>
    </p>
  </div>

  {/* AI PANEL */}

  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "16px",
      boxShadow:
        "0 2px 10px rgba(0,0,0,0.08)"
    }}
  >
    <h2>🤖 AI Release Engineer</h2>

    <p>
      Risk Analysis:
      <b> {validation?.risk}</b>
    </p>

    <p>
      Apex Coverage:
      <b> {validation?.coverage}%</b>
    </p>

    <div
      style={{
        background:
          validation?.risk === "LOW"
            ? "#d8f3dc"
            : "#ffd6d6",
        padding: "12px",
        borderRadius: "10px",
        marginTop: "10px",
        fontWeight: "bold"
      }}
    >
      {
        validation?.risk === "LOW"
          ? "✅ Safe To Deploy"
          : "❌ Deployment Risk Detected"
      }
    </div>
  </div>

</div>



        {/* PIPELINE */}

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            marginTop: "20px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)"
          }}
        >
          <h2>
            🚀 Release Pipeline
          </h2>

          <h3>
            ✅ Development
          </h3>

          <h3>
            ✅ Validation
          </h3>

          <h3>
            🔄 Testing
          </h3>

          <h3>
            ⏳ UAT
          </h3>

          <h3>
            ⏳ Production
          </h3>
        </div>

        {/* ACTIVITY */}

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            marginTop: "20px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)"
          }}
        >
          <h2>
            📜 Activity Feed
          </h2>

          <p>
            {session.lastAction}
          </p>

          <small>
            {session.lastUpdated}
          </small>
        </div>
      </div>
    </div>
  );
}
