import { useEffect, useState } from "react";
import { getHealth } from "./services/api";

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getHealth().then(setData);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>MoodWave 🎧</h1>

      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App; 