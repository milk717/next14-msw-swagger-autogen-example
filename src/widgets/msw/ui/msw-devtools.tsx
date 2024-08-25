import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import { changeMswStatusCode, getMswStatusCode } from '@/widgets/msw/model/msw-options-store';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { useEffect, useState } from 'react';

const MswDevtools: React.FC<TMswDevtoolsProps> = ({ enabled }) => {
  const [statusCode, setStatusCode] = useState<string>(getMswStatusCode());

  useEffect(() => {
    const storedStatusCode = getMswStatusCode();

    if (storedStatusCode !== statusCode) {
      setStatusCode(storedStatusCode);
    }
  }, [statusCode]);

  const handleStatusCodeChange = (newStatusCode: string) => {
    changeMswStatusCode(newStatusCode);
    setStatusCode(newStatusCode);
  };

  if (!enabled) return null;

  return (
    <Popover placement="top" offset={10}>
      <PopoverTrigger className="absolute left-4 top-4">
        <Button isIconOnly variant="shadow" aria-label="Like">
          🔧
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">MSW Devtool</div>
          <div className="text-tiny mb-2">Select msw handler response code</div>
          <RadioGroup
            label={`Current statusCode: ${statusCode}`}
            onValueChange={handleStatusCodeChange}
          >
            <Radio value="200">200</Radio>
            <Radio value="400">400</Radio>
            <Radio value="404">404</Radio>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { MswDevtools };

type TMswDevtoolsProps = {
  enabled?: boolean;
};
