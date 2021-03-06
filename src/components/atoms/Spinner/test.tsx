import React from 'react';

import Spinner from '.';
import { a11yTest, mockMatchMedia, render } from '../../../test-utils';

describe('<Spinner />', () => {
  beforeAll(() => mockMatchMedia());

  it('should pass a11y tests', async () => {
    await a11yTest(<Spinner />);
  });

  it('should render', () => {
    const { container } = render(<Spinner />);

    expect(container).toBeInTheDocument();
  });

  it('should render with an aria label by default', () => {
    const { getByLabelText } = render(<Spinner />);
    const result = getByLabelText('Action is being processed');

    expect(result).toBeInTheDocument();
  });

  it('should render with aria label passed in', () => {
    const ariaLabel = 'Loading...';
    const { getByLabelText } = render(<Spinner ariaLabel={ariaLabel} />);
    const result = getByLabelText(ariaLabel);

    expect(result).toBeInTheDocument();
  });
});
