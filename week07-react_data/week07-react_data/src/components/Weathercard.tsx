import { useFetch } from "../hooks/useFetch";
import { fetchWeather } from "../api";
import { LoadingBox, ErrorBox } from "./StateBox";

function WeatherCard() {
  const {
    state,
    retry,
  } = useFetch(fetchWeather);

  if (state.status === "loading") {
    return <LoadingBox text="Loading weather…" />;
  }

  if (state.status === "error") {
    return (
      <ErrorBox
        message={state.error}
        onRetry={retry}
      />
    );
  }

  return (
    <article className="rounded-[18px] border border-[#e5e9f2] bg-white p-5">
      <p className="m-0 text-xs font-bold text-[#6c7485]">
        RĪGA NOW
      </p>

      <p className="mb-0 mt-4 text-3xl font-extrabold">
        {state.data.temperature}°C
      </p>

      <p className="mb-0 mt-2 text-sm text-[#6c7485]">
        Wind: {state.data.windSpeed} km/h
      </p>

      <p className="mb-0 mt-1 text-xs text-[#6c7485]">
        Updated: {state.data.time}
      </p>
    </article>
  );
}

export default WeatherCard;
