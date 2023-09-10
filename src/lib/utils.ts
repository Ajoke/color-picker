
export const rgbToHex = (r: number, g: number, b: number): string => {
  return numberToHex(r) + numberToHex(g) + numberToHex(b);
}

const numberToHex = (c: number): string => c.toString(16).padStart(2, "0");

export const hasBrowserReadyForFeature = (): boolean => 'FileReader' in window;

export const getCanvasCells = (canvasRef: HTMLCanvasElement, gridSize: number, cx: number, cy: number): string[] => {
  const cells: string[] = [];
  const canvas = canvasRef.getContext('2d');
  if (canvas) {
    const imageData = canvas.getImageData(cx-4, cy-4, gridSize, gridSize).data;
    const squareCount = gridSize * gridSize * 4;
    for (let i = 0; i < squareCount; i += 4) {
      cells.push(("000000" + rgbToHex(imageData[i], imageData[i + 1], imageData[i + 2])).slice(-6));
    }
  }
  return cells;
}

// reference: http://www.javascripter.net/faq/hex2cmyk.htm
export const hexToCMYK = (hex: string) => {
  var computedC = 0;
  var computedM = 0;
  var computedY = 0;
  var computedK = 0;
 
  hex = (hex.charAt(0)=="#") ? hex.substring(1,7) : hex;
 
  if (hex.length != 6) {
   alert ('Invalid length of the input hex value!');   
   return; 
  }
  if (/[0-9a-f]{6}/i.test(hex) != true) {
   alert ('Invalid digits in the input hex value!');
   return; 
  }
 
  var r = parseInt(hex.substring(0,2),16); 
  var g = parseInt(hex.substring(2,4),16); 
  var b = parseInt(hex.substring(4,6),16); 
 
  // BLACK
  if (r==0 && g==0 && b==0) {
   computedK = 1;
   return [0,0,0,1];
  }
 
  computedC = 1 - (r/255);
  computedM = 1 - (g/255);
  computedY = 1 - (b/255);
 
  var minCMY = Math.min(computedC,Math.min(computedM,computedY));
 
  computedC = (computedC - minCMY) / (1 - minCMY) ;
  computedM = (computedM - minCMY) / (1 - minCMY) ;
  computedY = (computedY - minCMY) / (1 - minCMY) ;
  computedK = minCMY;
 
  return [computedC,computedM,computedY,computedK];
 }

 export const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

 