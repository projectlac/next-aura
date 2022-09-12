import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface IRedirect {
  href: string;
}
export default function RoutingToLink({ href }: IRedirect) {
  const route = useRouter();

  useEffect(() => {
    console.log(href);

    route.push(href);
  }, [href]);
  return <React.Fragment>Loading</React.Fragment>;
}
