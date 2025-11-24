import React, { useEffect } from 'react';

export const AdSenseBanner: React.FC = () => {
  useEffect(() => {
    try {
      // @ts-ignore
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    } catch (e) {
      console.error('AdSense error', e);
    }
  }, []);

  return (
    <div className="w-full my-6 mx-auto max-w-4xl overflow-hidden flex flex-col items-center justify-center bg-slate-50 rounded-lg p-2">
      <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">Advertisement</div>
      <ins className="adsbygoogle"
           style={{ display: 'block', minWidth: '300px', width: '100%' }}
           data-ad-client="ca-pub-7431808618156384"
           data-ad-slot="2146228323"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};