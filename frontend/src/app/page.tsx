'use client';
import React, { useState } from 'react';
import TitleBar from './components/TitleBar';
import InputArea from './components/InputArea';
import OutputArea from './components/OutputArea';
import BarcodeScanner from './components/BarcodeScanner'; // BarcodeScannerの正確なパスを確認してください

// 型定義
type Producttype = {
  PRD_CD: string;
};

export default function Home() {
  const [productcd, setProductCd] = useState<Producttype>({ PRD_CD: "" });
  const [isActive, setIsActive] = useState(false); // スキャナーのアクティブ状態を管理するステート

  const handleProductChange = (newProductCd: string) => {
    setProductCd({ PRD_CD: newProductCd });
    setIsActive(false); // スキャンが完了したらスキャナーを非アクティブ化
  };

  // 商品コードをリセットする関数をここに追加
  const resetProductCd = () => {
    setProductCd({ PRD_CD: "" });
  };

  const toggleScanner = () => {
    setIsActive(!isActive); // スキャナーの状態を切り替える
  };

  return (
    <>
      <TitleBar/>
      <div className="flex flex-col items-center my-10">
        <button
          onClick={toggleScanner}
          className="mb-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
        >
          {isActive ? 'スキャンを停止' : 'スキャンを開始'}
        </button>
        {isActive && <BarcodeScanner onDetected={handleProductChange} isActive={isActive} />}
        <InputArea onProductChange={handleProductChange} value={productcd.PRD_CD}/>
        {/* OutputArea に resetProductCd 関数を渡す */}
        <OutputArea productcd={productcd} onReset={resetProductCd} />
      </div>
    </>
  );
}


