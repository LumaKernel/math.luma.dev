// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { rootClass } from '@blogkit/blog-components/src/root';

// TODO: not working

// export const ifLight = (selector: string, ifClause: string, elseClause: string): string => `
//   ${selector} {
//     ${ifClause}
//   }
//   @media (prefers-color-scheme: dark) {
//     :global(.${rootClass}):not(.light) ${selector} {
//       ${elseClause}
//     }
//   }
//   :global(.${rootClass}).dark ${selector} {
//     ${elseClause}
//   }
// `;
