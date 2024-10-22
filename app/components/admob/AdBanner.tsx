// import React, { useState, useRef } from 'react';
// import { Platform } from 'react-native';
// import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

// const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-7557948505846700/3631676793';

// export default function AdBanner() {
//   const bannerRef = useRef<BannerAd>(null);

//   useForeground(() => {
//     Platform.OS === 'ios' && bannerRef.current?.load();
//   })

//   return (
//     <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
//   );
// }
