/**
 * Credit where credit is due
 *
 * @see https://github.com/chakra-ui/chakra-ui/blob/035250b78587761ba701ce4d66d6045a5d275aa1/packages/test-utils/src/test-utils.tsx#L111
 */
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import { RunOptions } from 'axe-core';
export { fireEvent, screen, waitFor } from '@testing-library/react';
export { act, renderHook, RenderHookOptions, RenderHookResult, } from '@testing-library/react-hooks';
export { default as userEvent } from '@testing-library/user-event';
declare type UI = Parameters<typeof rtlRender>[0];
/**
 * Custom @testing-library/react render
 */
export declare const render: (ui: UI, options?: RenderOptions) => RenderResult;
declare type A11yTestOptions = RenderOptions & {
    axeOptions?: RunOptions;
};
/**
 * Wrapper for jest-axe
 */
export declare const a11yTest: (ui: UI | Element, { axeOptions, ...options }?: A11yTestOptions) => Promise<void>;
//# sourceMappingURL=index.d.ts.map