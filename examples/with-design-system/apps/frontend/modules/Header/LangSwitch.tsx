import { useState } from 'react';
import { useRouter } from 'next/router';
import { SwitchCheckBox } from '@flounder/ui';

export const LangSwitch = () => {
  const router = useRouter();
  const { pathname, query, asPath, locale } = router;
  const [plVersion, setPlVersion] = useState<boolean>(locale === 'pl');

  const setLang = (checked: boolean) => {
    setPlVersion(checked);
    router.push({ pathname, query }, asPath, { locale: checked ? 'pl' : 'en' });
  };

  return (
    <SwitchCheckBox
      checked={plVersion}
      onSwitchChange={setLang}
      text={
        <div className="flex flex-col border border-gray-300 border-solid">
          <div className="bg-white w-5 h-1.5" />
          <div className="bg-red-600 w-5 h-1.5" />
        </div>
      }
    />
  );
};
