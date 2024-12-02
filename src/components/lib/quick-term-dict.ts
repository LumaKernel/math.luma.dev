export interface QuickTermSingle {
  text: string;
  ruby?: string;
  jaRuby?: string;
}

export interface QuickTermDefinition extends QuickTermSingle {
  short?: string;
  slug?: string;
  others?: QuickTermSingle[];
  ref?: {
    w?: {
      ja?: string;
      en?: string;
    };
  };
}

export const quickTerms: Record<string, QuickTermDefinition | undefined> = {
  language: {
    text: '言語',
    ruby: 'language',
  },
  mat: {
    text: '行列',
    ruby: 'matrix',
    slug: 'matrix',
  },
  base: {
    text: '基底',
    ruby: 'base',
  },
  invariable: {
    text: '不変量',
    ruby: 'invariable',
  },
  invariance: {
    text: '不変性',
    ruby: 'invariance',
  },
  invariant: {
    text: '不変',
    ruby: 'invariant',
  },
  'transition-matrix': {
    text: '基底変換行列',
    ruby: 'transition matrix',
    others: [{ text: 'change-of-basis matrix' }],
  },
  transition: {
    text: '基底変換',
    ruby: 'transition',
  },
  'zero-matrix': {
    text: '零行列',
    ruby: 'zero matrix',
  },
  'square-matrix': {
    text: '正方行列',
    ruby: 'square matrix',
  },
  'symmetrix-matrix': {
    text: '対称行列',
    ruby: 'symmetric matrix',
  },
  'skew-symmetrix-matrix': {
    text: '交代行列',
    ruby: 'skew-symmetric matrix',
  },
  'upper-triangular-matrix': {
    text: '上三角行列',
    ruby: 'upper triangular matrix',
    others: [{ text: '右三角行列', ruby: 'right triangular matrix' }],
  },
  'lower-triangular-matrix': {
    text: '下三角行列',
    ruby: 'lower triangular matrix',
    others: [{ text: '左三角行列', ruby: 'left triangular matrix' }],
  },
  'diagonal-matrix': {
    text: '対角行列',
    ruby: 'diagonal matrix',
  },
  'main-diag': {
    text: '対角成分',
    ruby: 'main diagonal',
  },
  cofactor: {
    text: '余因子',
    ruby: 'cofactor',
  },
  'cofactor-matrix': {
    text: '余因子行列',
    ruby: 'cofactor matrix',
  },
  'cramers-rule': {
    text: 'クラメルの公式',
    ruby: "Cramer's rule",
  },
  'kronecker-delta': {
    text: 'クロネッカーのデルタ',
    ruby: 'Kronecker delta',
  },
  'identity-matrix': {
    text: '単位行列',
    ruby: 'identity matrix',
  },
  'row-echelon-form': {
    text: '行階段形',
    ruby: 'row echelon form',
  },
  'reduced-row-echelon-form': {
    text: '行簡約階段形',
    ruby: 'reduced row echelon form',
    others: [{ text: '行標準形' }, { text: '行簡約形' }],
  },
  'matrix-elimination': {
    text: '簡約化',
    ruby: 'matrix reduction',
    slug: 'matrix-reduction',
  },
  'mat-make-diag': {
    text: '対角化',
    ruby: 'diagonalization',
    slug: 'matrix-diagonalization',
  },
  'mat-make-upper-tri': {
    text: '上三角化',
    ruby: 'upper triangularization',
    slug: 'matrix-upper-triangularization',
    others: [{ text: '右三角化', ruby: 'right triangularization' }],
  },
  'mat-make-lower-tri': {
    text: '下三角化',
    ruby: 'lower triangularization',
    slug: 'matrix-lower-triangularization',
    others: [{ text: '左三角化', ruby: 'left triangularization' }],
  },
  'aug-mat': {
    text: '拡大行列',
    ruby: 'augmented matrix',
    slug: 'augmented-matrix',
  },
  'mat-eliminated': {
    text: '簡約',
    ruby: 'reduced',
    slug: 'matrix-reduced',
  },
  'gauss-elim': {
    text: 'ガウスの消去法',
    ruby: 'Gaussian elimination',
    slug: 'gaussian-elimination',
  },
  'forward-elim': {
    text: '前進消去',
    ruby: 'forward elimination',
    slug: 'forward-elimination',
  },
  'back-subst': {
    text: '後退代入',
    ruby: 'back substitution',
    slug: 'back-substitution',
  },
  'gauss-jordan-elim': {
    text: 'ガウス・ジョルダンの消去法',
    ruby: 'Gauss―Jordan elimination',
    slug: 'gauss-jordan-elimination',
  },
  'comp-comp': {
    text: '計算量',
    ruby: 'computation complexitiy',
    slug: 'computation-complexitiy',
    others: [
      {
        text: '計算複雑性',
      },
    ],
  },
  'time-comp': {
    text: '時間計算量',
    ruby: 'time complexitiy',
    slug: 'time-complexitiy',
  },
  'space-comp': {
    text: '空間計算量',
    ruby: 'space complexitiy',
    slug: 'space-complexitiy',
  },
  'el-column-op': {
    text: '列基本変形',
    ruby: 'elementary column operation',
    slug: 'elementary-column-operation',
  },
  'el-row-op': {
    text: '行基本変形',
    ruby: 'elementary row operation',
    slug: 'elementary-row-operation',
  },
  'el-mat': {
    text: '基本行列',
    ruby: 'elementary matrix',
    slug: 'elementary-matrix',
  },
  'leading-entry': {
    text: '主成分',
    ruby: 'leading entry',
  },
  pivot: {
    text: '枢軸',
    ruby: 'pivot',
    jaRuby: 'すうじく',
  },
  pivotting: {
    text: '枢軸選択',
    ruby: 'pivotting',
    jaRuby: 'すうじくせんたく',
  },
  alternating: {
    text: '交代',
    ruby: 'alternating',
  },

  // <関係代数>

  relation: {
    text: '関係',
    ruby: 'relation',
  },
  relation2: {
    text: '二項関係',
    ruby: 'binary relation',
    slug: 'binary-relation',
  },
  'eq-relation': {
    text: '同値関係',
    ruby: 'equivalence relation',
    slug: 'equivalence-relation',
  },
  'eq-class': {
    text: '同値類',
    ruby: 'equivalence class',
    slug: 'equivalence-class',
  },
  reflexivity: {
    text: '反射律',
    ruby: 'reflexivity',
  },
  transitivity: {
    text: '推移律',
    ruby: 'transitivity',
  },
  symmetricity: {
    text: '対象律',
    ruby: 'symmetricity',
  },

  // </関係代数>

  nat: {
    text: '自然数',
    ruby: 'natural',
    slug: 'natural',
  },
  num: {
    text: '整数',
    ruby: 'number',
    slug: 'number',
  },
  'num-th': {
    text: '整数論',
    ruby: 'number theory',
    slug: 'number-theory',
  },
  rat: {
    text: '有理数',
    ruby: 'rational',
    slug: 'rational',
  },
  irrat: {
    text: '無理数',
    ruby: 'irrational',
    slug: 'irrational',
  },
  add: {
    text: '加算',
    ruby: 'addition',
    slug: 'addition',
    others: [{ text: '和' }],
  },
  sum: {
    text: '総和',
    ruby: 'sum',
    slug: 'sum',
  },
  mult: {
    text: '乗算',
    ruby: 'multiplication',
    slug: 'multiplication',
    others: [{ text: '積' }],
  },
  prod: {
    text: '総積',
    ruby: 'product',
    slug: 'product',
  },
  field: {
    text: '体',
    ruby: 'field',
    jaRuby: 'たい',
  },
  group: {
    text: '群',
    ruby: 'group',
  },
  'c-group': {
    text: '可換群',
    ruby: 'commutative group',
    slug: 'commutative-group',
    others: [
      {
        text: 'アーベル群',
        ruby: 'Abelian group',
      },
    ],
  },

  object: {
    text: '対象',
    ruby: 'object',
  },

  homomorphism: {
    text: '準同型射',
    ruby: 'homomorphism',
  },
  automorphism: {
    text: '自己同型射',
    ruby: 'automorphism',
  },
  endomorphism: {
    text: '自己準同型射',
    ruby: 'endomorphism',
  },
  isomorphism: {
    text: '同型射',
    ruby: 'isomorphism',
  },
  morphism: {
    text: '射',
    ruby: 'morphism',
  },

  homomorphic: {
    text: '準同型',
    ruby: 'homomorphic',
  },
  automorphic: {
    text: '自己同型',
    ruby: 'automorphic',
  },
  endomorphic: {
    text: '自己準同型',
    ruby: 'endomorphic',
  },
  isomorphic: {
    text: '同型',
    ruby: 'isomorphic',
  },

  'lin-combi': {
    text: '線形結合',
    ruby: 'linear combination',
    slug: 'linear-combination',
  },
  'lin-indep': {
    text: '線形独立',
    ruby: 'linearly independent',
    slug: 'linearly-independent',
    others: [{ text: '一次独立' }],
  },
  'lin-dep': {
    text: '線形従属',
    ruby: 'linearly dependent',
    slug: 'linearly-dependent',
    others: [{ text: '一次従属' }],
  },
  'linear-algebra': {
    text: '線形代数',
    ruby: 'linear algebra',
  },
  linear: {
    text: '線形',
    ruby: 'linear',
  },
  linearity: {
    text: '線形性',
    ruby: 'linearity',
  },
  'linear-map': {
    text: '線形写像',
    ruby: 'linear map',
  },
  'linear-transform': {
    text: '線形変換',
    ruby: 'linear transform',
  },

  act: {
    text: '作用',
    ruby: 'action',
    slug: 'action',
  },
  axiom: {
    text: '公理',
    ruby: 'axiom',
  },
  identity: {
    text: '単位元',
    ruby: 'identity',
  },
  'id-morph': {
    text: '恒等射',
    ruby: 'identity morphism',
    slug: 'identity-morphism',
  },
  domain: {
    text: '領域',
    ruby: 'domain',
  },
  row: {
    text: '行',
    ruby: 'row',
  },
  column: {
    text: '列',
    ruby: 'column',
  },
  elem: {
    text: '要素',
    ruby: 'element',
    slug: 'element',
    others: [
      {
        text: '元',
      },
    ],
  },
  deg: {
    text: '次数',
    ruby: 'degree',
    slug: 'degree',
  },
  dimension: {
    text: '次元',
    ruby: 'dimension',
  },
  'system-of-eq': {
    text: '連立方程式',
    ruby: 'system of equations',
    slug: 'system-of-equations',
  },
  'system-of-lin-eq': {
    text: '線形方程式',
    ruby: 'system of linear equations',
    slug: 'system-of-linear-equations',
  },
  homo: {
    text: '斉次',
    jaRuby: 'さいじ',
    ruby: 'homogeneous',
    others: [{ text: '同次' }],
  },
  'homo-system': {
    text: '斉次方程式',
    jaRuby: 'さいじほうていしき',
    ruby: 'homogeneous system',
  },
  variable: {
    text: '変数',
    ruby: 'variable',
  },
  term: {
    text: '項',
    ruby: 'term',
  },
  'multi-variable': {
    text: '多変数',
    ruby: 'multiple variable',
    slug: 'multiple-variable',
  },
  sol: {
    text: '解',
    ruby: 'solution',
    slug: 'solution',
  },
  poly: {
    text: '多項式',
    ruby: 'polynomial',
    slug: 'polynomial',
  },
  coeff: {
    text: '係数',
    ruby: 'coefficient',
    slug: 'coefficient',
  },
  'poly-eq': {
    text: '多項式方程式',
    ruby: 'polynomial equation',
    slug: 'polynomial-equation',
  },
  pm: {
    text: 'パラメータ',
    ruby: 'parameter',
    slug: 'parameter',
    others: [
      {
        text: '媒介変数',
        jaRuby: 'ばいかいへんすう',
      },
    ],
  },
  pmz: {
    text: 'パラメータ表示',
    ruby: 'parametrization',
    slug: 'parametrization',
    others: [
      {
        text: '媒介変数表示',
        jaRuby: 'ばいかいへんすうひょうじ',
      },
    ],
  },
  equation: {
    text: '方程式',
    ruby: 'equation',
  },
  algo: {
    text: 'アルゴリズム',
    ruby: 'algorithm',
    slug: 'algorithm',
  },
  real: {
    text: '実数',
    ruby: 'real number',
    slug: 'real-number',
  },
  comp: {
    text: '虚数',
    ruby: 'complex number',
    slug: 'complex-number',
  },
  set: {
    text: '集合',
    ruby: 'set',
  },
  'empty-set': {
    text: '空集合',
    ruby: 'empty set',
  },
  'set-theory': {
    text: '集合論',
    ruby: 'set theory',
  },
  'relationa-algebra': {
    text: '関係代数',
    ruby: 'relational algebra',
  },
  'mathematical-induction': {
    text: '数学的帰納法',
    ruby: 'mathematical-induction induction',
  },
  'structural-induction': {
    text: '構造的帰納法',
    ruby: 'structural induction',
  },
  category: {
    text: '圏',
    ruby: 'category',
  },
  'category-theory': {
    text: '圏論',
    ruby: 'category theory',
  },
  'logic-theory': {
    text: '論理学',
    ruby: 'logic thoery',
  },
  'curry-howard': {
    text: '論理学',
    ruby: 'logic thoery',
  },
  'power-set': {
    text: '冪集合',
    ruby: 'power set',
  },
  mapping: {
    text: '写像',
    ruby: 'mapping',
  },
  tuple: {
    text: '組',
    ruby: 'tuple',
  },
  'zero-divisor': {
    text: '零因子',
    ruby: 'zero divisor',
  },
  commutative: {
    text: '可換',
    ruby: 'commutative',
  },
  commutativity: {
    text: '可換則',
    ruby: 'commutativity',
  },
  associativity: {
    text: '結合則',
    ruby: 'associativity',
  },
  distributivity: {
    text: '分配則',
    ruby: 'distributivity',
  },
  'mat-eq': {
    text: '行列の相等',
    ruby: 'matrix equality',
    slug: 'matrix-equality',
  },
  'mat-add': {
    text: '行列の和',
    slug: 'matrix-addition',
  },
  'mat-subt': {
    text: '行列の差',
    slug: 'matrix-subtraction',
  },
  'mat-mult': {
    text: '行列の積',
    slug: 'matrix-multiplication',
  },
  'mat-rank': {
    text: '行列の階数',
    ruby: 'rank',
    slug: 'matrix-rank',
    others: [{ text: 'ランク' }],
  },
  'mat-trace': {
    text: '行列のトレース',
    ruby: 'trace',
    slug: 'matrix-trace',
  },
  trace: {
    text: 'トレース',
    ruby: 'trace',
    slug: 'trace',
  },
  eigenvalue: {
    text: '固有値',
    ruby: 'eigenvalue',
  },
  'eigenvalue-eq': {
    text: '固有方程式',
    ruby: 'eigenvalue equation',
    slug: 'eigenvalue-equation',
  },
  eigenvector: {
    text: '固有ベクトル',
    ruby: 'eigenvector',
  },
  eigenspace: {
    text: '固有空間',
    ruby: 'eigenspace',
  },
  'mat-det': {
    text: '行列式',
    ruby: 'determinant',
    slug: 'determinant',
  },
  'transform-matrix': {
    text: '表現行列',
    ruby: 'transformation matrix',
    slug: 'transformation-matrix',
  },
  zero: {
    text: '零',
    ruby: 'zero',
  },
  swap: {
    text: '互換',
    ruby: 'swap',
  },
  'peano-arithmetic': {
    text: 'ペアノ算術',
    ruby: 'Peano arithmetic',
    ref: {
      w: {
        ja: 'ペアノの公理#1+1=2に関する注意',
        en: 'Peano_axioms#Peano_arithmetic_as_first-order_theory',
      },
    },
  },
  'ordered-set': {
    text: '順序集合',
    ruby: 'ordered set',
  },
  'totally-ordered-set': {
    text: '全順序集合',
    ruby: 'totally ordered set',
  },
  'partially-ordered-set': {
    text: '半順序集合',
    ruby: 'partially ordered set',
  },
  'preordered-set': {
    text: '前順序集合',
    ruby: 'preordered set',
  },
  'transfinite-induction': {
    text: '超限帰納法',
    ruby: 'transfinite induction',
  },
  perm: {
    text: '置換',
    ruby: 'permutation',
    slug: 'permutation',
  },
  recursive: {
    text: '再帰的',
    ruby: 'recursive',
  },
  parity: {
    text: '偶奇',
    ruby: 'parity',
  },
  scalar: {
    text: 'スカラー',
    ruby: 'scalar',
  },
  scaling: {
    text: 'スカラー倍',
    ruby: 'scaling',
  },
  injection: {
    text: '単射',
    ruby: 'injection',
    others: [{ text: '入射' }],
  },
  surjection: {
    text: '全射',
    ruby: 'surjection',
  },
  bijection: {
    text: '全単射',
    ruby: 'bijection',
    others: [{ text: '可逆な写像', ruby: 'invertible' }],
  },
  inverse: {
    text: '逆元',
    ruby: 'inverse',
  },
  op: {
    text: '演算',
    ruby: 'operation',
    slug: 'operation',
  },
  operator: {
    text: '演算子',
    ruby: 'operator',
  },
  operand: {
    text: '被演算子',
    ruby: 'operand',
  },
  'mat-negation': {
    text: '行列の符号反転',
    slug: 'matrix-ngeation',
  },
  cyclic: {
    text: '巡回',
    ruby: 'cyclic',
    slug: 'cyclic',
  },
  'cyclic-group': {
    text: '巡回',
    ruby: 'cyclic',
    slug: 'cyclic',
  },
  'similar-mat': {
    text: '相似',
    ruby: 'similar',
    slug: 'similar-matrix',
  },
  transpose: {
    text: '転置',
    ruby: 'transpose',
    slug: 'transpose',
  },
  'transposed-mat': {
    text: '転置行列',
    ruby: 'transposed matrix',
    slug: 'transposed-matrix',
  },
  'inv-mat': {
    text: '逆行列',
    ruby: 'inverse',
    slug: 'matrix-inverse',
  },
  'invertible-mat': {
    text: '正則行列',
    ruby: 'invertible',
    slug: 'invertible-matrix',
  },
  invertible: {
    text: '可逆元',
    ruby: 'invertible',
    others: [{ text: '単元', ruby: 'unit' }],
  },
  inv: {
    text: '逆元',
    ruby: 'inverse',
    slug: 'inverse',
  },
  'l-inv': {
    text: '左逆元',
    ruby: 'left inverse',
    slug: 'left-inverse',
  },
  'r-inv': {
    text: '右逆元',
    ruby: 'right inverse',
    slug: 'right-inverse',
  },
  dof: {
    text: '自由度',
    ruby: 'degree of freedom',
    slug: 'degree-of-freedom',
  },
  reverse: {
    text: '反転',
    ruby: 'reverse',
  },
  'well-def': {
    text: 'well-defined',
    slug: 'well-defined',
  },
  dp: {
    text: '動的計画法',
    short: 'DP',
    ruby: 'dynamic programming',
    slug: 'dynamic-programming',
  },
  array: {
    text: '配列',
    ruby: 'array',
  },
  'lin-sp': {
    text: '線形空間',
    ruby: 'linear space',
    others: [{ text: 'ベクトル空間', ruby: 'vector space' }],
    slug: 'linear-space',
  },
  'real-sp': {
    text: '実数ベクトル空間',
    ruby: 'real vector space',
    slug: 'real-vector-space',
  },
  'comp-sp': {
    text: '虚数ベクトル空間',
    ruby: 'complex vector space',
    slug: 'complex-vector-space',
  },
  'func-sp': {
    text: '関数空間',
    ruby: 'function space',
    slug: 'function-space',
  },
  function: {
    text: '関数',
    ruby: 'function',
  },
  degree: {
    text: '次数',
    ruby: 'degree',
  },
  fin: {
    text: '有限',
    ruby: 'finite',
    slug: 'finite',
  },
  inf: {
    text: '無限',
    ruby: 'infinite',
    slug: 'infinite',
  },
  dimen: {
    text: '次元',
    ruby: 'dimension',
    slug: 'dimension',
  },
  differential: {
    text: '微分',
    ruby: 'differential',
    slug: 'differential',
  },
  integral: {
    text: '積分',
    ruby: 'integral',
    slug: 'integral',
  },
  'fin-dimen': {
    text: '有限次元',
    ruby: 'finite dimension',
    slug: 'finite-dimension',
  },
  'inf-dimen': {
    text: '無限次元',
    ruby: 'infinite dimension',
    slug: 'infinite-dimension',
  },
  vec: {
    text: 'ベクトル',
    ruby: 'vector',
    slug: 'vector',
  },
  'c-vec': {
    text: '列ベクトル',
    ruby: 'column vector',
    slug: 'column-vector',
  },
  'c-evec': {
    text: '列基本ベクトル',
    ruby: 'column unit vector',
    slug: 'column-unit-vector',
  },
  'r-vec': {
    text: '行ベクトル',
    ruby: 'row vector',
    slug: 'row-vector',
  },
  'r-evec': {
    text: '行基本ベクトル',
    ruby: 'row unit vector',
    slug: 'row-unit-vector',
  },
  'algebraic-structure': {
    text: '代数的構造',
    ruby: 'algebraic structure',
    slug: 'algebraic-structure',
  },
  'fund-theorem-algebra': {
    text: '代数学の基本定理',
    ruby: 'fundamental theorem of algebra',
    slug: 'fundamental-theorem-of-algebra',
  },
  identify: {
    text: '同一視',
    ruby: 'identify',
  },
  seq: {
    text: '列',
    ruby: 'sequence',
    slug: 'sequence',
  },
  'null-seq': {
    text: '空列',
    ruby: 'null sequence',
    slug: 'null-sequence',
  },
  'inf-seq': {
    text: '無限列',
    ruby: 'infinite sequence',
    slug: 'infinite-sequence',
  },
  'fin-seq': {
    text: '有限列',
    ruby: 'finite sequence',
    slug: 'finite-sequence',
  },
  index: {
    text: '添字',
    ruby: 'index',
    jaRuby: 'そえじ',
  },
  'orthonormal-system': {
    text: '正規直交系',
    ruby: 'orthonormal system',
    // https://encyclopediaofmath.org/wiki/Orthonormal_system#:~:text=An%20orthonormal%20system%20of%20vectors,)%3D1%20(normalization).
  },
  // algo
  'knapsack-problem': {
    text: 'ナップサック問題',
    ruby: 'knapsack problem',
    slug: 'knapsack-problem',
  },
  '01knapsack-problem': {
    text: '0-1 ナップサック問題',
    ruby: '0-1 knapsack problem',
    slug: '0-1-knapsack-problem',
  },
  'decision-problem': {
    text: '決定問題',
    ruby: 'decision problem',
    slug: 'decision-problem',
    // https://en.wikipedia.org/wiki/Decision_problem
  },
  'travel-prob': {
    text: '巡回セールスマン問題',
    ruby: 'traveling salesman problem',
    slug: 'traveling-salesman-problem',
  },
  greedy: {
    text: '貪欲法',
    ruby: 'greedy',
    slug: 'greedy',
  },
  'k-means': {
    text: 'k-means法',
    ruby: 'k-means',
    slug: 'k-means',
  },

  // ML
  'black-box-optimization': {
    text: 'ブラックボックス最適化',
    ruby: 'black-box optimization',
    slug: 'black-box-optimization',
  },
};

export const toSlug = (name: string) => {
  const q = quickTerms[name];
  if (!q) return 'error--';
  return q.text || q.ruby;
};
