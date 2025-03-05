import { useState } from "react";

export const useSavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState<string[]>([]);

  const saveProperty = async (propertyId: string) => {
    setSavedProperties((prev) => [...prev, propertyId]);
    return Promise.resolve();
  };

  const unsaveProperty = async (propertyId: string) => {
    setSavedProperties((prev) => prev.filter((id) => id !== propertyId));
    return Promise.resolve();
  };

  const isSaved = (propertyId: string) => {
    return savedProperties.includes(propertyId);
  };

  return {
    savedProperties,
    saveProperty,
    unsaveProperty,
    isSaved,
  };
};

export default useSavedProperties;
