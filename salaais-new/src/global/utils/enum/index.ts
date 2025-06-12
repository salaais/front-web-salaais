
//criação de enums genéricos
export function makeEnum<T extends Record<string, unknown>>(def: T) {
    return {
        ...def,
        type: undefined as unknown as T[keyof T],
    } as const;
}
//COMO USAR:
//export const StartAnimation = makeEnum({
//   Hover: "hover",
//   HoverInfinite: "hover_infinite",
// })

//export automático
export type EnumType<E> = E extends { type: infer U } ? U : never;
//COMO USAR:
//startAnimation?: EnumType<typeof StartAnimation>;
