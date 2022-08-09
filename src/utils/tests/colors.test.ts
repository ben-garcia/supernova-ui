import { hexToRgb, hslToHex, isDarkColor, rgbToHex } from '@utils';

describe('colors', () => {
  describe('hexToRgb', () => {
    it('should convert from rgb', () => {
      expect(hexToRgb('#ff0000')).toStrictEqual([255, 0, 0]);
      expect(hexToRgb('#00ff00')).toStrictEqual([0, 255, 0]);
      expect(hexToRgb('#0000ff')).toStrictEqual([0, 0, 255]);
    });
  });

  describe('hslToHex', () => {
    it('should convert from hsl', () => {
      expect(hslToHex(77, 21, 57)).toBe('#9ba87a');
      expect(hslToHex(300, 88, 12)).toBe('#3a043a');
      expect(hslToHex(0, 100, 50)).toBe('#ff0000');
      expect(hslToHex(150, 50, 20)).toBe('#194d33');
    });

    it('should convert from hsla', () => {
      expect(hslToHex(20, 80, 56, 0.8)).toBe('#e97135cc');
      expect(hslToHex(360, 74, 90, 0.6)).toBe('#f8d3d399');
      expect(hslToHex(280, 10, 39, 0.3)).toBe('#675a6d4d');
      expect(hslToHex(182, 49, 30, 0.91)).toBe('#276f72e8');
    });
  });

  describe('isDarkColor', () => {
    it('should pick out the dark colors', () => {
      expect(isDarkColor('#000000')).toBe(true);
      expect(isDarkColor('#09584e')).toBe(true);
      expect(isDarkColor('#ffffff')).toBe(false);
      expect(isDarkColor('#b9e68f')).toBe(false);
    });
  });

  describe('rgbToHex', () => {
    it('should convert from rgb', () => {
      expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
      expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
      expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
      expect(rgbToHex(0, 120, 212)).toBe('#0078d4');
    });

    it('should convert from rgba', () => {
      expect(rgbToHex(67, 255, 100, 0.85)).toBe('#43ff64d9');
      expect(rgbToHex(8, 246, 43, 1)).toBe('#08f62b');
      expect(rgbToHex(114, 29, 98, 0.65)).toBe('#721d62a6');
      expect(rgbToHex(37, 49, 49, 1)).toBe('#253131');
    });
  });
});
