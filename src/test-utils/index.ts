/**
 * Credit where credit is due
 *
 * @see https://github.com/chakra-ui/chakra-ui/blob/035250b78587761ba701ce4d66d6045a5d275aa1/packages/test-utils/src/test-utils.tsx#L111
 */

import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import { RunOptions } from 'axe-core';
import { axe } from 'jest-axe';
import { isValidElement } from 'react';

export { fireEvent, screen, waitFor } from '@testing-library/react';

export {
  act,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
} from '@testing-library/react-hooks';
export { default as userEvent } from '@testing-library/user-event';

type UI = Parameters<typeof rtlRender>[0];

/**
 * Custom @testing-library/react render
 */
export const render = (ui: UI, options: RenderOptions = {}): RenderResult =>
  rtlRender(ui, options);

type A11yTestOptions = RenderOptions & { axeOptions?: RunOptions };

/**
 * Wrapper for jest-axe
 */
export const a11yTest = async (
  ui: UI | Element,
  { axeOptions, ...options }: A11yTestOptions = {}
) => {
  const container = isValidElement(ui) ? render(ui, options).container : ui;

  const results = await axe(container, axeOptions);

  expect(results).toHaveNoViolations();
};
