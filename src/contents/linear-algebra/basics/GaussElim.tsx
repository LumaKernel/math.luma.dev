"use client";
import type { FlippedProps } from "flip-toolkit/lib/types";
import React, { useCallback, useMemo, useState } from "react";
import { Flipper, Flipped, spring } from "react-flip-toolkit";
import type { NumberRational } from "@/lib/math-algebra/rational";
import { numberToRational, numberRational } from "@/lib/math-algebra/rational";
import type { FieldProtocol } from "@/lib/math-algebra/field";
import { fieldUtil } from "@/lib/math-algebra/field";
import type { Matrix } from "@/lib/math-algebra/linear-algebra";
import { matSet, matRow, matMap } from "@/lib/math-algebra/linear-algebra";
import { gcdNumber, matShape, range } from "@/lib/number";
import MatViewer from "./MatViewer";
import MatElemInput from "./MatElemInput";
import { cssColors } from "@/lib/colors";
import MatIndexIndicator from "./MatIndexIndicator";

const OuterWrapper = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        margin-bottom: 2rem;
      }
    `}</style>
  </>
);

const Wrapper = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        padding-left: 3rem;
        padding-top: 3rem;
      }
    `}</style>
  </>
);

const InlineBlock = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        display: inline-block;
        white-space: nowrap;
      }
    `}</style>
  </>
);

const ElemWrapperOuter = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        position: relative;
        min-width: 11rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </>
);

const ElemWrapperInner = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        position: relative;
      }
    `}</style>
  </>
);

const Copied = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        position: absolute;
        top: 0;
        left: 0;
      }
    `}</style>
  </>
);

const Message = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        font-size: 0.9em;
      }
    `}</style>
  </>
);

const MatTop = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        font-size: 0.94em;
        width: 100%;
        height: 3rem;
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(-100%);
        display: flex;
        gap: 3px;
        flex-flow: column;
        align-items: center;
        justify-content: flex-end;
      }
    `}</style>
  </>
);

const MatLeft = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        width: 3rem;
        display: flex;
        gap: 3px;
        font-size: 0.8em;
        position: absolute;
        top: 0;
        left: -10px;
        transform: translateX(-100%);
        justify-content: flex-end;
      }
    `}</style>
  </>
);

const IndexNumber = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        border-color: ${cssColors.text};
        border-width: 0.4px;
        border-style: solid;
        font-size: 0.88em;
        border-radius: 1.2em;
        width: 1.2em;
        height: 1.2em;
      }
    `}</style>
  </>
);

const F = (props: FlippedProps) => (
  <Flipped
    onAppear={onElementAppear}
    key={props.flipId}
    onExit={onExit}
    {...props}
  />
);

export type ElemWrapperProps = {
  y: number;
  x: number;
  copied?: boolean;
  children: React.ReactNode;
  i?: number;
  j?: number;
  k?: number;
};
const ElemWrapper = ({ y, x, copied, children, i, j, k }: ElemWrapperProps) => {
  return (
    <ElemWrapperOuter>
      {x === 0 && (
        <MatLeft>
          {y === k && (
            <F flipId="ind(k)">
              <InlineBlock>
                <MatIndexIndicator
                  vertical={false}
                  fgColor={cssColors.revertedText}
                  bgColor={cssColors.em1}
                >
                  k
                </MatIndexIndicator>
              </InlineBlock>
            </F>
          )}
          {y === i && (
            <F flipId="ind(i)">
              <InlineBlock>
                <MatIndexIndicator
                  vertical={false}
                  fgColor={cssColors.revertedText}
                  bgColor={cssColors.em3}
                >
                  i
                </MatIndexIndicator>
              </InlineBlock>
            </F>
          )}
          <InlineBlock>
            <IndexNumber>{y + 1}</IndexNumber>
          </InlineBlock>
        </MatLeft>
      )}
      {y === 0 && (
        <MatTop>
          {x === j && (
            <F flipId="ind(j)">
              <div>
                <MatIndexIndicator
                  vertical={false}
                  fgColor={cssColors.revertedText}
                  bgColor={cssColors.em2}
                >
                  j
                </MatIndexIndicator>
              </div>
            </F>
          )}
          <div>
            <IndexNumber>{x + 1}</IndexNumber>
          </div>
        </MatTop>
      )}
      {copied ? <ElemWrapperInner>{children}</ElemWrapperInner> : children}
    </ElemWrapperOuter>
  );
};

const appearScaleEasing = (t: number): number => {
  const k = 4;
  return t + 0.25 * k - k * (t - 0.5) * (t - 0.5);
};

const appearMoveEasing = (t: number): number => {
  const k = 30;
  return 0.25 * k - k * (t - 0.5) * (t - 0.5);
};

const onElementAppear: FlippedProps["onAppear"] = (el, index) =>
  spring({
    onUpdate: (val) => {
      const t = val as number;
      el.style.opacity = t.toString();
      const s = appearScaleEasing(t);
      const m = appearMoveEasing(t);
      const theta = index * 2;
      el.style.transform = `scale(${s},${s}) translate(${m * Math.cos(theta)}px,${m * Math.sin(theta)}px)`;
    },
    delay: index * 50,
  });

const onExit: FlippedProps["onExit"] = (el, index, removeElement) => {
  spring({
    config: { overshootClamping: true },
    onUpdate: (val) => {
      el.style.opacity = (1 - (val as number)).toString();
    },
    delay: index * 50,
    onComplete: removeElement,
  });

  return () => {
    el.style.opacity = "";
    removeElement();
  };
};

const numRat = numberRational();

type Color = string;
type NumMat = Matrix<number>;
type NumRatMat = Matrix<NumberRational>;
type RenderElem<T> = (t: T, color: Color) => React.ReactElement;

export interface ElementaryMatrixProtocol<T> {
  i: number;
  j?: number;
  lambda?: T;
}

export const renderElementaryMatrix: <T>(
  p: ElementaryMatrixProtocol<T>,
  renderElem: RenderElem<T>
) => React.ReactNode = (p, renderElem) => {
  return (
    <InlineBlock>
      P<sub>{p.i + 1}</sub>
      {p.j != null && <sub>, {p.j + 1}</sub>}
      {p.lambda != null && <>({renderElem(p.lambda, cssColors.text)})</>}
    </InlineBlock>
  );
};

function* gaussElimIllust<T>(
  mat: Matrix<T>,
  field: FieldProtocol<T, T>,
  renderElem: RenderElem<T>
) {
  const key = (() => {
    let tmp = 0;
    return () => {
      tmp += 1;
      return tmp;
    };
  })();
  const ps: ElementaryMatrixProtocol<T>[] = [];
  let matKeys: Matrix<number> = mat.map((row) => row.map(() => key()));
  const flippedMatElem = (
    y: number,
    x: number,
    nextMatKeys: Matrix<number> | null = null
  ) => `(${(nextMatKeys ?? matKeys)[y][x]})`;
  const flippedWith = (prefix: string, y: number, x: number) =>
    `${prefix}(${y},${x},${matKeys[y][x]})`;
  const flippedEq = (y: number, x: number) => flippedWith("eq", y, x);
  const [n, m] = matShape(mat);

  const ShowPs = () => {
    return (
      <div>
        {ps.reverse().map((p) => renderElementaryMatrix(p, renderElem))}
      </div>
    );
  };

  const basic = (text: string, i?: number, j?: number, k?: number) =>
    ((mat) => (
      <>
        <MatViewer
          n={n}
          m={m}
          flipIdPrefix="mat"
          createElem={(y, x) => (
            <ElemWrapper y={y} x={x} i={i} j={j} k={k}>
              <F flipId={flippedMatElem(y, x)}>
                {renderElem(mat[y][x], cssColors.text)}
              </F>
            </ElemWrapper>
          )}
        />
        <Message>{text}</Message>
        <ShowPs />
      </>
    ))(mat);

  yield basic("初期状態");

  const columnPivotExists = range(m).map(() => false);
  const pivotIndices: [number, number][] = [];
  {
    let i = 0;
    let j = 0;
    const what0 = "前進消去: ";
    // O(min{n, m})
    for (; i < n && j < m; j += 1) {
      yield basic(
        `${what0}${i === 0 ? "i := 1, j := 1 で初期化" : "j := j + 1 に更新"}`,
        i,
        j
      );
      {
        let k = i;
        // O(n)
        {
          const what1 = "mat[k, i] ≠ 0 となるピボット候補を探索中。";
          for (; k < n; k += 1) {
            yield basic(
              k === i
                ? `${what0}${what1}k := i で k を初期化`
                : `${what0}${what1}k := k + 1 に更新`,
              i,
              j,
              k
            );
            if (fieldUtil(field).IsZero(mat[k][j])) {
              const what2 = "0 なので該当せず。";
              yield basic(`${what0}${what1}${what2}`, i, j, k);
            } else {
              if (i === k) {
                yield basic(`${what0}${what1}見つかりました。`, i, j, k);
              } else {
                yield basic(
                  `${what0}${what1}見つかりました。i ≠ k なので入れ替えます。`,
                  i,
                  j,
                  k
                );
                // 入れ替えが必要 (swap(mat[i], mat[k]))
                const newMatKeys = matMap(matKeys, (y, x, v) => {
                  if (y === i || y === k) {
                    return matKeys[i + k - y][x];
                  }
                  return v;
                });
                // P_{i, k}
                ps.push({ i, j: k });
                mat = matMap(mat, (y, x, v) => {
                  if (y === i || y === k) {
                    return mat[i + k - y][x];
                  }
                  return v;
                });
                matKeys = newMatKeys;
                yield basic(`${what0}${what1}入れ替えました。`, i, j);
              }
              break;
            }
          }
          if (k === n) {
            const what2 =
              "最後の行に到達。見つかりませんでした。次の列を探します。 j := j + 1 を代入";
            yield basic(`${what0}${what1}${what2}`, i, j + 1);
            continue;
          }
        }
      }
      const e = mat[i][j];
      pivotIndices.push([i, j]);
      columnPivotExists[j] = true;

      {
        const what1 = "対象の主成分を 1 にします。";
        if (fieldUtil(field).IsOne(e)) {
          const what2 = "すでに mat[i, j] ＝ 1 なので完了";
          yield basic(`${what0}${what1}${what2}`, i, j);
        } else {
          const pivotInv = field.MultInverse(e);
          yield (
            <>
              <MatViewer
                n={n}
                m={m}
                flipIdPrefix="mat"
                createElem={(y, x) => {
                  return (
                    <ElemWrapper y={y} x={x} i={i} j={j} copied>
                      {y === i &&
                        j === x &&
                        range(j, m).map((jj) => (
                          <F key={jj} flipId={flippedWith("p", y, jj)}>
                            <Copied>
                              {renderElem(mat[i][x], cssColors.em1)}
                            </Copied>
                          </F>
                        ))}
                      <F flipId={flippedMatElem(y, x)}>
                        {renderElem(mat[y][x], cssColors.text)}
                      </F>
                    </ElemWrapper>
                  );
                }}
              />
              <Message>{`${what0}${what1}`}</Message>
              <ShowPs />
            </>
          );

          const newMatKeys = matMap(matKeys, (y, x, v) => {
            if (y === i && j <= x) {
              return key();
            }
            return v;
          });
          for (const showAns of [false, true])
            yield (
              <>
                <MatViewer
                  n={n}
                  m={m}
                  flipIdPrefix="mat"
                  createElem={(y, x) => {
                    return (
                      <ElemWrapper y={y} x={x} i={i} j={j}>
                        <F flipId={flippedMatElem(y, x)}>
                          {renderElem(mat[y][x], cssColors.text)}
                        </F>
                        {y === i && j <= x && (
                          <>
                            <F flipId={flippedWith("p", y, x)}>
                              <InlineBlock>
                                ✕{renderElem(pivotInv, cssColors.em1)}
                              </InlineBlock>
                            </F>
                            {showAns && (
                              <>
                                <F flipId={flippedEq(y, x)}>
                                  <InlineBlock>＝</InlineBlock>
                                </F>
                                <F flipId={flippedMatElem(y, x, newMatKeys)}>
                                  {renderElem(
                                    field.Mult(mat[y][x], pivotInv),
                                    cssColors.text
                                  )}
                                </F>
                              </>
                            )}
                          </>
                        )}
                      </ElemWrapper>
                    );
                  }}
                />
                <Message>{`${what0}${what1}`}</Message>
                <ShowPs />
              </>
            );

          // O(m)
          // P_{i}(pivotInv)
          ps.push({ i, lambda: pivotInv });
          mat = matMap(mat, (y, x, v) => {
            if (y === i && j <= x) {
              return field.Mult(v, pivotInv);
            }
            return v;
          });
          matKeys = newMatKeys;
          yield basic(`${what0}${what1}完了`, i, j);
        }
      }

      const inverses = matRow(mat, i).map((e) => field.AddInverse(e));

      const what1 = "i 行目より下の行を消去していきます。";
      // O(n)
      for (const k of range(i + 1, n)) {
        yield basic(
          `${what0}${what1}${k === i + 1 ? "k := i + 1 で初期化" : "k := k + 1 に更新"}`,
          i,
          j,
          k
        );

        if (fieldUtil(field).IsZero(mat[k][j])) {
          const what2 = "mat[k, j] ＝ 0 なのですでに完了";
          yield basic(`${what0}${what1}${what2}`, i, j, k);
        } else {
          const what2 = "k 行目の mat[k, j] ≠ 0 を消去します。";
          yield (
            <>
              <MatViewer
                n={n}
                m={m}
                flipIdPrefix="mat"
                createElem={(y, x) => {
                  return (
                    <ElemWrapper y={y} x={x} i={i} j={j} k={k} copied>
                      {y === i && j <= x && (
                        <F flipId={flippedWith("m", k, x)}>
                          <Copied>
                            {renderElem(mat[y][x], cssColors.em2)}
                          </Copied>
                        </F>
                      )}
                      {y === k &&
                        x === j &&
                        range(j, m).map((jj) => (
                          <F key={jj} flipId={flippedWith("a", k, jj)}>
                            <Copied>
                              {renderElem(mat[y][x], cssColors.em1)}
                            </Copied>
                          </F>
                        ))}
                      <F flipId={flippedMatElem(y, x)}>
                        {renderElem(mat[y][x], cssColors.text)}
                      </F>
                    </ElemWrapper>
                  );
                }}
              />
              <Message>{`${what0}${what1}${what2}`}</Message>
              <ShowPs />
            </>
          );

          const newMatKeys = matMap(matKeys, (y, x, v) => {
            if (y === k && j <= x) {
              return key();
            }
            return v;
          });

          for (const showAns of [false, true])
            yield (
              <>
                <MatViewer
                  n={n}
                  m={m}
                  flipIdPrefix="mat"
                  createElem={(y, x) => {
                    return (
                      <ElemWrapper y={y} x={x} i={i} j={j} k={k}>
                        <F flipId={flippedMatElem(y, x)}>
                          {renderElem(mat[y][x], cssColors.text)}
                        </F>
                        {y === k && j <= x && (
                          <>
                            <F flipId={flippedWith("a", y, x)}>
                              <InlineBlock>
                                ＋
                                {renderElem(
                                  field.AddInverse(mat[y][j]),
                                  cssColors.em1
                                )}
                                ×
                              </InlineBlock>
                            </F>
                            <F flipId={flippedWith("m", y, x)}>
                              <InlineBlock>
                                {renderElem(mat[i][x], cssColors.em2)}
                              </InlineBlock>
                            </F>
                            {showAns && (
                              <F flipId={flippedMatElem(y, x, newMatKeys)}>
                                <InlineBlock>
                                  ＝
                                  {renderElem(
                                    field.Add(
                                      mat[y][x],
                                      field.Mult(mat[y][j], inverses[x])
                                    ),
                                    cssColors.text
                                  )}
                                </InlineBlock>
                              </F>
                            )}
                          </>
                        )}
                      </ElemWrapper>
                    );
                  }}
                />
                <Message>{`${what0}${what1}${what2}`}</Message>
                <ShowPs />
              </>
            );

          // O(m)
          // P_{k, i}(-mat[k][j])
          ps.push({ i: k, j: i, lambda: field.AddInverse(mat[k][j]) });
          mat = matMap(mat, (y, x, v) => {
            if (y === k && j <= x) {
              return field.Add(v, field.Mult(mat[y][j], inverses[x]));
            }
            return v;
          });
          matKeys = newMatKeys;

          yield basic(`${what0}${what1}${what2}完了`, i, j, k);
        }
      }

      i += 1;
    }

    yield basic(`${what0}最後の列に到達しました。前進消去は完了。`, i, j);
  }

  {
    const what0 = "後退代入: ";
    yield basic(
      `${what0}後退代入を開始します。すべてのピボットを見ていきます。`
    );
    // O(min{n, m})
    for (const [i, j] of pivotIndices.reverse()) {
      const what1 = "mat[i, j] のピボットに注目: ";
      yield basic(`${what0}${what1}`, i, j);
      const inverses = matRow(mat, i).map((e) => field.AddInverse(e));

      // O(min{n, m})
      for (const k of range(i)) {
        yield basic(
          `${what0}${what1}${k === 0 ? "k := 0 で初期化" : "k := k + 1 を代入"}`,
          i,
          j,
          k
        );
        if (fieldUtil(field).IsZero(mat[k][j])) {
          const what2 = "すでに mat[k, j] ＝ 0 なので次へ。";
          yield basic(`${what0}${what1}${what2}`, i, j, k);
        } else {
          const what2 = "mat[k, j] ≠ 0 なので k 行目を削除";
          yield (
            <>
              <MatViewer
                n={n}
                m={m}
                flipIdPrefix="mat"
                createElem={(y, x) => {
                  return (
                    <ElemWrapper y={y} x={x} i={i} j={j} k={k} copied>
                      {y === i &&
                        j <= x &&
                        (j === x || !columnPivotExists[x]) && (
                          <F flipId={flippedWith("m", k, x)}>
                            <Copied>
                              {renderElem(mat[y][x], cssColors.em2)}
                            </Copied>
                          </F>
                        )}
                      {y === k &&
                        x === j &&
                        (j === x || !columnPivotExists[x]) &&
                        range(j, m).map((jj) => (
                          <F key={jj} flipId={flippedWith("a", k, jj)}>
                            <Copied>
                              {renderElem(mat[y][x], cssColors.em1)}
                            </Copied>
                          </F>
                        ))}
                      <F flipId={flippedMatElem(y, x)}>
                        {renderElem(mat[y][x], cssColors.text)}
                      </F>
                    </ElemWrapper>
                  );
                }}
              />
              <Message>{`${what0}${what1}${what2}`}</Message>
              <ShowPs />
            </>
          );

          const newMatKeys = matMap(matKeys, (y, x, v) => {
            if (y === k && j <= x && (j === x || !columnPivotExists[x])) {
              return key();
            }
            return v;
          });
          for (const showAns of [false, true])
            yield (
              <>
                <MatViewer
                  n={n}
                  m={m}
                  flipIdPrefix="mat"
                  createElem={(y, x) => {
                    return (
                      <ElemWrapper y={y} x={x} i={i} j={j} k={k}>
                        <F flipId={flippedMatElem(y, x)}>
                          {renderElem(mat[y][x], cssColors.text)}
                        </F>
                        {y === k &&
                          j <= x &&
                          (j === x || !columnPivotExists[x]) && (
                            <>
                              <F flipId={flippedWith("a", y, x)}>
                                <InlineBlock>
                                  ＋{renderElem(mat[y][j], cssColors.em1)}×
                                </InlineBlock>
                              </F>
                              <F flipId={flippedWith("m", y, x)}>
                                <InlineBlock>
                                  {renderElem(inverses[x], cssColors.em2)}
                                </InlineBlock>
                              </F>
                              {showAns && (
                                <F flipId={flippedMatElem(y, x, newMatKeys)}>
                                  <InlineBlock>
                                    ＝
                                    {renderElem(
                                      field.Add(
                                        mat[y][x],
                                        field.Mult(mat[y][j], inverses[x])
                                      ),
                                      cssColors.text
                                    )}
                                  </InlineBlock>
                                </F>
                              )}
                            </>
                          )}
                      </ElemWrapper>
                    );
                  }}
                />
                <Message>{`${what0}${what1}${what2}`}</Message>
                <ShowPs />
              </>
            );

          // O(m)
          // P_{k, i}(-mat[k][j])
          ps.push({ i: k, j: i, lambda: field.AddInverse(mat[k][j]) });
          mat = matMap(mat, (y, x, v) => {
            if (y === k && j <= x && (j === x || !columnPivotExists[x])) {
              return field.Add(v, field.Mult(mat[y][j], inverses[x]));
            }
            return v;
          });
          matKeys = newMatKeys;

          yield basic(`${what0}${what1}${what2}完了`, i, j, k);
        }
      }
      yield basic(`${what0}${what1}1行目から(i-1)行目までを探索完了。`, i, j);
    }
  }
  yield basic("完了");
}

export const signNumber = (x: number) => {
  if (x < 0) return -1;
  if (x > 0) return 1;
  return 0;
};

export const signNumberRational = ({ numer, denom }: NumberRational) => {
  return signNumber(numer) * signNumber(denom);
};

export const normalize = (e: NumberRational): NumberRational => {
  const g = gcdNumber(Math.abs(e.numer), Math.abs(e.denom));
  const sign = signNumberRational(e);
  return {
    numer: sign * Math.round(Math.abs(e.numer) / g),
    denom: Math.round(Math.abs(e.denom) / g),
  };
};

export const serialize = (e: NumberRational) => {
  const en = normalize(e);
  const sign = signNumberRational(e);
  if (sign < 0) return `${en.numer}/${en.denom}`;
  return `${en.numer}/${en.denom}`;
};

const renderElem: RenderElem<NumberRational> = (t, color) => {
  const tn = normalize(t);
  const sign = signNumberRational(t);
  return (
    <InlineBlock style={{ color }}>
      {(() => {
        if (tn.denom === 1) {
          return (
            <>
              {sign < 0 ? "－" : ""}
              {sign * tn.numer}
            </>
          );
        }
        return (
          <>
            {sign < 0 ? "－" : ""}
            {sign * tn.numer}/{tn.denom}
          </>
        );
      })()}
    </InlineBlock>
  );
};

export type GaussElimProps = {
  readonly init: number[][];
};
export default function GaussElim({ init }: GaussElimProps) {
  const [mat, setMat] = useState<NumMat>(init);
  const numRatMat = useMemo<NumRatMat>(
    () => mat.map((row) => row.map(numberToRational)),
    [mat]
  );
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const createGenerator: () => Generator<React.ReactElement, void, unknown> =
    useCallback(
      () => gaussElimIllust<NumberRational>(numRatMat, numRat, renderElem),
      [numRatMat]
    );
  const createHistoryPoint = useCallback(
    (step: number) => {
      if (!started) return <></>;
      const g = createGenerator();
      let last = g.next();
      let i = 0;
      while (i < step && !last.done) {
        i += 1;
        last = g.next();
      }
      const lastValue = last.value;
      if (lastValue === undefined) throw new Error("lastValue is undefined");
      return lastValue;
    },
    [started, createGenerator]
  );
  const historyLength = useMemo(() => {
    if (!started) return 0;
    return Array.from(createGenerator()).length;
  }, [started, createGenerator]);
  const prev = () => {
    setStep(step - 1);
  };
  const next = () => {
    setStep(step + 1);
  };
  const isFirst = useMemo(() => step === 0, [step]);
  const isLast = useMemo(
    () => step + 1 === historyLength,
    [step, historyLength]
  );
  const [n, m] = useMemo(() => matShape(mat), [mat]);
  const start = useCallback(() => {
    setStarted(true);
    setStep(0);
  }, []);
  const stop = useCallback(() => {
    setStarted(false);
  }, []);
  return (
    <OuterWrapper>
      <Flipper flipKey={[started, step]}>
        {started ? (
          <>
            <Wrapper>{createHistoryPoint(step)}</Wrapper>
            <div>
              steps: {step + 1}/{historyLength}
            </div>
            <div>
              <button onClick={prev} disabled={isFirst}>
                ←前へ
              </button>
              <button onClick={next} disabled={isLast}>
                次へ→
              </button>
            </div>
            <button onClick={stop}>入力する</button>
          </>
        ) : (
          <>
            <Wrapper>
              <MatViewer
                n={n}
                m={m}
                flipIdPrefix="mat"
                createElem={(y, x) => (
                  <MatElemInput
                    value={mat[y][x]}
                    onInput={(v) => {
                      setMat(matSet(mat, y, x, v));
                    }}
                  />
                )}
              />
            </Wrapper>
            <button onClick={start}>計算する</button>
          </>
        )}
      </Flipper>
    </OuterWrapper>
  );
}
