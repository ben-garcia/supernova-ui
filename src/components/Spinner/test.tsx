import React from 'react';

import { Spinner } from '@components';
import { a11yTest, render } from '@test-utils';

describe('<Spinner />', () => {
  it('should pass a11y tests', async () => {
    await a11yTest(<Spinner />);
  });

  it('should render', () => {
    const { container } = render(<Spinner />);

    expect(container).toBeInTheDocument();
  });

  it('should render with aria label passed in', () => {
    const ariaLabel = 'Loading...';
    const { getByLabelText } = render(<Spinner aria-label={ariaLabel} />);
    const result = getByLabelText(ariaLabel);

    expect(result).toBeInTheDocument();
  });
});
