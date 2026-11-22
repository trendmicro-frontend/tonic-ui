import type tonicTheme from '@tonic-ui/theme';
import type { Breakpoints, ContainerQueries } from '@tonic-ui/utils/internal';

type DefaultBreakpoint = (typeof tonicTheme.breakpoints.keys)[number];

// createTheme applies overrides in order; the last supplied values map wins.
type BreakpointNames<Options extends readonly unknown[]> =
  Options extends readonly [...infer Rest, infer Last]
    ? Last extends { breakpoints: { values: infer Values } }
      ? Extract<{ [Name in keyof Values]-?: Values[Name] extends undefined ? never : Name }[keyof Values], string>
      : BreakpointNames<Rest>
    : DefaultBreakpoint;

export type CreatedTheme<Options extends readonly unknown[]> = ThemeScales & {
  readonly breakpoints: Breakpoints<BreakpointNames<Options>>;
  readonly containerQueries: ContainerQueries<BreakpointNames<Options>>;
  cssVariablePrefix: string;
  cssVariables: ThemeScales;
  rootSelector: string;
};
