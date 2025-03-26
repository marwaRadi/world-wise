import { useState } from "react";

function useFormatDate() {
  const [date, setDate] = useState(new Date());
  const formatDate = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
  return [formatDate, setDate];
}

export { useFormatDate };
