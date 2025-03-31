import React, { useState } from "react";
import "./App.css";

const units = {
  temperature: {
    label: "Température",
    options: ["Celsius", "Fahrenheit", "Kelvin"],
    convert: (value, from, to) => {
      if (from === to) return value;
      let celsius = from === "Celsius" ? value : from === "Fahrenheit" ? (value - 32) * 5/9 : value - 273.15;
      return to === "Celsius" ? celsius : to === "Fahrenheit" ? celsius * 9/5 + 32 : celsius + 273.15;
    },
  },
  time: {
    label: "Temps",
    options: ["seconde", "minute", "heure", "jour"],
    convert: (value, from, to) => {
      const base = {
        "seconde": 1,
        "minute": 60,
        "heure": 3600,
        "jour": 86400,
      };
      return (value * base[from]) / base[to];
    },
  },
  volume: {
    label: "Volume",
    options: ["litre", "millilitre", "mètre cube", "pied cube", "gallon US"],
    convert: (value, from, to) => {
      const base = {
        "litre": 1,
        "millilitre": 0.001,
        "mètre cube": 1000,
        "pied cube": 28.3168,
        "gallon US": 3.78541,
      };
      return (value * base[from]) / base[to];
    },
  },
  weight: {
    label: "Poids",
    options: ["gramme", "kilogramme", "tonne", "livre", "once"],
    convert: (value, from, to) => {
      const base = {
        "gramme": 1,
        "kilogramme": 1000,
        "tonne": 1e6,
        "livre": 453.592,
        "once": 28.3495,
      };
      return (value * base[from]) / base[to];
    },
  },
  pressure: {
    label: "Pression",
    options: ["bar", "pascal", "mmHg", "cmH2O", "mmH2O", "atm"],
    convert: (value, from, to) => {
      const base = {
        "pascal": 1,
        "bar": 1e5,
        "mmHg": 133.322,
        "cmH2O": 98.0665,
        "mmH2O": 9.80665,
        "atm": 101325,
      };
      return (value * base[from]) / base[to];
    },
  },
  distance: {
    label: "Distance",
    options: ["millimètre", "centimètre", "mètre", "kilomètre", "pouce", "pied", "mile"],
    convert: (value, from, to) => {
      const base = {
        "millimètre": 0.001,
        "centimètre": 0.01,
        "mètre": 1,
        "kilomètre": 1000,
        "pouce": 0.0254,
        "pied": 0.3048,
        "mile": 1609.34,
      };
      return (value * base[from]) / base[to];
    },
  },
  angle: {
    label: "Angle",
    options: ["degré", "radian", "grade"],
    convert: (value, from, to) => {
      const base = {
        "degré": 1,
        "radian": 180 / Math.PI,
        "grade": 0.9,
      };
      return (value * base[from]) / base[to];
    },
  },
  area: {
    label: "Aire",
    options: ["m²", "km²", "hectare", "pied²"],
    convert: (value, from, to) => {
      const base = {
        "m²": 1,
        "km²": 1e6,
        "hectare": 10000,
        "pied²": 0.092903,
      };
      return (value * base[from]) / base[to];
    },
  },
  data: {
    label: "Données",
    options: ["bit", "octet", "ko", "Mo", "Go"],
    convert: (value, from, to) => {
      const base = {
        "bit": 1,
        "octet": 8,
        "ko": 8 * 1024,
        "Mo": 8 * 1024 ** 2,
        "Go": 8 * 1024 ** 3,
      };
      return (value * base[from]) / base[to];
    },
  },
  energy: {
    label: "Énergie",
    options: ["joule", "calorie", "kWh"],
    convert: (value, from, to) => {
      const base = {
        "joule": 1,
        "calorie": 4.184,
        "kWh": 3.6e6,
      };
      return (value * base[from]) / base[to];
    },
  },
  force: {
    label: "Force",
    options: ["newton", "kilogramme-force", "livre-force"],
    convert: (value, from, to) => {
      const base = {
        "newton": 1,
        "kilogramme-force": 9.80665,
        "livre-force": 4.44822,
      };
      return (value * base[from]) / base[to];
    },
  },
  fuel: {
    label: "Consommation carburant",
    options: ["L/100km", "mpg"],
    convert: (value, from, to) => {
      return from === to ? value : 235.215 / value;
    },
  },
  power: {
    label: "Puissance",
    options: ["watt", "kilowatt", "cheval vapeur"],
    convert: (value, from, to) => {
      const base = {
        "watt": 1,
        "kilowatt": 1000,
        "cheval vapeur": 735.49875,
      };
      return (value * base[from]) / base[to];
    },
  },
  speed: {
    label: "Vitesse",
    options: ["m/s", "km/h", "mph", "noeud"],
    convert: (value, from, to) => {
      const base = {
        "m/s": 1,
        "km/h": 3.6,
        "mph": 2.23694,
        "noeud": 1.94384,
      };
      return (value / base[from]) * base[to];
    },
  },
  bandwidth: {
    label: "Débit (Réseau)",
    options: ["bps", "Kbps", "Mbps", "Gbps"],
    convert: (value, from, to) => {
      const base = {
        "bps": 1,
        "Kbps": 1e3,
        "Mbps": 1e6,
        "Gbps": 1e9,
      };
      return (value * base[from]) / base[to];
    },
  },
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [category, setCategory] = useState("temperature");
  const [from, setFrom] = useState(units["temperature"].options[0]);
  const [to, setTo] = useState(units["temperature"].options[1]);
  const [value, setValue] = useState(0);
  const [result, setResult] = useState(0);

  const handleConvert = () => {
    const converted = units[category].convert(parseFloat(value), from, to);
    setResult(converted);
  };

  const currentUnit = units[category];

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <header className="header">
          <h1>Convertisseur d'unités</h1>
          <label className="switch" title="Activer le mode sombre">
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            <span className="slider round"></span>
          </label>
        </header>

        <div className="card">
          <label>Catégorie</label>
          <select value={category} onChange={(e) => {
            setCategory(e.target.value);
            setFrom(units[e.target.value].options[0]);
            setTo(units[e.target.value].options[1]);
          }}>
            {Object.keys(units).map((key) => (
              <option key={key} value={key}>{units[key].label}</option>
            ))}
          </select>

          <label>Valeur</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />

          <div className="form-group">
            <div>
              <label>De</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)}>
                {currentUnit.options.map((unit) => <option key={unit}>{unit}</option>)}
              </select>
            </div>
            <div>
              <label>À</label>
              <select value={to} onChange={(e) => setTo(e.target.value)}>
                {currentUnit.options.map((unit) => <option key={unit}>{unit}</option>)}
              </select>
            </div>
          </div>

          <button onClick={handleConvert}>Convertir</button>

          <div className="result">
            Résultat : {result}<br />
            {value} {from} = {result} {to}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
