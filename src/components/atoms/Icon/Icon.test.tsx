import React from 'react';

import { a11yTest, render } from '@testUtils';
import Icon from './Icon';

describe('<Icon />', () => {
  it('should pass a11y tests', async () => {
    await a11yTest(
      <Icon>
        <path d="125 1560" />
      </Icon>
    );
  });

  it('should render', () => {
    const { container } = render(
      <Icon>
        <path d="125 1560" />
      </Icon>
    );

    expect(container).toBeInTheDocument();
  });

  it('should render as an svg', () => {
    const { getByTestId } = render(
      <div data-testid="svg-parrent">
        <Icon>
          <path d="125 1560" />
        </Icon>
      </div>
    );
    const result = getByTestId('svg-parrent');

    expect(result!.firstChild!.nodeName).toBe('svg');
  });

  it('should render path as children', () => {
    const path = <path d="125 1560" />;
    const { getByTestId } = render(
      <div data-testid="svg-parent">
        <Icon>{path}</Icon>
      </div>
    );
    const result = getByTestId('svg-parent').firstChild?.firstChild;

    expect(result!.nodeName).toBe('path');
  });
});
