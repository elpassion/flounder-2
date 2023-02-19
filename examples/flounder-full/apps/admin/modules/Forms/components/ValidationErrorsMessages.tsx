export const ValidationErrorsMessages = ({
  errorsArray,
  formFieldName,
}: {
  errorsArray: string[] | undefined;
  formFieldName: string;
}) => {
  if (!errorsArray || !errorsArray.length) return null;

  return (
    <ul style={{ paddingLeft: 20, marginTop: -25 }}>
      {errorsArray.map(fieldErrorEntry => (
        <li key={`{${formFieldName}-${fieldErrorEntry}}`} style={{ color: '#fa541c' }}>
          <small>{fieldErrorEntry}</small>
        </li>
      ))}
    </ul>
  );
};
