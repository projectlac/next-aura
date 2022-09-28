import React from 'react';
import img from 'src/assets/images/genshin-impact.webp';

interface IOG {
  title: string;
}
function OgTag({ title }: IOG) {
  return (
    <>
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="MuabanGenshin.com - Website bán acc Genshin uy tín, hàng đầu Việt Nam"
      />

      <meta property="og:locale" content="vi_GB" />
      <meta property="og:locale:alternate" content="vi-VN" />

      <meta property="og:image" content={img} />
      <meta property="og:image:secure_url" content={img} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="300" />
      <meta
        property="og:image:alt"
        content="MuabanGenshin.com - Website bán acc Genshin uy tín, hàng đầu Việt Nam"
      />
    </>
  );
}

export default OgTag;
