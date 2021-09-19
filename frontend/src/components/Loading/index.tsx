import React from 'react';

interface LoadingProps {
  loading: boolean;
}

export function Loading({ loading }: LoadingProps): JSX.Element {
  return <>{loading && <h1>Loading</h1>}</>;
}
