
import { useEffect, useRef, useState } from "react";
import "./App.css";

const experiments = [
  {
    number: "01",
    name: "Metal & Plastic Sorting",
    icon: "⇄",
    level: "Beginner",
    description: "Follow the RFID and sensor workflow used to classify and route each product.",
    objective: "Trace product detection, RFID identification, ESP32 decisions and servo sorting.",
    inputs: ["Photoelectric Sensor", "RFID Reader", "Inductive Proximity Sensor"],
    outputs: ["Servo Motor", "Bin A: Metallic", "Bin B: Non-metallic"],
  },
  {
    number: "02",
    name: "Sensor Interfacing",
    icon: "◉",
    level: "Beginner",
    description: "Explore product detection, RFID reads and material sensor responses.",
    objective: "Understand how the ESP32 receives and combines identification signals.",
    inputs: ["Photoelectric Sensor", "RFID Reader", "Inductive Proximity Sensor"],
    outputs: ["ESP32 Decision State", "Monitoring Event"],
  },
  {
    number: "03",
    name: "Sequence Control",
    icon: "⌘",
    level: "Intermediate",
    description: "Understand the sequence from product detection to bin selection.",
    objective: "Trace detection, identification, classification and servo actuation.",
    inputs: ["Product Detected", "RFID ID", "Material Classification"],
    outputs: ["Servo Position", "Selected Bin"],
  },
  {
    number: "04",
    name: "System Monitoring",
    icon: "⌁",
    level: "Beginner",
    description: "Explore how controller and sorting-system status can be monitored.",
    objective: "Display input/output status and system information.",
    inputs: ["Input Status", "Sensor Status"],
    outputs: ["Output Status", "System State"],
  },
  {
    number: "05",
    name: "Fault Handling",
    icon: "⚠",
    level: "Intermediate",
    description: "Learn how automation systems represent faults and alarms.",
    objective: "Understand fault indication and recovery workflows.",
    inputs: ["Fault Signal", "Reset Input"],
    outputs: ["Alarm Indicator", "Fault Status"],
  },
];

const experimentCount = String(experiments.length).padStart(2, "0");

const navItems = [
  { id: "Dashboard", icon: "▦" },
  { id: "Experiments", icon: "⌘" },
  { id: "I/O Monitoring", icon: "▤" },
  { id: "Performance Analytics", icon: "⌁" },
  { id: "Data Logging", icon: "▣" },
  { id: "Settings", icon: "⚙" },
];

function Icon({ children, className = "" }) {
  return <span className={`icon ${className}`}>{children}</span>;
}

function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">SS</div>
        <div>
          <h2>SmartSort Lab</h2>
          <p>Industry 4.0 Testbed</p>
        </div>
      </div>

      <div className="side-label">WORKSPACE</div>

      <nav className="nav-menu">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${page === item.id ? "active" : ""}`}
            onClick={() => setPage(item.id)}
          >
            <Icon>{item.icon}</Icon>
            <span>{item.id}</span>
            {page === item.id && <span className="nav-arrow">›</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="profile-avatar">S</div>
        <div>
          <strong>Student Workspace</strong>
          <span>Training Mode</span>
        </div>
        <span className="profile-dot" />
      </div>
    </aside>
  );
}

function Header({ page }) {
  const descriptions = {
    Dashboard: "Overview of your material sorting testbed and workspace.",
    Experiments: "Explore sorting experiments and automation learning modules.",
    "I/O Monitoring": "Inspect the shared sensor and actuator signal map.",
    "Performance Analytics": "Review prototype analytics and sorting-cycle summaries.",
    "Data Logging": "Review demo events and export the current event log.",
    Settings: "Configure prototype preferences and review hardware connection readiness.",
  };

  return (
    <header className="topbar">
      <div className="page-heading">
        <div className="breadcrumb">
          SMARTSORT LAB <span>/</span> WORKSPACE
        </div>
        <h1>{page}</h1>
        <p>{descriptions[page]}</p>
      </div>

      <div className="header-right">
        <span className="demo-badge">
          <span className="status-dot" /> DEMO MODE
        </span>
        <div className="header-divider" />
        <div className="header-avatar">S</div>
      </div>
    </header>
  );
}

function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function StatCard({ icon, label, value, detail, tone }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon>{icon}</Icon>
      </div>
      <div className="stat-copy">
        <span className="stat-label">{label}</span>
        <strong>{value}</strong>
        <span className="stat-detail">{detail}</span>
      </div>
    </div>
  );
}

function ExperimentCard({ experiment, onOpen, compact = false }) {
  return (
    <article className={`experiment-card ${compact ? "compact" : ""}`}>
      <div className="experiment-number">{experiment.number}</div>
      <div className="experiment-icon">{experiment.icon}</div>

      <div className="experiment-copy">
        <h3>{experiment.name}</h3>
        <p>{experiment.description}</p>
        {!compact && (
          <div className="objective-line">
            <span>OBJECTIVE</span> {experiment.objective}
          </div>
        )}
      </div>

      <div className="experiment-actions">
        <span className={`level-badge ${experiment.level.toLowerCase()}`}>
          {experiment.level}
        </span>
        <button
          className="button button-primary button-small"
          onClick={onOpen}
        >
          View details <span>↗</span>
        </button>
      </div>
    </article>
  );
}

function Dashboard({ onOpenExperiment, setPage }) {
  return (
    <>
      <section className="welcome-banner">
        <div className="welcome-content">
          <span className="eyebrow">YOUR AUTOMATION WORKSPACE</span>
          <h2>Detect. Sort. Monitor.</h2>
          <p>
            A simple dashboard for the proposed material sorting testbed.
            Use the pages below to explain experiments, signals, performance
            and demo records.
          </p>
          <button
            className="button button-light"
            onClick={() => setPage("Experiments")}
          >
            Explore experiments <span>→</span>
          </button>
        </div>

        <div className="welcome-art" aria-hidden="true">
          <div className="art-ring ring-one" />
          <div className="art-ring ring-two" />
          <div className="art-chip">SS</div>
          <div className="art-node node-one">E32</div>
          <div className="art-node node-two">IoT</div>
          <div className="art-node node-three">RFID</div>
          <div className="art-line line-one" />
          <div className="art-line line-two" />
        </div>
      </section>

      <SectionTitle
        title="System overview"
        subtitle="Simple view of the proposed sorting testbed"
      />

      <div className="stats-grid">
        <StatCard
          icon="▣"
          label="CONTROLLER STATUS"
          value="Offline"
          detail="ESP32 + PLC not connected"
          tone="blue"
        />
        <StatCard
          icon="⌘"
          label="EXPERIMENT MODULES"
          value={experimentCount}
          detail="Proposed learning modules"
          tone="purple"
        />
        <StatCard
          icon="⇄"
          label="LIVE I/O DATA"
          value="—"
          detail="No live data received"
          tone="green"
        />
        <StatCard
          icon="◷"
          label="MEASURED RESULTS"
          value="—"
          detail="Awaiting actual trials"
          tone="orange"
        />
      </div>

      <div className="dashboard-columns">
        <section className="panel experiment-panel">
          <SectionTitle
            title="Experiments & applications"
            subtitle="Explore the proposed learning modules"
            action={
              <button
                className="text-button"
                onClick={() => setPage("Experiments")}
              >
                View all <span>→</span>
              </button>
            }
          />

          <div className="experiment-list">
            {experiments.slice(0, 4).map((experiment) => (
              <ExperimentCard
                key={experiment.number}
                experiment={experiment}
                compact
                onOpen={() => onOpenExperiment(experiment)}
              />
            ))}
          </div>
        </section>

        <section className="panel controller-panel">
          <SectionTitle
            title="Controller status"
            subtitle="ESP32 and PLC readiness"
          />

          <div className="controller-card">
            <div className="controller-top">
              <div className="controller-logo plc-logo">E32</div>
              <div className="controller-name">
                <strong>ESP32 Controller</strong>
                <span>Embedded control logic</span>
              </div>
              <span className="connection-pill disconnected">Offline</span>
            </div>
            <div className="controller-bottom">
              <span>Communication</span>
              <strong>Not configured</strong>
            </div>
          </div>

          <div className="controller-card">
            <div className="controller-top">
              <div className="controller-logo plc-logo">PLC</div>
              <div className="controller-name">
                <strong>PLC Controller</strong>
                <span>Industrial control logic</span>
              </div>
              <span className="connection-pill disconnected">Offline</span>
            </div>
            <div className="controller-bottom">
              <span>Communication</span>
              <strong>Not configured</strong>
            </div>
          </div>

        </section>
      </div>

      <div className="bottom-note">
        <span className="note-check">✓</span>
        <div>
          <strong>Presentation preview</strong>
          <p>
          The dashboard shows the planned system. ESP32, PLC and sensors are not connected yet.
          </p>
        </div>
        <span className="note-tag">UI PREVIEW</span>
      </div>

    </>
  );
}

function Experiments({ onOpenExperiment }) {
  return (
    <>
      <div className="page-intro-card">
        <div className="intro-icon">⌘</div>
        <div>
          <h2>Learn through practical experiments</h2>
          <p>
            Explore material sorting, sensor interfacing, sequence control,
            system monitoring and fault-handling concepts.
          </p>
        </div>
        <div className="intro-count">
          <strong>{experimentCount}</strong>
          <span>MODULES</span>
        </div>
      </div>

      <SectionTitle
        title="Available experiments"
        subtitle="Select a module to view its objectives and proposed components"
      />

      <div className="experiment-list experiment-list-large">
        {experiments.map((experiment) => (
          <ExperimentCard
            key={experiment.number}
            experiment={experiment}
            onOpen={() => onOpenExperiment(experiment)}
          />
        ))}
      </div>

      <div className="bottom-note">
        <span className="note-check">i</span>
        <div>
          <strong>Training content preview</strong>
          <p>
            These are proposed modules. Final sensor selection, experiment
            logic and I/O mapping must be verified with the hardware team.
          </p>
        </div>
      </div>

    </>
  );
}

function Comparison() {
  const [mode, setMode] = useState("overview");

  const rows = [
    ["Control platform", "Industrial programmable controller", "ESP32 microcontroller"],
    ["Programming approach", "PLC programming environment", "Embedded C/C++ or compatible framework"],
    ["I/O interfacing", "Depends on the selected PLC and modules", "Depends on board and external interface circuits"],
    ["Communication", "Depends on PLC model and configured protocol", "Depends on board, firmware and configured interface"],
    ["Experimental cost", "To be measured", "To be measured"],
    ["Response time", "To be measured", "To be measured"],
    ["Sorting accuracy", "To be measured", "To be measured"],
  ];

  return (
    <>
      <div className="comparison-hero">
        <span className="eyebrow">RESEARCH WORKSPACE</span>
        <h2>PLC vs ESP32</h2>
        <p>
          Compare PLC-based and ESP32-based control using the same
          metal and plastic sorting testbed and consistent test conditions.
        </p>
        <div className="comparison-warning">
          <span>ⓘ</span>
          Research measurements have not been collected yet.
          Results will be added after actual experiments.
        </div>
      </div>

      <div className="comparison-tabs">
        <button
          className={mode === "overview" ? "selected" : ""}
          onClick={() => setMode("overview")}
        >
          Overview
        </button>
        <button
          className={mode === "method" ? "selected" : ""}
          onClick={() => setMode("method")}
        >
          Test methodology
        </button>
      </div>

      {mode === "overview" ? (
        <section className="panel comparison-panel">
          <SectionTitle
            title="Controller comparison framework"
            subtitle="Preliminary overview — confirm against selected hardware"
          />

          <div className="controller-comparison">
            <div className="comparison-controller plc-comparison">
              <div className="big-controller-icon">PLC</div>
              <span className="comparison-kicker">INDUSTRIAL CONTROL</span>
              <h3>PLC-based system</h3>
              <p>
                A programmable logic controller for industrial automation
                and control workflows.
              </p>
              <ul>
                <li>Designed for industrial control applications</li>
                <li>Uses compatible PLC input/output modules</li>
                <li>Requires compatible programming and communication tools</li>
              </ul>
              <span className="connection-pill disconnected">Not connected</span>
            </div>

            <div className="versus-divider">
              <span>VS</span>
            </div>

            <div className="comparison-controller esp-comparison">
              <div className="big-controller-icon">E32</div>
              <span className="comparison-kicker">MICROCONTROLLER</span>
              <h3>ESP32-based system</h3>
              <p>
                A microcontroller-based approach for sensor interfacing,
                output control and configured communication.
              </p>
              <ul>
                <li>Firmware-based control logic</li>
                <li>GPIO and external interfacing as required</li>
                <li>Communication depends on board and firmware configuration</li>
              </ul>
              <span className="connection-pill disconnected">Not connected</span>
            </div>
          </div>

          <div className="table-heading">
            <div>
              <h3>Evaluation matrix</h3>
              <p>Use the same test conditions for both controllers.</p>
            </div>
            <span className="level-badge intermediate">Preliminary</span>
          </div>

          <div className="table-scroll">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>PLC-based</th>
                  <th>ESP32-based</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="panel methodology-panel">
          <SectionTitle
            title="Proposed test methodology"
            subtitle="Draft workflow for collecting comparable experimental evidence"
          />

          {[
            ["01", "Use the same testbed", "Keep the sorting mechanism, test objects and test conditions consistent."],
            ["02", "Configure each controller", "Document the PLC and ESP32 models, I/O mapping, program and communication setup."],
            ["03", "Run repeated trials", "Record cycle time, correct classifications, sorting errors and failures using the same protocol."],
            ["04", "Analyse measured results", "Calculate comparable metrics from recorded trials and document limitations."],
          ].map((step) => (
            <div className="method-step" key={step[0]}>
              <span className="method-number">{step[0]}</span>
              <div>
                <h3>{step[1]}</h3>
                <p>{step[2]}</p>
              </div>
            </div>
          ))}

          <div className="info-note">
            <span className="note-icon">i</span>
            <p>
              Confirm sensor selection, controller models, sorting categories
              and measurable parameters with the hardware team before
              finalising this protocol.
            </p>
          </div>
        </section>
      )}

      <div className="bottom-note">
        <span className="note-check">✓</span>
        <div>
          <strong>Evidence-first comparison</strong>
          <p>
            No controller is labelled as the winner. Conclusions should be
            based on measured testbed results.
          </p>
        </div>
      </div>
    </>
  );
}

function ExperimentDetails({ experiment, onBack }) {
  const [tab, setTab] = useState("Overview");
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <button className="back-button" onClick={onBack}>
        ← Back to experiments
      </button>

      <div className="detail-heading">
        <div className="detail-icon">{experiment.icon}</div>
        <div>
          <span className="eyebrow">EXPERIMENT {experiment.number}</span>
          <h2>{experiment.name}</h2>
          <p>{experiment.description}</p>
        </div>
        <span className={`level-badge ${experiment.level.toLowerCase()}`}>
          {experiment.level}
        </span>
      </div>

      <div className="detail-tabs">
        {["Overview", "I/O Requirements", "Learning Outcomes"].map((item) => (
          <button
            key={item}
            className={tab === item ? "selected" : ""}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="panel detail-panel">
        {tab === "Overview" && (
          <>
            <h3>Objective</h3>
            <p>{experiment.objective}</p>
            <h3>Experiment summary</h3>
            <p>
              This module is a starting point for understanding the control
              sequence and the relationship between inputs and outputs.
            </p>
            <div className="info-note">
              <span className="note-icon">i</span>
              <p>
                Review the final wiring diagram and safety procedure before
                operating physical equipment.
              </p>
            </div>
          </>
        )}

        {tab === "I/O Requirements" && (
          <>
            <h3>Proposed inputs</h3>
            <div className="requirement-list">
              {experiment.inputs.map((name, i) => (
                <div key={name}>
                  <span className="io-address">X{i}</span>
                  <span>{name}</span>
                  <span className="connection-pill disconnected">Unmapped</span>
                </div>
              ))}
            </div>

            <h3>Proposed outputs</h3>
            <div className="requirement-list">
              {experiment.outputs.map((name, i) => (
                <div key={name}>
                  <span className="io-address">Y{i}</span>
                  <span>{name}</span>
                  <span className="connection-pill disconnected">Unmapped</span>
                </div>
              ))}
            </div>

            <p className="muted">
              Labels are illustrative placeholders, not confirmed ESP32
              GPIO pin mappings.
            </p>
          </>
        )}

        {tab === "Learning Outcomes" && (
          <>
            <h3>Learning outcomes</h3>
            <p>After completing this module, learners should be able to:</p>
            <ul className="outcome-list">
              <li>Describe the purpose of the experiment.</li>
              <li>Identify relevant input and output signals.</li>
              <li>Explain the control sequence and expected behaviour.</li>
              <li>Record observations and verify results safely.</li>
            </ul>
          </>
        )}

        <div className="detail-action-row">
          <span className="connection-pill disconnected">
            Hardware not connected
          </span>
          <button
            className="button button-primary"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "Hide demo notice" : "Preview workflow"} <span>→</span>
          </button>
        </div>

        {showPreview && (
          <div className="preview-notice">
            <strong>Workflow preview only</strong>
            <p>
              This button does not operate hardware. Live experiment execution
              requires controller communication and confirmed I/O mapping.
            </p>
          </div>
        )}
      </section>
    </>
  );
}



function SortingDemo() {
  const [running, setRunning] = useState(false);
  const [material, setMaterial] = useState("Metal");
  const [rfidStatus, setRfidStatus] = useState("Waiting");
  const [fault, setFault] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [lastResult, setLastResult] = useState("Waiting for start");
  const [sensorActive, setSensorActive] = useState(false);
  const [metalSensorActive, setMetalSensorActive] = useState(false);
  const [actuator, setActuator] = useState("Idle");
  const [events, setEvents] = useState([
    {
      time: new Date().toLocaleTimeString(),
      type: "INFO",
      message: "Demo workspace initialized. Hardware is not connected.",
    },
  ]);
  const cycleResetTimer = useRef(null);

  const addEvent = (type, message) => {
    setEvents((current) => [
      { time: new Date().toLocaleTimeString(), type, message },
      ...current,
    ].slice(0, 100));
  };

  const clearCycleReset = () => {
    if (cycleResetTimer.current !== null) {
      window.clearTimeout(cycleResetTimer.current);
      cycleResetTimer.current = null;
    }
  };

  useEffect(() => {
    if (!running || fault) return undefined;

    const timer = window.setInterval(() => {
      const isUnknown = material === "Unknown";
      const rfidRead = !isUnknown;
      setSensorActive(true);
      setRfidStatus(rfidRead ? "Read" : "Missing");
      setMetalSensorActive(!isUnknown && material === "Metal");
      const destination =
        material === "Metal"
          ? "Bin A"
          : material === "Non-metallic"
            ? "Bin B"
            : "Reject / review";
      setActuator(destination);
      setLastResult(`${material} → ${destination}`);
      setCycleCount((count) => count + 1);
      setEvents((current) => [
        {
          time: new Date().toLocaleTimeString(),
          type: "SIMULATED",
          message: `Photoelectric detection; RFID ${rfidRead ? "read" : "missing"}; ${material} routed to ${destination}.`,
        },
        ...current,
      ].slice(0, 100));

      cycleResetTimer.current = window.setTimeout(() => {
        setSensorActive(false);
        setMetalSensorActive(false);
        setRfidStatus("Waiting");
        setActuator("Idle");
      }, 900);
    }, 2200);

    return () => {
      window.clearInterval(timer);
      if (cycleResetTimer.current !== null) {
        window.clearTimeout(cycleResetTimer.current);
        cycleResetTimer.current = null;
      }
    };
  }, [running, fault, material]);

  const toggleRunning = () => {
    if (fault) {
      addEvent("WARNING", "Start blocked: clear the simulated fault first.");
      return;
    }
    const next = !running;
    setRunning(next);
    addEvent(next ? "INFO" : "INFO", next
      ? "Simulation started. No physical outputs are being driven."
      : "Simulation paused by user.");
    if (!next) {
      clearCycleReset();
      setSensorActive(false);
      setMetalSensorActive(false);
      setRfidStatus("Waiting");
      setActuator("Idle");
    }
  };

  const toggleFault = () => {
    if (!fault) {
      clearCycleReset();
      setFault(true);
      setRunning(false);
      setSensorActive(false);
      setMetalSensorActive(false);
      setRfidStatus("Waiting");
      setActuator("Fault / stopped");
      setLastResult("Fault simulated — cycle inhibited");
      addEvent("FAULT", "Simulated fault raised. Demo cycle stopped.");
    } else {
      setFault(false);
      setActuator("Idle");
      setLastResult("Fault cleared — ready");
      addEvent("INFO", "Simulated fault cleared. Press Start to resume.");
    }
  };

  const resetDemo = () => {
    clearCycleReset();
    setRunning(false);
    setFault(false);
    setCycleCount(0);
    setSensorActive(false);
    setMetalSensorActive(false);
    setRfidStatus("Waiting");
    setActuator("Idle");
    setLastResult("Demo reset");
    setEvents([
      {
        time: new Date().toLocaleTimeString(),
        type: "INFO",
        message: "Demo counters and event history reset.",
      },
    ]);
  };

  const exportCsv = () => {
    const escapeCsv = (value) => `"${String(value).replaceAll('"', '""')}"`;
    const rows = [
      ["Time", "Type", "Event"],
      ...[...events].reverse().map((event) => [
        event.time,
        event.type,
        event.message,
      ]),
    ];
    const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "smartsort-demo-events.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    addEvent("INFO", "Demo event history exported as CSV.");
  };

  return (
    <>
      <div className="comparison-hero">
        <span className="eyebrow">INTERACTIVE FRONTEND PREVIEW</span>
        <h2>Sorting cycle simulator</h2>
        <p>
          Select a sample material and run the interface simulation to preview
          the proposed sensor-to-controller-to-actuator workflow.
        </p>
        <div className="comparison-warning">
          <span>ⓘ</span>
          Simulation only. The ESP32, PLC, sensors and servo are not
          connected; these are illustrative software states, not live readings.
        </div>
      </div>

      <div className="demo-control-grid">
        <section className="panel demo-control-panel">
          <SectionTitle
            title="Cycle controls"
            subtitle="Use these controls to demonstrate the planned workflow"
          />
          <label className="demo-field-label" htmlFor="material-select">
            SAMPLE MATERIAL
          </label>
          <select
            id="material-select"
            className="demo-select"
            value={material}
            onChange={(event) => {
              setMaterial(event.target.value);
              addEvent("INFO", `Sample material changed to ${event.target.value}.`);
            }}
            disabled={running}
          >
            <option>Metal</option>
            <option>Non-metallic</option>
            <option>Unknown</option>
          </select>

          <div className="demo-button-row">
            <button
              className={`button ${running ? "button-outline" : "button-primary"}`}
              onClick={toggleRunning}
              disabled={fault}
            >
              {running ? "Ⅱ Pause simulation" : "▶ Start simulation"}
            </button>
            <button className="button button-outline" onClick={resetDemo}>
              ↺ Reset
            </button>
          </div>
          <button
            className={`button ${fault ? "button-primary" : "button-danger"} full-button`}
            onClick={toggleFault}
          >
            {fault ? "✓ Clear simulated fault" : "⚠ Simulate fault"}
          </button>
          <p className="demo-disclaimer">
            Start runs a repeating software-only cycle. It does not energize
            hardware or validate real material detection.
          </p>
        </section>

        <section className="panel demo-status-panel">
          <SectionTitle
            title="Simulated I/O status"
            subtitle="Illustrative state indicators — not live controller I/O"
          />
          <div className="demo-state-list">
            <div className="demo-state-row">
              <span className={`demo-state-light ${sensorActive ? "is-active" : ""}`} />
              <div>              <strong>Photoelectric sensor</strong><span>Simulated input · Product detected</span></div>
              <b>{sensorActive ? "ACTIVE" : "IDLE"}</b>
            </div>
            <div className="demo-state-row">
              <span className={`demo-state-light ${metalSensorActive ? "is-active" : ""}`} />
              <div>              <strong>RFID identification</strong><span>Simulated read · {rfidStatus}</span></div>
              <b>{rfidStatus === "Read" ? "READ" : "WAITING"}</b>
            </div>
            <div className="demo-state-row">
              <span className={`demo-state-light ${metalSensorActive ? "is-active" : ""}`} />
              <div><strong>Inductive sensor</strong><span>Simulated input · Metal check</span></div>
              <b>{material === "Unknown" ? "UNKNOWN" : metalSensorActive ? "METAL" : "NON-METAL"}</b>
            </div>
            <div className="demo-state-row">
              <span className={`demo-state-light ${actuator !== "Idle" && !fault ? "is-active" : ""}`} />
              <div><strong>Servo motor</strong><span>Simulated output · Sorting route</span></div>
              <b>{actuator}</b>
            </div>
            <div className="demo-state-row">
              <span className={`demo-state-light ${fault ? "is-fault" : ""}`} />
              <div><strong>System fault</strong><span>Software fault flag</span></div>
              <b>{fault ? "FAULT" : "CLEAR"}</b>
            </div>
          </div>
        </section>
      </div>

      <div className="stats-grid demo-stats-grid">
        <StatCard icon="↻" label="SIMULATED CYCLES" value={String(cycleCount)} detail="Software demo count only" tone="blue" />
        <StatCard icon="⇄" label="SELECTED MATERIAL" value={material} detail="User-selected sample" tone="purple" />
        <StatCard icon="▣" label="ACTUATOR STATE" value={fault ? "Stopped" : actuator === "Idle" ? "Idle" : "Routing"} detail={actuator} tone="green" />
        <StatCard icon="⚑" label="DEMO STATUS" value={fault ? "Fault" : running ? "Running" : "Ready"} detail="Controllers not connected" tone="orange" />
      </div>

      <section className="panel demo-result-panel">
        <SectionTitle title="Latest simulated result" subtitle="The result below is generated from the selected demo material" />
        <div className="demo-result-value">{lastResult}</div>
        <div className="info-note">
          <span className="note-icon">i</span>
          <p>Material classification here is selected by the user for demonstration. It is not an actual sensor-based identification result.</p>
        </div>
      </section>

      <section className="panel demo-events-panel">
        <SectionTitle
          title="Event history"
          subtitle={`${events.length} recent demo event${events.length === 1 ? "" : "s"} · newest first`}
          action={<button className="button button-outline button-small" onClick={exportCsv}>↓ Export CSV</button>}
        />
        <div className="table-scroll">
          <table className="comparison-table demo-events-table">
            <thead><tr><th>Time</th><th>Type</th><th>Event</th></tr></thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={`${event.time}-${index}`}>
                  <td>{event.time}</td>
                  <td><span className={`event-type ${event.type.toLowerCase()}`}>{event.type}</span></td>
                  <td>{event.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="bottom-note">
        <span className="note-check">i</span>
        <div>
          <strong>Demo mode — hardware not connected</strong>
          <p>When the ESP32 or PLC and sensors are integrated, replace these simulated states with validated controller communication and real event records.</p>
        </div>
        <span className="note-tag">SIMULATION</span>
      </div>
    </>
  );
}


function GaugeCard({ title, value, color }) {
  return <section className="panel gauge-card"><h3>{title}</h3><div className={`gauge gauge-${color}`} style={{"--gauge-value": `${value}%`}}><div className="gauge-inner"><strong>{value}%</strong><span>Demo value</span></div></div><div className="gauge-scale"><span>0</span><span>100</span></div></section>;
}

function StatusRow({ label, value, tone = "blue" }) {
  return <div className="status-row"><span>{label}</span><strong className={`status-text ${tone}`}><i />{value}</strong></div>;
}

const inputSignals = [
  ["IN1", "Photoelectric Sensor"], ["IN2", "RFID Reader"], ["IN3", "Inductive Proximity Sensor"],
];
const outputSignals = [["OUT1", "Servo Motor"], ["OUT2", "Bin A — Metallic"], ["OUT3", "Bin B — Non-metallic"]];

function IOMonitoring() {
  const [signals, setSignals] = useState({});
  const renderTable = (title, rows, prefix) => <section className="panel io-panel"><SectionTitle title={title} subtitle="Illustrative signal mapping" /><div className="table-wrap"><table className="data-table"><thead><tr><th>Address</th><th>Signal name</th><th>Demo state</th><th>Toggle</th></tr></thead><tbody>{rows.map(([address, name]) => { const key = `${prefix}-${address}`; const active = !!signals[key]; return <tr key={key}><td><strong>{address}</strong></td><td>{name}</td><td><span className={`signal-pill ${active ? "on" : "off"}`}>{active ? "ON" : "OFF"}</span></td><td><button type="button" className={`mini-toggle ${active ? "active" : ""}`} aria-label={`${active ? "Turn off" : "Turn on"} ${name}`} aria-pressed={active} onClick={() => setSignals(old => ({...old, [key]: !old[key]}))}>{active ? "Turn off" : "Turn on"}</button></td></tr>; })}</tbody></table></div></section>;
  return <><div className="page-intro-note"><strong>Simulation mode:</strong> Toggle controls change only the on-screen demo state. The same sensor and actuator map is intended to be used by both the ESP32 and PLC implementations.</div><div className="io-grid">{renderTable("Sensor inputs", inputSignals, "in")}{renderTable("Sorting outputs", outputSignals, "out")}</div><section className="panel decision-panel"><SectionTitle title="Decision logic" subtitle="Rules shown for the planned sorting workflow"/><div className="table-wrap"><table className="data-table"><thead><tr><th>RFID result</th><th>Metal detected</th><th>System response</th></tr></thead><tbody><tr><td>Valid</td><td>Yes</td><td>Route to Bin A — metallic</td></tr><tr><td>Valid</td><td>No</td><td>Route to Bin B — non-metallic</td></tr><tr><td>Invalid / missing</td><td>Either</td><td>Flag for review / reject</td></tr></tbody></table></div><p className="muted">Confirm these rules against both controller implementations before hardware commissioning.</p></section><section className="panel system-status-strip"><SectionTitle title="Connection status" subtitle="Hardware has not yet been integrated"/><div className="status-strip-grid"><StatusRow label="ESP32 connection" value="Disconnected" tone="red"/><StatusRow label="PLC connection" value="Disconnected" tone="red"/><StatusRow label="Current source" value="Local simulation" tone="blue"/></div></section></>;
}

function PerformanceAnalytics() {
  const [period, setPeriod] = useState("Prototype preview");
  return <><div className="page-intro-note"><strong>Demo analytics:</strong> Values below are illustrative placeholders for layout testing, not experimental results.</div><div className="gauge-grid analytics-gauges"><GaugeCard title="Sorting efficiency" value={84} color="blue"/><GaugeCard title="Availability" value={98} color="green"/><GaugeCard title="Classification quality" value={96} color="purple"/><GaugeCard title="Cycle completion" value={89} color="orange"/></div><section className="panel chart-panel large-chart"><div className="analytics-toolbar"><SectionTitle title="Material distribution" subtitle="Example distribution across sample cycles"/><select value={period} onChange={e => setPeriod(e.target.value)}><option>Prototype preview</option><option>Last 24 hours (demo)</option><option>All demo cycles</option></select></div><div className="distribution-bars">{[{name:"Metal",count:72,cls:"metal"},{name:"Plastic",count:56,cls:"plastic"},{name:"Unknown / reject",count:18,cls:"unknown"}].map(x=><div className="distribution-row" key={x.name}><div><span>{x.name}</span><strong>{x.count} sample units</strong></div><div className="distribution-track"><span className={x.cls} style={{width:`${x.count}%`}}/></div></div>)}</div><p className="simulation-caption">View: {period}. Replace these sample values with measured data after hardware trials.</p></section><div className="analytics-grid"><section className="panel"><SectionTitle title="Cycle summary" subtitle="Example totals"/><div className="summary-number-grid"><div><strong>146</strong><span>Classified</span></div><div><strong>18</strong><span>Unknown</span></div><div><strong>164</strong><span>Total demo cycles</span></div></div></section><section className="panel"><SectionTitle title="Interpretation note" subtitle="For your project presentation"/><p className="body-copy">Analytics components are ready for display. Efficiency, quality, downtime, and cycle counts should be calculated from logged experimental observations once the sensors and controller are connected.</p></section></div></>;
}

function DataLogging() {
  const [filter, setFilter] = useState("All events");
  const [events, setEvents] = useState([
    {time:"Demo session", experiment:"System startup", input:"ESP32 simulation", output:"Ready", result:"Info"},
    {time:"Demo session", experiment:"Metal product", input:"RFID read + metal detected", output:"Servo → Bin A", result:"Simulated"},
    {time:"Demo session", experiment:"Non-metallic product", input:"RFID read + metal not detected", output:"Servo → Bin B", result:"Simulated"},
    {time:"Demo session", experiment:"Node-RED integration", input:"Software role unverified", output:"To verify", result:"Info"},
  ]);
  const visible = filter === "All events" ? events : events.filter(e => e.result === filter);
  const exportCsv = () => { const csv = ["Time,Experiment,Input,Output,Result", ...visible.map(e => [e.time,e.experiment,e.input,e.output,e.result].map(v => `"${String(v).replaceAll('"','""')}"`).join(","))].join("\n"); const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"}); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href=url; a.download="smartsort-demo-log.csv"; a.click(); URL.revokeObjectURL(url); };
  return <><div className="page-intro-note"><strong>Prototype event log:</strong> Entries are demo examples for the ESP32 sorting workflow. Node-RED monitoring, processing and logging responsibilities remain to be verified.</div><section className="panel logging-panel"><div className="analytics-toolbar"><SectionTitle title="Event history" subtitle={`${visible.length} visible entries`}/><div className="toolbar-actions"><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All events</option><option>Info</option><option>Simulated</option></select><button className="button button-primary" onClick={exportCsv}>Export CSV ↓</button></div></div><div className="table-wrap"><table className="data-table"><thead><tr><th>Time</th><th>Experiment / event</th><th>Input state</th><th>Output decision</th><th>Result</th></tr></thead><tbody>{visible.map((e,i)=><tr key={`${e.experiment}-${i}`}><td>{e.time}</td><td>{e.experiment}</td><td>{e.input}</td><td>{e.output}</td><td><span className="signal-pill off">{e.result}</span></td></tr>)}</tbody></table></div><button className="text-button clear-log" onClick={()=>setEvents([])}>Clear demo log</button></section></>;
}

function SettingsPage() {
  const [connection, setConnection] = useState("Not configured");
  return <><div className="page-intro-note"><strong>Configuration preview:</strong> Saving these options does not establish a physical ESP32, PLC or Node-RED connection.</div><section className="panel settings-panel"><SectionTitle title="Controller connection" subtitle="Select the controller used for the shared sorting testbed"/><label className="field-label">Connection type<select value={connection} onChange={e=>setConnection(e.target.value)}><option>Not configured</option><option>ESP32 — USB serial</option><option>ESP32 — Wi-Fi / Node-RED</option><option>PLC — Serial / Ethernet</option><option>PLC — Modbus TCP</option></select></label><div className="settings-status-card"><span className="status-icon">!</span><div><strong>Controllers not connected</strong><p>Connect and validate the ESP32 and PLC separately before comparing sorting accuracy, timing or reliability.</p></div></div><button className="button button-primary" onClick={()=>alert(`Prototype setting selected: ${connection}. No connection was attempted.`)}>Apply demo setting</button></section><section className="panel"><SectionTitle title="Integration checklist" subtitle="Before comparing controller results"/><div className="checklist-grid">{["Confirm the same photoelectric, RFID and inductive sensor wiring for both controllers","Verify ESP32 and PLC decision logic and servo positions","Confirm metallic → Bin A and non-metallic → Bin B mapping","Run equivalent trials under the same test conditions","Record accuracy, cycle time, faults and communication results","Verify what Node-RED monitors, processes or logs"].map(item=><div className="checklist-item" key={item}><span>✓</span>{item}</div>)}</div></section></>;
}

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  const openExperiment = (experiment) => {
    setSelectedExperiment(experiment);
  };

  const changePage = (nextPage) => {
    setSelectedExperiment(null);
    setPage(nextPage);
  };

  return (
    <div className="app-shell">
      <Sidebar
        page={selectedExperiment ? "Experiments" : page}
        setPage={changePage}
      />

      <main className="main-area">
        <Header page={selectedExperiment ? "Experiments" : page} />

        <div className="page-content">
          {selectedExperiment ? (
            <ExperimentDetails
              key={selectedExperiment.number}
              experiment={selectedExperiment}
              onBack={() => setSelectedExperiment(null)}
            />
          ) : page === "Dashboard" ? (
            <Dashboard
              onOpenExperiment={openExperiment}
              setPage={changePage}
            />
          ) : page === "Experiments" ? (
            <Experiments onOpenExperiment={openExperiment} />
          ) : page === "Live Sorting Demo" ? (
            <SortingDemo />
          ) : page === "I/O Monitoring" ? (
            <IOMonitoring />
          ) : page === "Performance Analytics" ? (
            <PerformanceAnalytics />
          ) : page === "Data Logging" ? (
            <DataLogging />
          ) : page === "Controller Comparison" ? (
            <Comparison />
          ) : page === "Settings" ? (
            <SettingsPage />
          ) : (
            <Dashboard onOpenExperiment={openExperiment} setPage={changePage} />
          )}

          <footer className="app-footer">
            <span>© 2026 SmartSort Lab</span>
            <span>Industry 4.0 Training & Automation Testbed</span>
            <span className="footer-status">
              <span className="status-dot" /> Prototype UI
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}
