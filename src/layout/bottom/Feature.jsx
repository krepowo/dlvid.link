import React from 'react';
import TextTransition, { presets } from 'react-text-transition';

const TEXTS = ['Free', 'Fast', 'Simple', 'No ADS'];

const Feature = () => {
   const [index, setIndex] = React.useState(0);

   React.useEffect(() => {
      const intervalId = setInterval(
         () => setIndex((index) => index + 1),
         3000,
      );
      return () => clearTimeout(intervalId);
   }, []);

   return (
      <div className="justify-center flex text-center">
         <h1 className="pt-10 text-2xl font-bold text-slate-400 font-mono">
            <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
         </h1>
      </div>
   );
};
export default Feature;