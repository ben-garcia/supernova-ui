import { render } from '@testing-library/react';

import { Button } from './Button';

describe('<Button />', () => {
  it('should render', () => {
    const { container } = render(
      <Button primary backgroundColor="blue" size="medium" label="label" />
    );
    expect(container).toBeInTheDocument();
  });
});
