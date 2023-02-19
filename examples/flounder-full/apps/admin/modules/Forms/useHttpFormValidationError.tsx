import { useState } from 'react';
import { HttpError } from '@pankod/refine-core';

export const useHttpFormValidationError = (fieldNames: Record<string, string>) => {
  const [httpFormValidationErrors, setHttpFormValidationErrors] =
    useState<Record<string, string[] | null>>();

  const defineFieldValidationHttpError = (error: HttpError) => {
    if (error.response?.data?.message && Array.isArray(error.response.data.message)) {
      error.response.data.message.map(entry => {
        const propertyName = getTransformedPropertyName(entry.property);

        setHttpFormValidationErrors(prev =>
          propertyName
            ? {
                ...prev,
                [propertyName]: Object.keys(entry.constraints).map(key => entry.constraints[key]),
              }
            : prev,
        );
      });
    }
  };

  const resetFieldErrors = (formFieldName: string) => {
    const propertyName = getTransformedPropertyName(formFieldName);

    setHttpFormValidationErrors(prev =>
      propertyName ? { ...prev, [propertyName]: undefined } : prev,
    );
  };

  const getTransformedPropertyName = (propertyName: string) => {
    return Object.keys(fieldNames).find(key => fieldNames[key] === propertyName);
  };

  return {
    defineFieldValidationHttpError,
    resetFieldErrors,
    fieldErrors: httpFormValidationErrors,
  };
};
