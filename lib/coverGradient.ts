export const getCoverGradient = (coverColor: string) =>
  `radial-gradient(circle at 50% 35%, color-mix(in srgb, ${coverColor} 55%, black) 0%, color-mix(in srgb, ${coverColor} 70%, black) 100%)`;