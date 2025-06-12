
export function cssVarToRgba(cssVar: string, alpha: number): string {
    const match = cssVar.match(/^var\((--[^)]+)\)$/)
    const varName = match ? match[1] : cssVar
    const hex = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
    if (!/^#?[0-9A-Fa-f]{3,6}$/.test(hex)) {
        console.warn(`Invalid hex color value from CSS variable: ${hex}`)
        return `rgba(0,0,0,${alpha})` // fallback seguro
    }
    let sanitized = hex.trim().replace("#", "");

    if (sanitized.length === 3) {
        // transforma "abc" em "aabbcc"
        sanitized = sanitized.split("").map(c => c + c).join("");
    }

    const bigint = parseInt(sanitized, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
