import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface IRedirect {
  href: string;
}
export default function RoutingToLink({ href }: IRedirect) {
  const route = useRouter();

  useEffect(() => {
    route.push(href);
  }, []);
  return <React.Fragment>Loading</React.Fragment>;
}
