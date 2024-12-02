import Button from '@blogkit/blog-components/src/button';
import MatWithPivot from '@blogkit/blog-components/src/graphs/linear-algebra/mat-with-pivot';
import { isPivotDescending, isZerosBelowNonZeros } from '@blogkit/blog-components/src/lib/la';
import { essentialOfChildren } from '@blogkit/blog-components/src/lib/react';
import Ng from '@blogkit/blog-components/src/ng';
import Ok from '@blogkit/blog-components/src/ok';
import type { FC } from 'react';
import React, { useCallback, useMemo, useState } from 'react';

const ResetOuter: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        margin: 8px 8px;
      }
    `}</style>
  </>
);

const ResetInner: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        padding: 2px 8px;
      }
    `}</style>
  </>
);

interface Props {
  init: number[][];
  children: React.ReactNode[];
}
const IsRowEchMat: FC<Props> = ({ init, children }) => {
  const es = essentialOfChildren(children);
  const [mat, setMat] = useState(init);

  const reset = useCallback(() => {
    setMat([...init]);
  }, [init]);

  const ok0 = useMemo(() => isPivotDescending(mat), [mat]);

  const ok1 = useMemo(() => isZerosBelowNonZeros(mat), [mat]);

  return (
    <div>
      <MatWithPivot
        mat={mat}
        onInput={(y, x, v) => {
          const newMat = [...mat];
          newMat[y] = [...newMat[y]];
          newMat[y][x] = v;
          setMat(newMat);
        }}
      />
      <ResetOuter>
        <Button onClick={reset}>
          <ResetInner>リセット</ResetInner>
        </Button>
      </ResetOuter>
      <div>
        {ok0 ? <Ok /> : <Ng />}
        {es[0]}
      </div>
      <div>
        {ok1 ? <Ok /> : <Ng />}
        {es[1]}
      </div>
    </div>
  );
};

export default IsRowEchMat;
