import { useCallback, useState } from "react";

export function useForm(initialValue = {}) {
  const [payload, setPayload] = useState(initialValue);

  const handleInput = useCallback((e) => {
    setPayload((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  return { payload, handleInput, setPayload };
}
