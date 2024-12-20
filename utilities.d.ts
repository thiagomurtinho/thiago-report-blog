/**
 * A utility type that creates a new type by copying all properties from the given type `T`.
 * This type is essentially a no-op and is used to enforce a consistent style or to trigger type evaluation.
 *
 * @template T - The type to be prettified.
 */
declare type Prettier<T> = {
  [K in keyof T]: T[K]
} & {}

/**
 * A utility type that recursively makes all properties of an object type required.
 *
 * @template T - The object type to be transformed.
 *
 * @remarks
 * This type uses TypeScript's mapped types and conditional types to traverse
 * through all properties of the given type `T` and make them required. If a property
 * is itself an object, the type recursively applies the same transformation to that property.
 *
 * @example
 * ```typescript
 * interface Example {
 *   a?: {
 *     b?: {
 *       c?: string;
 *     };
 *   };
 * }
 *
 * type RequiredExample = DeepRequired<Example>;
 * // Resulting type:
 * // {
 * //   a: {
 * //     b: {
 * //       c: string;
 * //     };
 * //   };
 * // }
 * ```
 */
declare type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K]
}

/**
 * Represents the type of the values of an object type `T`.
 *
 * @template T - The object type whose values' type is to be extracted.
 */
declare type ValueOf<T> = T[keyof T]

/**
 * Represents the keys of the given type `T`.
 *
 * @template T - The type whose keys are to be extracted.
 */
declare type KeyOf<T> = keyof T
