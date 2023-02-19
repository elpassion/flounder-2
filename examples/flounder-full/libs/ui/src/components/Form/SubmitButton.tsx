import { Button } from '../Button';

export function SubmitButton({ text }: { text?: string }) {
  return (
    <Button type="submit" variant="secondary">
      {text || 'Submit'}
    </Button>
  );
}
