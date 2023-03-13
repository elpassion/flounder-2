import { Button } from '@flounder/ui';

export const Submit = ({ text, fullWidth }: { text?: string; fullWidth?: boolean }) => {
  return (
    <Button type="submit" variant="secondary" fullWidth={fullWidth}>
      {text || 'Submit'}
    </Button>
  );
};
