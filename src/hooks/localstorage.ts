import { useEffect, useState } from "react";

export const useLsWith = <T extends string>(
  key: string,
  defaultValue: T,
  predicate: (value: string) => value is T,
): readonly [T, (value: T) => void] => {
  const fullKey = `math.luma.dev/${key}`;

  const [value, setValue] = useState<T>(defaultValue);
  const updateValue = (newValue: T) => {
    localStorage.setItem(fullKey, newValue);
    setValue(newValue);
  };

  useEffect(() => {
    const storedValue = localStorage.getItem(fullKey);
    if (storedValue != null && predicate(storedValue)) {
      setValue(storedValue);
    }
  }, [defaultValue, fullKey, predicate]);

  return [value, updateValue];
};
