const red = 0,
  yellow = 60,
  green = 120,
  turquoise = 180,
  blue = 240,
  pink = 300;


export function getHslColorFromPercentage(percent: number, start = red, end = green): string {
  var a = percent / 100,
    b = (end - start) * a,
    c = b + start;

  // Return a CSS HSL string
  return 'hsl(' + c + ', 100%, 50%)';
}
