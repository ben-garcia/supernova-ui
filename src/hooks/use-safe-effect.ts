import { useEffect, useLayoutEffect } from 'react';

import { isBrowser } from '@utils';

/**
 * React hooks that returns 'useLayoutEffet' when running in a browser
 * and 'useEffect' when on the server.
 */
export const useSafeEffect = isBrowser() ? useLayoutEffect : useEffect;
