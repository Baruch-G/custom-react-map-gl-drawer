export type RGB = [number, number, number];

export const contrast = (foregroundColor: RGB, backgroundColor: RGB) => {
    const foregroundLumiance = luminance(foregroundColor);
    const backgroundLuminance = luminance(backgroundColor);
    return backgroundLuminance < foregroundLumiance
        ? ((backgroundLuminance + 0.05) / (foregroundLumiance + 0.05))
        : ((foregroundLumiance + 0.05) / (backgroundLuminance + 0.05));
};

export const gg = (hex: string) => {
    const rgbColor = getRgbColorFromHex(hex)
    return luminance(rgbColor) 
}
``
function getRgbColorFromHex(hex: string) {
    console.log(hex)
    hex = hex.slice(1);
    const value = parseInt(hex, 16);
    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;

    return [r, g, b] as RGB;
};

function luminance(rgb: RGB) {
    const [r, g, b] = rgb.map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return r * 0.2126 + g * 0.7152 + b * 0.0722;
};