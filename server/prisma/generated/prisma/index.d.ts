
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model MoodEntry
 * 
 */
export type MoodEntry = $Result.DefaultSelection<Prisma.$MoodEntryPayload>
/**
 * Model Mood
 * 
 */
export type Mood = $Result.DefaultSelection<Prisma.$MoodPayload>
/**
 * Model SpotifyAccount
 * 
 */
export type SpotifyAccount = $Result.DefaultSelection<Prisma.$SpotifyAccountPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more MoodEntries
 * const moodEntries = await prisma.moodEntry.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more MoodEntries
   * const moodEntries = await prisma.moodEntry.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.moodEntry`: Exposes CRUD operations for the **MoodEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MoodEntries
    * const moodEntries = await prisma.moodEntry.findMany()
    * ```
    */
  get moodEntry(): Prisma.MoodEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mood`: Exposes CRUD operations for the **Mood** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Moods
    * const moods = await prisma.mood.findMany()
    * ```
    */
  get mood(): Prisma.MoodDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.spotifyAccount`: Exposes CRUD operations for the **SpotifyAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SpotifyAccounts
    * const spotifyAccounts = await prisma.spotifyAccount.findMany()
    * ```
    */
  get spotifyAccount(): Prisma.SpotifyAccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    MoodEntry: 'MoodEntry',
    Mood: 'Mood',
    SpotifyAccount: 'SpotifyAccount',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "moodEntry" | "mood" | "spotifyAccount" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      MoodEntry: {
        payload: Prisma.$MoodEntryPayload<ExtArgs>
        fields: Prisma.MoodEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MoodEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MoodEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          findFirst: {
            args: Prisma.MoodEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MoodEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          findMany: {
            args: Prisma.MoodEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>[]
          }
          create: {
            args: Prisma.MoodEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          createMany: {
            args: Prisma.MoodEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MoodEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>[]
          }
          delete: {
            args: Prisma.MoodEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          update: {
            args: Prisma.MoodEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          deleteMany: {
            args: Prisma.MoodEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MoodEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MoodEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>[]
          }
          upsert: {
            args: Prisma.MoodEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          aggregate: {
            args: Prisma.MoodEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMoodEntry>
          }
          groupBy: {
            args: Prisma.MoodEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<MoodEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.MoodEntryCountArgs<ExtArgs>
            result: $Utils.Optional<MoodEntryCountAggregateOutputType> | number
          }
        }
      }
      Mood: {
        payload: Prisma.$MoodPayload<ExtArgs>
        fields: Prisma.MoodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MoodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MoodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>
          }
          findFirst: {
            args: Prisma.MoodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MoodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>
          }
          findMany: {
            args: Prisma.MoodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>[]
          }
          create: {
            args: Prisma.MoodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>
          }
          createMany: {
            args: Prisma.MoodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MoodCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>[]
          }
          delete: {
            args: Prisma.MoodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>
          }
          update: {
            args: Prisma.MoodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>
          }
          deleteMany: {
            args: Prisma.MoodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MoodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MoodUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>[]
          }
          upsert: {
            args: Prisma.MoodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>
          }
          aggregate: {
            args: Prisma.MoodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMood>
          }
          groupBy: {
            args: Prisma.MoodGroupByArgs<ExtArgs>
            result: $Utils.Optional<MoodGroupByOutputType>[]
          }
          count: {
            args: Prisma.MoodCountArgs<ExtArgs>
            result: $Utils.Optional<MoodCountAggregateOutputType> | number
          }
        }
      }
      SpotifyAccount: {
        payload: Prisma.$SpotifyAccountPayload<ExtArgs>
        fields: Prisma.SpotifyAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpotifyAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotifyAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpotifyAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotifyAccountPayload>
          }
          findFirst: {
            args: Prisma.SpotifyAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotifyAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpotifyAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotifyAccountPayload>
          }
          findMany: {
            args: Prisma.SpotifyAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotifyAccountPayload>[]
          }
          create: {
            args: Prisma.SpotifyAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotifyAccountPayload>
          }
          createMany: {
            args: Prisma.SpotifyAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpotifyAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotifyAccountPayload>[]
          }
          delete: {
            args: Prisma.SpotifyAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotifyAccountPayload>
          }
          update: {
            args: Prisma.SpotifyAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotifyAccountPayload>
          }
          deleteMany: {
            args: Prisma.SpotifyAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpotifyAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SpotifyAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotifyAccountPayload>[]
          }
          upsert: {
            args: Prisma.SpotifyAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotifyAccountPayload>
          }
          aggregate: {
            args: Prisma.SpotifyAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpotifyAccount>
          }
          groupBy: {
            args: Prisma.SpotifyAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpotifyAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpotifyAccountCountArgs<ExtArgs>
            result: $Utils.Optional<SpotifyAccountCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    moodEntry?: MoodEntryOmit
    mood?: MoodOmit
    spotifyAccount?: SpotifyAccountOmit
    user?: UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    moodEntries: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    moodEntries?: boolean | UserCountOutputTypeCountMoodEntriesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMoodEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoodEntryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model MoodEntry
   */

  export type AggregateMoodEntry = {
    _count: MoodEntryCountAggregateOutputType | null
    _avg: MoodEntryAvgAggregateOutputType | null
    _sum: MoodEntrySumAggregateOutputType | null
    _min: MoodEntryMinAggregateOutputType | null
    _max: MoodEntryMaxAggregateOutputType | null
  }

  export type MoodEntryAvgAggregateOutputType = {
    mood: number | null
  }

  export type MoodEntrySumAggregateOutputType = {
    mood: number | null
  }

  export type MoodEntryMinAggregateOutputType = {
    id: string | null
    mood: number | null
    note: string | null
    aiEmotion: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type MoodEntryMaxAggregateOutputType = {
    id: string | null
    mood: number | null
    note: string | null
    aiEmotion: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type MoodEntryCountAggregateOutputType = {
    id: number
    mood: number
    note: number
    aiEmotion: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type MoodEntryAvgAggregateInputType = {
    mood?: true
  }

  export type MoodEntrySumAggregateInputType = {
    mood?: true
  }

  export type MoodEntryMinAggregateInputType = {
    id?: true
    mood?: true
    note?: true
    aiEmotion?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type MoodEntryMaxAggregateInputType = {
    id?: true
    mood?: true
    note?: true
    aiEmotion?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type MoodEntryCountAggregateInputType = {
    id?: true
    mood?: true
    note?: true
    aiEmotion?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type MoodEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MoodEntry to aggregate.
     */
    where?: MoodEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodEntries to fetch.
     */
    orderBy?: MoodEntryOrderByWithRelationInput | MoodEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MoodEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MoodEntries
    **/
    _count?: true | MoodEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MoodEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MoodEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MoodEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MoodEntryMaxAggregateInputType
  }

  export type GetMoodEntryAggregateType<T extends MoodEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateMoodEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMoodEntry[P]>
      : GetScalarType<T[P], AggregateMoodEntry[P]>
  }




  export type MoodEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoodEntryWhereInput
    orderBy?: MoodEntryOrderByWithAggregationInput | MoodEntryOrderByWithAggregationInput[]
    by: MoodEntryScalarFieldEnum[] | MoodEntryScalarFieldEnum
    having?: MoodEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MoodEntryCountAggregateInputType | true
    _avg?: MoodEntryAvgAggregateInputType
    _sum?: MoodEntrySumAggregateInputType
    _min?: MoodEntryMinAggregateInputType
    _max?: MoodEntryMaxAggregateInputType
  }

  export type MoodEntryGroupByOutputType = {
    id: string
    mood: number
    note: string | null
    aiEmotion: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: MoodEntryCountAggregateOutputType | null
    _avg: MoodEntryAvgAggregateOutputType | null
    _sum: MoodEntrySumAggregateOutputType | null
    _min: MoodEntryMinAggregateOutputType | null
    _max: MoodEntryMaxAggregateOutputType | null
  }

  type GetMoodEntryGroupByPayload<T extends MoodEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MoodEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MoodEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MoodEntryGroupByOutputType[P]>
            : GetScalarType<T[P], MoodEntryGroupByOutputType[P]>
        }
      >
    >


  export type MoodEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mood?: boolean
    note?: boolean
    aiEmotion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moodEntry"]>

  export type MoodEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mood?: boolean
    note?: boolean
    aiEmotion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moodEntry"]>

  export type MoodEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mood?: boolean
    note?: boolean
    aiEmotion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moodEntry"]>

  export type MoodEntrySelectScalar = {
    id?: boolean
    mood?: boolean
    note?: boolean
    aiEmotion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type MoodEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mood" | "note" | "aiEmotion" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["moodEntry"]>
  export type MoodEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MoodEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MoodEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MoodEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MoodEntry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mood: number
      note: string | null
      aiEmotion: string | null
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["moodEntry"]>
    composites: {}
  }

  type MoodEntryGetPayload<S extends boolean | null | undefined | MoodEntryDefaultArgs> = $Result.GetResult<Prisma.$MoodEntryPayload, S>

  type MoodEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MoodEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MoodEntryCountAggregateInputType | true
    }

  export interface MoodEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MoodEntry'], meta: { name: 'MoodEntry' } }
    /**
     * Find zero or one MoodEntry that matches the filter.
     * @param {MoodEntryFindUniqueArgs} args - Arguments to find a MoodEntry
     * @example
     * // Get one MoodEntry
     * const moodEntry = await prisma.moodEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MoodEntryFindUniqueArgs>(args: SelectSubset<T, MoodEntryFindUniqueArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MoodEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MoodEntryFindUniqueOrThrowArgs} args - Arguments to find a MoodEntry
     * @example
     * // Get one MoodEntry
     * const moodEntry = await prisma.moodEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MoodEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, MoodEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MoodEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryFindFirstArgs} args - Arguments to find a MoodEntry
     * @example
     * // Get one MoodEntry
     * const moodEntry = await prisma.moodEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MoodEntryFindFirstArgs>(args?: SelectSubset<T, MoodEntryFindFirstArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MoodEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryFindFirstOrThrowArgs} args - Arguments to find a MoodEntry
     * @example
     * // Get one MoodEntry
     * const moodEntry = await prisma.moodEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MoodEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, MoodEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MoodEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MoodEntries
     * const moodEntries = await prisma.moodEntry.findMany()
     * 
     * // Get first 10 MoodEntries
     * const moodEntries = await prisma.moodEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moodEntryWithIdOnly = await prisma.moodEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MoodEntryFindManyArgs>(args?: SelectSubset<T, MoodEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MoodEntry.
     * @param {MoodEntryCreateArgs} args - Arguments to create a MoodEntry.
     * @example
     * // Create one MoodEntry
     * const MoodEntry = await prisma.moodEntry.create({
     *   data: {
     *     // ... data to create a MoodEntry
     *   }
     * })
     * 
     */
    create<T extends MoodEntryCreateArgs>(args: SelectSubset<T, MoodEntryCreateArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MoodEntries.
     * @param {MoodEntryCreateManyArgs} args - Arguments to create many MoodEntries.
     * @example
     * // Create many MoodEntries
     * const moodEntry = await prisma.moodEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MoodEntryCreateManyArgs>(args?: SelectSubset<T, MoodEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MoodEntries and returns the data saved in the database.
     * @param {MoodEntryCreateManyAndReturnArgs} args - Arguments to create many MoodEntries.
     * @example
     * // Create many MoodEntries
     * const moodEntry = await prisma.moodEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MoodEntries and only return the `id`
     * const moodEntryWithIdOnly = await prisma.moodEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MoodEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, MoodEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MoodEntry.
     * @param {MoodEntryDeleteArgs} args - Arguments to delete one MoodEntry.
     * @example
     * // Delete one MoodEntry
     * const MoodEntry = await prisma.moodEntry.delete({
     *   where: {
     *     // ... filter to delete one MoodEntry
     *   }
     * })
     * 
     */
    delete<T extends MoodEntryDeleteArgs>(args: SelectSubset<T, MoodEntryDeleteArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MoodEntry.
     * @param {MoodEntryUpdateArgs} args - Arguments to update one MoodEntry.
     * @example
     * // Update one MoodEntry
     * const moodEntry = await prisma.moodEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MoodEntryUpdateArgs>(args: SelectSubset<T, MoodEntryUpdateArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MoodEntries.
     * @param {MoodEntryDeleteManyArgs} args - Arguments to filter MoodEntries to delete.
     * @example
     * // Delete a few MoodEntries
     * const { count } = await prisma.moodEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MoodEntryDeleteManyArgs>(args?: SelectSubset<T, MoodEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MoodEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MoodEntries
     * const moodEntry = await prisma.moodEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MoodEntryUpdateManyArgs>(args: SelectSubset<T, MoodEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MoodEntries and returns the data updated in the database.
     * @param {MoodEntryUpdateManyAndReturnArgs} args - Arguments to update many MoodEntries.
     * @example
     * // Update many MoodEntries
     * const moodEntry = await prisma.moodEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MoodEntries and only return the `id`
     * const moodEntryWithIdOnly = await prisma.moodEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MoodEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, MoodEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MoodEntry.
     * @param {MoodEntryUpsertArgs} args - Arguments to update or create a MoodEntry.
     * @example
     * // Update or create a MoodEntry
     * const moodEntry = await prisma.moodEntry.upsert({
     *   create: {
     *     // ... data to create a MoodEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MoodEntry we want to update
     *   }
     * })
     */
    upsert<T extends MoodEntryUpsertArgs>(args: SelectSubset<T, MoodEntryUpsertArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MoodEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryCountArgs} args - Arguments to filter MoodEntries to count.
     * @example
     * // Count the number of MoodEntries
     * const count = await prisma.moodEntry.count({
     *   where: {
     *     // ... the filter for the MoodEntries we want to count
     *   }
     * })
    **/
    count<T extends MoodEntryCountArgs>(
      args?: Subset<T, MoodEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MoodEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MoodEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MoodEntryAggregateArgs>(args: Subset<T, MoodEntryAggregateArgs>): Prisma.PrismaPromise<GetMoodEntryAggregateType<T>>

    /**
     * Group by MoodEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MoodEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MoodEntryGroupByArgs['orderBy'] }
        : { orderBy?: MoodEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MoodEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMoodEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MoodEntry model
   */
  readonly fields: MoodEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MoodEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MoodEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MoodEntry model
   */
  interface MoodEntryFieldRefs {
    readonly id: FieldRef<"MoodEntry", 'String'>
    readonly mood: FieldRef<"MoodEntry", 'Int'>
    readonly note: FieldRef<"MoodEntry", 'String'>
    readonly aiEmotion: FieldRef<"MoodEntry", 'String'>
    readonly createdAt: FieldRef<"MoodEntry", 'DateTime'>
    readonly updatedAt: FieldRef<"MoodEntry", 'DateTime'>
    readonly userId: FieldRef<"MoodEntry", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MoodEntry findUnique
   */
  export type MoodEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * Filter, which MoodEntry to fetch.
     */
    where: MoodEntryWhereUniqueInput
  }

  /**
   * MoodEntry findUniqueOrThrow
   */
  export type MoodEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * Filter, which MoodEntry to fetch.
     */
    where: MoodEntryWhereUniqueInput
  }

  /**
   * MoodEntry findFirst
   */
  export type MoodEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * Filter, which MoodEntry to fetch.
     */
    where?: MoodEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodEntries to fetch.
     */
    orderBy?: MoodEntryOrderByWithRelationInput | MoodEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MoodEntries.
     */
    cursor?: MoodEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MoodEntries.
     */
    distinct?: MoodEntryScalarFieldEnum | MoodEntryScalarFieldEnum[]
  }

  /**
   * MoodEntry findFirstOrThrow
   */
  export type MoodEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * Filter, which MoodEntry to fetch.
     */
    where?: MoodEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodEntries to fetch.
     */
    orderBy?: MoodEntryOrderByWithRelationInput | MoodEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MoodEntries.
     */
    cursor?: MoodEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MoodEntries.
     */
    distinct?: MoodEntryScalarFieldEnum | MoodEntryScalarFieldEnum[]
  }

  /**
   * MoodEntry findMany
   */
  export type MoodEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * Filter, which MoodEntries to fetch.
     */
    where?: MoodEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodEntries to fetch.
     */
    orderBy?: MoodEntryOrderByWithRelationInput | MoodEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MoodEntries.
     */
    cursor?: MoodEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MoodEntries.
     */
    distinct?: MoodEntryScalarFieldEnum | MoodEntryScalarFieldEnum[]
  }

  /**
   * MoodEntry create
   */
  export type MoodEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a MoodEntry.
     */
    data: XOR<MoodEntryCreateInput, MoodEntryUncheckedCreateInput>
  }

  /**
   * MoodEntry createMany
   */
  export type MoodEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MoodEntries.
     */
    data: MoodEntryCreateManyInput | MoodEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MoodEntry createManyAndReturn
   */
  export type MoodEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * The data used to create many MoodEntries.
     */
    data: MoodEntryCreateManyInput | MoodEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MoodEntry update
   */
  export type MoodEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a MoodEntry.
     */
    data: XOR<MoodEntryUpdateInput, MoodEntryUncheckedUpdateInput>
    /**
     * Choose, which MoodEntry to update.
     */
    where: MoodEntryWhereUniqueInput
  }

  /**
   * MoodEntry updateMany
   */
  export type MoodEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MoodEntries.
     */
    data: XOR<MoodEntryUpdateManyMutationInput, MoodEntryUncheckedUpdateManyInput>
    /**
     * Filter which MoodEntries to update
     */
    where?: MoodEntryWhereInput
    /**
     * Limit how many MoodEntries to update.
     */
    limit?: number
  }

  /**
   * MoodEntry updateManyAndReturn
   */
  export type MoodEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * The data used to update MoodEntries.
     */
    data: XOR<MoodEntryUpdateManyMutationInput, MoodEntryUncheckedUpdateManyInput>
    /**
     * Filter which MoodEntries to update
     */
    where?: MoodEntryWhereInput
    /**
     * Limit how many MoodEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MoodEntry upsert
   */
  export type MoodEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the MoodEntry to update in case it exists.
     */
    where: MoodEntryWhereUniqueInput
    /**
     * In case the MoodEntry found by the `where` argument doesn't exist, create a new MoodEntry with this data.
     */
    create: XOR<MoodEntryCreateInput, MoodEntryUncheckedCreateInput>
    /**
     * In case the MoodEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MoodEntryUpdateInput, MoodEntryUncheckedUpdateInput>
  }

  /**
   * MoodEntry delete
   */
  export type MoodEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * Filter which MoodEntry to delete.
     */
    where: MoodEntryWhereUniqueInput
  }

  /**
   * MoodEntry deleteMany
   */
  export type MoodEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MoodEntries to delete
     */
    where?: MoodEntryWhereInput
    /**
     * Limit how many MoodEntries to delete.
     */
    limit?: number
  }

  /**
   * MoodEntry without action
   */
  export type MoodEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
  }


  /**
   * Model Mood
   */

  export type AggregateMood = {
    _count: MoodCountAggregateOutputType | null
    _avg: MoodAvgAggregateOutputType | null
    _sum: MoodSumAggregateOutputType | null
    _min: MoodMinAggregateOutputType | null
    _max: MoodMaxAggregateOutputType | null
  }

  export type MoodAvgAggregateOutputType = {
    value: number | null
  }

  export type MoodSumAggregateOutputType = {
    value: number | null
  }

  export type MoodMinAggregateOutputType = {
    id: string | null
    value: number | null
    token: string | null
    emoji: string | null
    label: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MoodMaxAggregateOutputType = {
    id: string | null
    value: number | null
    token: string | null
    emoji: string | null
    label: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MoodCountAggregateOutputType = {
    id: number
    value: number
    token: number
    emoji: number
    label: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MoodAvgAggregateInputType = {
    value?: true
  }

  export type MoodSumAggregateInputType = {
    value?: true
  }

  export type MoodMinAggregateInputType = {
    id?: true
    value?: true
    token?: true
    emoji?: true
    label?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MoodMaxAggregateInputType = {
    id?: true
    value?: true
    token?: true
    emoji?: true
    label?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MoodCountAggregateInputType = {
    id?: true
    value?: true
    token?: true
    emoji?: true
    label?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MoodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mood to aggregate.
     */
    where?: MoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moods to fetch.
     */
    orderBy?: MoodOrderByWithRelationInput | MoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Moods
    **/
    _count?: true | MoodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MoodAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MoodSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MoodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MoodMaxAggregateInputType
  }

  export type GetMoodAggregateType<T extends MoodAggregateArgs> = {
        [P in keyof T & keyof AggregateMood]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMood[P]>
      : GetScalarType<T[P], AggregateMood[P]>
  }




  export type MoodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoodWhereInput
    orderBy?: MoodOrderByWithAggregationInput | MoodOrderByWithAggregationInput[]
    by: MoodScalarFieldEnum[] | MoodScalarFieldEnum
    having?: MoodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MoodCountAggregateInputType | true
    _avg?: MoodAvgAggregateInputType
    _sum?: MoodSumAggregateInputType
    _min?: MoodMinAggregateInputType
    _max?: MoodMaxAggregateInputType
  }

  export type MoodGroupByOutputType = {
    id: string
    value: number
    token: string
    emoji: string
    label: string
    createdAt: Date
    updatedAt: Date
    _count: MoodCountAggregateOutputType | null
    _avg: MoodAvgAggregateOutputType | null
    _sum: MoodSumAggregateOutputType | null
    _min: MoodMinAggregateOutputType | null
    _max: MoodMaxAggregateOutputType | null
  }

  type GetMoodGroupByPayload<T extends MoodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MoodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MoodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MoodGroupByOutputType[P]>
            : GetScalarType<T[P], MoodGroupByOutputType[P]>
        }
      >
    >


  export type MoodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    token?: boolean
    emoji?: boolean
    label?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mood"]>

  export type MoodSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    token?: boolean
    emoji?: boolean
    label?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mood"]>

  export type MoodSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    token?: boolean
    emoji?: boolean
    label?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mood"]>

  export type MoodSelectScalar = {
    id?: boolean
    value?: boolean
    token?: boolean
    emoji?: boolean
    label?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MoodOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "value" | "token" | "emoji" | "label" | "createdAt" | "updatedAt", ExtArgs["result"]["mood"]>

  export type $MoodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mood"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      value: number
      token: string
      emoji: string
      label: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mood"]>
    composites: {}
  }

  type MoodGetPayload<S extends boolean | null | undefined | MoodDefaultArgs> = $Result.GetResult<Prisma.$MoodPayload, S>

  type MoodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MoodFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MoodCountAggregateInputType | true
    }

  export interface MoodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mood'], meta: { name: 'Mood' } }
    /**
     * Find zero or one Mood that matches the filter.
     * @param {MoodFindUniqueArgs} args - Arguments to find a Mood
     * @example
     * // Get one Mood
     * const mood = await prisma.mood.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MoodFindUniqueArgs>(args: SelectSubset<T, MoodFindUniqueArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mood that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MoodFindUniqueOrThrowArgs} args - Arguments to find a Mood
     * @example
     * // Get one Mood
     * const mood = await prisma.mood.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MoodFindUniqueOrThrowArgs>(args: SelectSubset<T, MoodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mood that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodFindFirstArgs} args - Arguments to find a Mood
     * @example
     * // Get one Mood
     * const mood = await prisma.mood.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MoodFindFirstArgs>(args?: SelectSubset<T, MoodFindFirstArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mood that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodFindFirstOrThrowArgs} args - Arguments to find a Mood
     * @example
     * // Get one Mood
     * const mood = await prisma.mood.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MoodFindFirstOrThrowArgs>(args?: SelectSubset<T, MoodFindFirstOrThrowArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Moods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Moods
     * const moods = await prisma.mood.findMany()
     * 
     * // Get first 10 Moods
     * const moods = await prisma.mood.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moodWithIdOnly = await prisma.mood.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MoodFindManyArgs>(args?: SelectSubset<T, MoodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mood.
     * @param {MoodCreateArgs} args - Arguments to create a Mood.
     * @example
     * // Create one Mood
     * const Mood = await prisma.mood.create({
     *   data: {
     *     // ... data to create a Mood
     *   }
     * })
     * 
     */
    create<T extends MoodCreateArgs>(args: SelectSubset<T, MoodCreateArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Moods.
     * @param {MoodCreateManyArgs} args - Arguments to create many Moods.
     * @example
     * // Create many Moods
     * const mood = await prisma.mood.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MoodCreateManyArgs>(args?: SelectSubset<T, MoodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Moods and returns the data saved in the database.
     * @param {MoodCreateManyAndReturnArgs} args - Arguments to create many Moods.
     * @example
     * // Create many Moods
     * const mood = await prisma.mood.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Moods and only return the `id`
     * const moodWithIdOnly = await prisma.mood.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MoodCreateManyAndReturnArgs>(args?: SelectSubset<T, MoodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mood.
     * @param {MoodDeleteArgs} args - Arguments to delete one Mood.
     * @example
     * // Delete one Mood
     * const Mood = await prisma.mood.delete({
     *   where: {
     *     // ... filter to delete one Mood
     *   }
     * })
     * 
     */
    delete<T extends MoodDeleteArgs>(args: SelectSubset<T, MoodDeleteArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mood.
     * @param {MoodUpdateArgs} args - Arguments to update one Mood.
     * @example
     * // Update one Mood
     * const mood = await prisma.mood.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MoodUpdateArgs>(args: SelectSubset<T, MoodUpdateArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Moods.
     * @param {MoodDeleteManyArgs} args - Arguments to filter Moods to delete.
     * @example
     * // Delete a few Moods
     * const { count } = await prisma.mood.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MoodDeleteManyArgs>(args?: SelectSubset<T, MoodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Moods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Moods
     * const mood = await prisma.mood.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MoodUpdateManyArgs>(args: SelectSubset<T, MoodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Moods and returns the data updated in the database.
     * @param {MoodUpdateManyAndReturnArgs} args - Arguments to update many Moods.
     * @example
     * // Update many Moods
     * const mood = await prisma.mood.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Moods and only return the `id`
     * const moodWithIdOnly = await prisma.mood.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MoodUpdateManyAndReturnArgs>(args: SelectSubset<T, MoodUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mood.
     * @param {MoodUpsertArgs} args - Arguments to update or create a Mood.
     * @example
     * // Update or create a Mood
     * const mood = await prisma.mood.upsert({
     *   create: {
     *     // ... data to create a Mood
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mood we want to update
     *   }
     * })
     */
    upsert<T extends MoodUpsertArgs>(args: SelectSubset<T, MoodUpsertArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Moods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodCountArgs} args - Arguments to filter Moods to count.
     * @example
     * // Count the number of Moods
     * const count = await prisma.mood.count({
     *   where: {
     *     // ... the filter for the Moods we want to count
     *   }
     * })
    **/
    count<T extends MoodCountArgs>(
      args?: Subset<T, MoodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MoodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mood.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MoodAggregateArgs>(args: Subset<T, MoodAggregateArgs>): Prisma.PrismaPromise<GetMoodAggregateType<T>>

    /**
     * Group by Mood.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MoodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MoodGroupByArgs['orderBy'] }
        : { orderBy?: MoodGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MoodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMoodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mood model
   */
  readonly fields: MoodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mood.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MoodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mood model
   */
  interface MoodFieldRefs {
    readonly id: FieldRef<"Mood", 'String'>
    readonly value: FieldRef<"Mood", 'Int'>
    readonly token: FieldRef<"Mood", 'String'>
    readonly emoji: FieldRef<"Mood", 'String'>
    readonly label: FieldRef<"Mood", 'String'>
    readonly createdAt: FieldRef<"Mood", 'DateTime'>
    readonly updatedAt: FieldRef<"Mood", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mood findUnique
   */
  export type MoodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * Filter, which Mood to fetch.
     */
    where: MoodWhereUniqueInput
  }

  /**
   * Mood findUniqueOrThrow
   */
  export type MoodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * Filter, which Mood to fetch.
     */
    where: MoodWhereUniqueInput
  }

  /**
   * Mood findFirst
   */
  export type MoodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * Filter, which Mood to fetch.
     */
    where?: MoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moods to fetch.
     */
    orderBy?: MoodOrderByWithRelationInput | MoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Moods.
     */
    cursor?: MoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Moods.
     */
    distinct?: MoodScalarFieldEnum | MoodScalarFieldEnum[]
  }

  /**
   * Mood findFirstOrThrow
   */
  export type MoodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * Filter, which Mood to fetch.
     */
    where?: MoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moods to fetch.
     */
    orderBy?: MoodOrderByWithRelationInput | MoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Moods.
     */
    cursor?: MoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Moods.
     */
    distinct?: MoodScalarFieldEnum | MoodScalarFieldEnum[]
  }

  /**
   * Mood findMany
   */
  export type MoodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * Filter, which Moods to fetch.
     */
    where?: MoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moods to fetch.
     */
    orderBy?: MoodOrderByWithRelationInput | MoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Moods.
     */
    cursor?: MoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Moods.
     */
    distinct?: MoodScalarFieldEnum | MoodScalarFieldEnum[]
  }

  /**
   * Mood create
   */
  export type MoodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * The data needed to create a Mood.
     */
    data: XOR<MoodCreateInput, MoodUncheckedCreateInput>
  }

  /**
   * Mood createMany
   */
  export type MoodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Moods.
     */
    data: MoodCreateManyInput | MoodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mood createManyAndReturn
   */
  export type MoodCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * The data used to create many Moods.
     */
    data: MoodCreateManyInput | MoodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mood update
   */
  export type MoodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * The data needed to update a Mood.
     */
    data: XOR<MoodUpdateInput, MoodUncheckedUpdateInput>
    /**
     * Choose, which Mood to update.
     */
    where: MoodWhereUniqueInput
  }

  /**
   * Mood updateMany
   */
  export type MoodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Moods.
     */
    data: XOR<MoodUpdateManyMutationInput, MoodUncheckedUpdateManyInput>
    /**
     * Filter which Moods to update
     */
    where?: MoodWhereInput
    /**
     * Limit how many Moods to update.
     */
    limit?: number
  }

  /**
   * Mood updateManyAndReturn
   */
  export type MoodUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * The data used to update Moods.
     */
    data: XOR<MoodUpdateManyMutationInput, MoodUncheckedUpdateManyInput>
    /**
     * Filter which Moods to update
     */
    where?: MoodWhereInput
    /**
     * Limit how many Moods to update.
     */
    limit?: number
  }

  /**
   * Mood upsert
   */
  export type MoodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * The filter to search for the Mood to update in case it exists.
     */
    where: MoodWhereUniqueInput
    /**
     * In case the Mood found by the `where` argument doesn't exist, create a new Mood with this data.
     */
    create: XOR<MoodCreateInput, MoodUncheckedCreateInput>
    /**
     * In case the Mood was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MoodUpdateInput, MoodUncheckedUpdateInput>
  }

  /**
   * Mood delete
   */
  export type MoodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * Filter which Mood to delete.
     */
    where: MoodWhereUniqueInput
  }

  /**
   * Mood deleteMany
   */
  export type MoodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Moods to delete
     */
    where?: MoodWhereInput
    /**
     * Limit how many Moods to delete.
     */
    limit?: number
  }

  /**
   * Mood without action
   */
  export type MoodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
  }


  /**
   * Model SpotifyAccount
   */

  export type AggregateSpotifyAccount = {
    _count: SpotifyAccountCountAggregateOutputType | null
    _min: SpotifyAccountMinAggregateOutputType | null
    _max: SpotifyAccountMaxAggregateOutputType | null
  }

  export type SpotifyAccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    spotifyId: string | null
    accessToken: string | null
    refreshToken: string | null
    expiresAt: Date | null
    scope: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpotifyAccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    spotifyId: string | null
    accessToken: string | null
    refreshToken: string | null
    expiresAt: Date | null
    scope: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpotifyAccountCountAggregateOutputType = {
    id: number
    userId: number
    spotifyId: number
    accessToken: number
    refreshToken: number
    expiresAt: number
    scope: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SpotifyAccountMinAggregateInputType = {
    id?: true
    userId?: true
    spotifyId?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    scope?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpotifyAccountMaxAggregateInputType = {
    id?: true
    userId?: true
    spotifyId?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    scope?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpotifyAccountCountAggregateInputType = {
    id?: true
    userId?: true
    spotifyId?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    scope?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SpotifyAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SpotifyAccount to aggregate.
     */
    where?: SpotifyAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpotifyAccounts to fetch.
     */
    orderBy?: SpotifyAccountOrderByWithRelationInput | SpotifyAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpotifyAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpotifyAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpotifyAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SpotifyAccounts
    **/
    _count?: true | SpotifyAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpotifyAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpotifyAccountMaxAggregateInputType
  }

  export type GetSpotifyAccountAggregateType<T extends SpotifyAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateSpotifyAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpotifyAccount[P]>
      : GetScalarType<T[P], AggregateSpotifyAccount[P]>
  }




  export type SpotifyAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpotifyAccountWhereInput
    orderBy?: SpotifyAccountOrderByWithAggregationInput | SpotifyAccountOrderByWithAggregationInput[]
    by: SpotifyAccountScalarFieldEnum[] | SpotifyAccountScalarFieldEnum
    having?: SpotifyAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpotifyAccountCountAggregateInputType | true
    _min?: SpotifyAccountMinAggregateInputType
    _max?: SpotifyAccountMaxAggregateInputType
  }

  export type SpotifyAccountGroupByOutputType = {
    id: string
    userId: string
    spotifyId: string
    accessToken: string
    refreshToken: string
    expiresAt: Date
    scope: string
    createdAt: Date
    updatedAt: Date
    _count: SpotifyAccountCountAggregateOutputType | null
    _min: SpotifyAccountMinAggregateOutputType | null
    _max: SpotifyAccountMaxAggregateOutputType | null
  }

  type GetSpotifyAccountGroupByPayload<T extends SpotifyAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpotifyAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpotifyAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpotifyAccountGroupByOutputType[P]>
            : GetScalarType<T[P], SpotifyAccountGroupByOutputType[P]>
        }
      >
    >


  export type SpotifyAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    spotifyId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    scope?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spotifyAccount"]>

  export type SpotifyAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    spotifyId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    scope?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spotifyAccount"]>

  export type SpotifyAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    spotifyId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    scope?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spotifyAccount"]>

  export type SpotifyAccountSelectScalar = {
    id?: boolean
    userId?: boolean
    spotifyId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    scope?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SpotifyAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "spotifyId" | "accessToken" | "refreshToken" | "expiresAt" | "scope" | "createdAt" | "updatedAt", ExtArgs["result"]["spotifyAccount"]>
  export type SpotifyAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SpotifyAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SpotifyAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SpotifyAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SpotifyAccount"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      spotifyId: string
      accessToken: string
      refreshToken: string
      expiresAt: Date
      scope: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["spotifyAccount"]>
    composites: {}
  }

  type SpotifyAccountGetPayload<S extends boolean | null | undefined | SpotifyAccountDefaultArgs> = $Result.GetResult<Prisma.$SpotifyAccountPayload, S>

  type SpotifyAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SpotifyAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpotifyAccountCountAggregateInputType | true
    }

  export interface SpotifyAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SpotifyAccount'], meta: { name: 'SpotifyAccount' } }
    /**
     * Find zero or one SpotifyAccount that matches the filter.
     * @param {SpotifyAccountFindUniqueArgs} args - Arguments to find a SpotifyAccount
     * @example
     * // Get one SpotifyAccount
     * const spotifyAccount = await prisma.spotifyAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpotifyAccountFindUniqueArgs>(args: SelectSubset<T, SpotifyAccountFindUniqueArgs<ExtArgs>>): Prisma__SpotifyAccountClient<$Result.GetResult<Prisma.$SpotifyAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SpotifyAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SpotifyAccountFindUniqueOrThrowArgs} args - Arguments to find a SpotifyAccount
     * @example
     * // Get one SpotifyAccount
     * const spotifyAccount = await prisma.spotifyAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpotifyAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, SpotifyAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpotifyAccountClient<$Result.GetResult<Prisma.$SpotifyAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SpotifyAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpotifyAccountFindFirstArgs} args - Arguments to find a SpotifyAccount
     * @example
     * // Get one SpotifyAccount
     * const spotifyAccount = await prisma.spotifyAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpotifyAccountFindFirstArgs>(args?: SelectSubset<T, SpotifyAccountFindFirstArgs<ExtArgs>>): Prisma__SpotifyAccountClient<$Result.GetResult<Prisma.$SpotifyAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SpotifyAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpotifyAccountFindFirstOrThrowArgs} args - Arguments to find a SpotifyAccount
     * @example
     * // Get one SpotifyAccount
     * const spotifyAccount = await prisma.spotifyAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpotifyAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, SpotifyAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpotifyAccountClient<$Result.GetResult<Prisma.$SpotifyAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SpotifyAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpotifyAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SpotifyAccounts
     * const spotifyAccounts = await prisma.spotifyAccount.findMany()
     * 
     * // Get first 10 SpotifyAccounts
     * const spotifyAccounts = await prisma.spotifyAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spotifyAccountWithIdOnly = await prisma.spotifyAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpotifyAccountFindManyArgs>(args?: SelectSubset<T, SpotifyAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpotifyAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SpotifyAccount.
     * @param {SpotifyAccountCreateArgs} args - Arguments to create a SpotifyAccount.
     * @example
     * // Create one SpotifyAccount
     * const SpotifyAccount = await prisma.spotifyAccount.create({
     *   data: {
     *     // ... data to create a SpotifyAccount
     *   }
     * })
     * 
     */
    create<T extends SpotifyAccountCreateArgs>(args: SelectSubset<T, SpotifyAccountCreateArgs<ExtArgs>>): Prisma__SpotifyAccountClient<$Result.GetResult<Prisma.$SpotifyAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SpotifyAccounts.
     * @param {SpotifyAccountCreateManyArgs} args - Arguments to create many SpotifyAccounts.
     * @example
     * // Create many SpotifyAccounts
     * const spotifyAccount = await prisma.spotifyAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpotifyAccountCreateManyArgs>(args?: SelectSubset<T, SpotifyAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SpotifyAccounts and returns the data saved in the database.
     * @param {SpotifyAccountCreateManyAndReturnArgs} args - Arguments to create many SpotifyAccounts.
     * @example
     * // Create many SpotifyAccounts
     * const spotifyAccount = await prisma.spotifyAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SpotifyAccounts and only return the `id`
     * const spotifyAccountWithIdOnly = await prisma.spotifyAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpotifyAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, SpotifyAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpotifyAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SpotifyAccount.
     * @param {SpotifyAccountDeleteArgs} args - Arguments to delete one SpotifyAccount.
     * @example
     * // Delete one SpotifyAccount
     * const SpotifyAccount = await prisma.spotifyAccount.delete({
     *   where: {
     *     // ... filter to delete one SpotifyAccount
     *   }
     * })
     * 
     */
    delete<T extends SpotifyAccountDeleteArgs>(args: SelectSubset<T, SpotifyAccountDeleteArgs<ExtArgs>>): Prisma__SpotifyAccountClient<$Result.GetResult<Prisma.$SpotifyAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SpotifyAccount.
     * @param {SpotifyAccountUpdateArgs} args - Arguments to update one SpotifyAccount.
     * @example
     * // Update one SpotifyAccount
     * const spotifyAccount = await prisma.spotifyAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpotifyAccountUpdateArgs>(args: SelectSubset<T, SpotifyAccountUpdateArgs<ExtArgs>>): Prisma__SpotifyAccountClient<$Result.GetResult<Prisma.$SpotifyAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SpotifyAccounts.
     * @param {SpotifyAccountDeleteManyArgs} args - Arguments to filter SpotifyAccounts to delete.
     * @example
     * // Delete a few SpotifyAccounts
     * const { count } = await prisma.spotifyAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpotifyAccountDeleteManyArgs>(args?: SelectSubset<T, SpotifyAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SpotifyAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpotifyAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SpotifyAccounts
     * const spotifyAccount = await prisma.spotifyAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpotifyAccountUpdateManyArgs>(args: SelectSubset<T, SpotifyAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SpotifyAccounts and returns the data updated in the database.
     * @param {SpotifyAccountUpdateManyAndReturnArgs} args - Arguments to update many SpotifyAccounts.
     * @example
     * // Update many SpotifyAccounts
     * const spotifyAccount = await prisma.spotifyAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SpotifyAccounts and only return the `id`
     * const spotifyAccountWithIdOnly = await prisma.spotifyAccount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SpotifyAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, SpotifyAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpotifyAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SpotifyAccount.
     * @param {SpotifyAccountUpsertArgs} args - Arguments to update or create a SpotifyAccount.
     * @example
     * // Update or create a SpotifyAccount
     * const spotifyAccount = await prisma.spotifyAccount.upsert({
     *   create: {
     *     // ... data to create a SpotifyAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SpotifyAccount we want to update
     *   }
     * })
     */
    upsert<T extends SpotifyAccountUpsertArgs>(args: SelectSubset<T, SpotifyAccountUpsertArgs<ExtArgs>>): Prisma__SpotifyAccountClient<$Result.GetResult<Prisma.$SpotifyAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SpotifyAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpotifyAccountCountArgs} args - Arguments to filter SpotifyAccounts to count.
     * @example
     * // Count the number of SpotifyAccounts
     * const count = await prisma.spotifyAccount.count({
     *   where: {
     *     // ... the filter for the SpotifyAccounts we want to count
     *   }
     * })
    **/
    count<T extends SpotifyAccountCountArgs>(
      args?: Subset<T, SpotifyAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpotifyAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SpotifyAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpotifyAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpotifyAccountAggregateArgs>(args: Subset<T, SpotifyAccountAggregateArgs>): Prisma.PrismaPromise<GetSpotifyAccountAggregateType<T>>

    /**
     * Group by SpotifyAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpotifyAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpotifyAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpotifyAccountGroupByArgs['orderBy'] }
        : { orderBy?: SpotifyAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpotifyAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpotifyAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SpotifyAccount model
   */
  readonly fields: SpotifyAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SpotifyAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpotifyAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SpotifyAccount model
   */
  interface SpotifyAccountFieldRefs {
    readonly id: FieldRef<"SpotifyAccount", 'String'>
    readonly userId: FieldRef<"SpotifyAccount", 'String'>
    readonly spotifyId: FieldRef<"SpotifyAccount", 'String'>
    readonly accessToken: FieldRef<"SpotifyAccount", 'String'>
    readonly refreshToken: FieldRef<"SpotifyAccount", 'String'>
    readonly expiresAt: FieldRef<"SpotifyAccount", 'DateTime'>
    readonly scope: FieldRef<"SpotifyAccount", 'String'>
    readonly createdAt: FieldRef<"SpotifyAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"SpotifyAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SpotifyAccount findUnique
   */
  export type SpotifyAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpotifyAccount
     */
    select?: SpotifyAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpotifyAccount
     */
    omit?: SpotifyAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpotifyAccountInclude<ExtArgs> | null
    /**
     * Filter, which SpotifyAccount to fetch.
     */
    where: SpotifyAccountWhereUniqueInput
  }

  /**
   * SpotifyAccount findUniqueOrThrow
   */
  export type SpotifyAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpotifyAccount
     */
    select?: SpotifyAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpotifyAccount
     */
    omit?: SpotifyAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpotifyAccountInclude<ExtArgs> | null
    /**
     * Filter, which SpotifyAccount to fetch.
     */
    where: SpotifyAccountWhereUniqueInput
  }

  /**
   * SpotifyAccount findFirst
   */
  export type SpotifyAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpotifyAccount
     */
    select?: SpotifyAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpotifyAccount
     */
    omit?: SpotifyAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpotifyAccountInclude<ExtArgs> | null
    /**
     * Filter, which SpotifyAccount to fetch.
     */
    where?: SpotifyAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpotifyAccounts to fetch.
     */
    orderBy?: SpotifyAccountOrderByWithRelationInput | SpotifyAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SpotifyAccounts.
     */
    cursor?: SpotifyAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpotifyAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpotifyAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpotifyAccounts.
     */
    distinct?: SpotifyAccountScalarFieldEnum | SpotifyAccountScalarFieldEnum[]
  }

  /**
   * SpotifyAccount findFirstOrThrow
   */
  export type SpotifyAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpotifyAccount
     */
    select?: SpotifyAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpotifyAccount
     */
    omit?: SpotifyAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpotifyAccountInclude<ExtArgs> | null
    /**
     * Filter, which SpotifyAccount to fetch.
     */
    where?: SpotifyAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpotifyAccounts to fetch.
     */
    orderBy?: SpotifyAccountOrderByWithRelationInput | SpotifyAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SpotifyAccounts.
     */
    cursor?: SpotifyAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpotifyAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpotifyAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpotifyAccounts.
     */
    distinct?: SpotifyAccountScalarFieldEnum | SpotifyAccountScalarFieldEnum[]
  }

  /**
   * SpotifyAccount findMany
   */
  export type SpotifyAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpotifyAccount
     */
    select?: SpotifyAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpotifyAccount
     */
    omit?: SpotifyAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpotifyAccountInclude<ExtArgs> | null
    /**
     * Filter, which SpotifyAccounts to fetch.
     */
    where?: SpotifyAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpotifyAccounts to fetch.
     */
    orderBy?: SpotifyAccountOrderByWithRelationInput | SpotifyAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SpotifyAccounts.
     */
    cursor?: SpotifyAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpotifyAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpotifyAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpotifyAccounts.
     */
    distinct?: SpotifyAccountScalarFieldEnum | SpotifyAccountScalarFieldEnum[]
  }

  /**
   * SpotifyAccount create
   */
  export type SpotifyAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpotifyAccount
     */
    select?: SpotifyAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpotifyAccount
     */
    omit?: SpotifyAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpotifyAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a SpotifyAccount.
     */
    data: XOR<SpotifyAccountCreateInput, SpotifyAccountUncheckedCreateInput>
  }

  /**
   * SpotifyAccount createMany
   */
  export type SpotifyAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SpotifyAccounts.
     */
    data: SpotifyAccountCreateManyInput | SpotifyAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SpotifyAccount createManyAndReturn
   */
  export type SpotifyAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpotifyAccount
     */
    select?: SpotifyAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SpotifyAccount
     */
    omit?: SpotifyAccountOmit<ExtArgs> | null
    /**
     * The data used to create many SpotifyAccounts.
     */
    data: SpotifyAccountCreateManyInput | SpotifyAccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpotifyAccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SpotifyAccount update
   */
  export type SpotifyAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpotifyAccount
     */
    select?: SpotifyAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpotifyAccount
     */
    omit?: SpotifyAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpotifyAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a SpotifyAccount.
     */
    data: XOR<SpotifyAccountUpdateInput, SpotifyAccountUncheckedUpdateInput>
    /**
     * Choose, which SpotifyAccount to update.
     */
    where: SpotifyAccountWhereUniqueInput
  }

  /**
   * SpotifyAccount updateMany
   */
  export type SpotifyAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SpotifyAccounts.
     */
    data: XOR<SpotifyAccountUpdateManyMutationInput, SpotifyAccountUncheckedUpdateManyInput>
    /**
     * Filter which SpotifyAccounts to update
     */
    where?: SpotifyAccountWhereInput
    /**
     * Limit how many SpotifyAccounts to update.
     */
    limit?: number
  }

  /**
   * SpotifyAccount updateManyAndReturn
   */
  export type SpotifyAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpotifyAccount
     */
    select?: SpotifyAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SpotifyAccount
     */
    omit?: SpotifyAccountOmit<ExtArgs> | null
    /**
     * The data used to update SpotifyAccounts.
     */
    data: XOR<SpotifyAccountUpdateManyMutationInput, SpotifyAccountUncheckedUpdateManyInput>
    /**
     * Filter which SpotifyAccounts to update
     */
    where?: SpotifyAccountWhereInput
    /**
     * Limit how many SpotifyAccounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpotifyAccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SpotifyAccount upsert
   */
  export type SpotifyAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpotifyAccount
     */
    select?: SpotifyAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpotifyAccount
     */
    omit?: SpotifyAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpotifyAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the SpotifyAccount to update in case it exists.
     */
    where: SpotifyAccountWhereUniqueInput
    /**
     * In case the SpotifyAccount found by the `where` argument doesn't exist, create a new SpotifyAccount with this data.
     */
    create: XOR<SpotifyAccountCreateInput, SpotifyAccountUncheckedCreateInput>
    /**
     * In case the SpotifyAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpotifyAccountUpdateInput, SpotifyAccountUncheckedUpdateInput>
  }

  /**
   * SpotifyAccount delete
   */
  export type SpotifyAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpotifyAccount
     */
    select?: SpotifyAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpotifyAccount
     */
    omit?: SpotifyAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpotifyAccountInclude<ExtArgs> | null
    /**
     * Filter which SpotifyAccount to delete.
     */
    where: SpotifyAccountWhereUniqueInput
  }

  /**
   * SpotifyAccount deleteMany
   */
  export type SpotifyAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SpotifyAccounts to delete
     */
    where?: SpotifyAccountWhereInput
    /**
     * Limit how many SpotifyAccounts to delete.
     */
    limit?: number
  }

  /**
   * SpotifyAccount without action
   */
  export type SpotifyAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpotifyAccount
     */
    select?: SpotifyAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpotifyAccount
     */
    omit?: SpotifyAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpotifyAccountInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    moodEntries?: boolean | User$moodEntriesArgs<ExtArgs>
    spotifyAccount?: boolean | User$spotifyAccountArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    moodEntries?: boolean | User$moodEntriesArgs<ExtArgs>
    spotifyAccount?: boolean | User$spotifyAccountArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      moodEntries: Prisma.$MoodEntryPayload<ExtArgs>[]
      spotifyAccount: Prisma.$SpotifyAccountPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    moodEntries<T extends User$moodEntriesArgs<ExtArgs> = {}>(args?: Subset<T, User$moodEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    spotifyAccount<T extends User$spotifyAccountArgs<ExtArgs> = {}>(args?: Subset<T, User$spotifyAccountArgs<ExtArgs>>): Prisma__SpotifyAccountClient<$Result.GetResult<Prisma.$SpotifyAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.moodEntries
   */
  export type User$moodEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    where?: MoodEntryWhereInput
    orderBy?: MoodEntryOrderByWithRelationInput | MoodEntryOrderByWithRelationInput[]
    cursor?: MoodEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MoodEntryScalarFieldEnum | MoodEntryScalarFieldEnum[]
  }

  /**
   * User.spotifyAccount
   */
  export type User$spotifyAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpotifyAccount
     */
    select?: SpotifyAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpotifyAccount
     */
    omit?: SpotifyAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpotifyAccountInclude<ExtArgs> | null
    where?: SpotifyAccountWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MoodEntryScalarFieldEnum: {
    id: 'id',
    mood: 'mood',
    note: 'note',
    aiEmotion: 'aiEmotion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type MoodEntryScalarFieldEnum = (typeof MoodEntryScalarFieldEnum)[keyof typeof MoodEntryScalarFieldEnum]


  export const MoodScalarFieldEnum: {
    id: 'id',
    value: 'value',
    token: 'token',
    emoji: 'emoji',
    label: 'label',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MoodScalarFieldEnum = (typeof MoodScalarFieldEnum)[keyof typeof MoodScalarFieldEnum]


  export const SpotifyAccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    spotifyId: 'spotifyId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiresAt: 'expiresAt',
    scope: 'scope',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SpotifyAccountScalarFieldEnum = (typeof SpotifyAccountScalarFieldEnum)[keyof typeof SpotifyAccountScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MoodEntryWhereInput = {
    AND?: MoodEntryWhereInput | MoodEntryWhereInput[]
    OR?: MoodEntryWhereInput[]
    NOT?: MoodEntryWhereInput | MoodEntryWhereInput[]
    id?: StringFilter<"MoodEntry"> | string
    mood?: IntFilter<"MoodEntry"> | number
    note?: StringNullableFilter<"MoodEntry"> | string | null
    aiEmotion?: StringNullableFilter<"MoodEntry"> | string | null
    createdAt?: DateTimeFilter<"MoodEntry"> | Date | string
    updatedAt?: DateTimeFilter<"MoodEntry"> | Date | string
    userId?: StringFilter<"MoodEntry"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MoodEntryOrderByWithRelationInput = {
    id?: SortOrder
    mood?: SortOrder
    note?: SortOrderInput | SortOrder
    aiEmotion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MoodEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MoodEntryWhereInput | MoodEntryWhereInput[]
    OR?: MoodEntryWhereInput[]
    NOT?: MoodEntryWhereInput | MoodEntryWhereInput[]
    mood?: IntFilter<"MoodEntry"> | number
    note?: StringNullableFilter<"MoodEntry"> | string | null
    aiEmotion?: StringNullableFilter<"MoodEntry"> | string | null
    createdAt?: DateTimeFilter<"MoodEntry"> | Date | string
    updatedAt?: DateTimeFilter<"MoodEntry"> | Date | string
    userId?: StringFilter<"MoodEntry"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MoodEntryOrderByWithAggregationInput = {
    id?: SortOrder
    mood?: SortOrder
    note?: SortOrderInput | SortOrder
    aiEmotion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: MoodEntryCountOrderByAggregateInput
    _avg?: MoodEntryAvgOrderByAggregateInput
    _max?: MoodEntryMaxOrderByAggregateInput
    _min?: MoodEntryMinOrderByAggregateInput
    _sum?: MoodEntrySumOrderByAggregateInput
  }

  export type MoodEntryScalarWhereWithAggregatesInput = {
    AND?: MoodEntryScalarWhereWithAggregatesInput | MoodEntryScalarWhereWithAggregatesInput[]
    OR?: MoodEntryScalarWhereWithAggregatesInput[]
    NOT?: MoodEntryScalarWhereWithAggregatesInput | MoodEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MoodEntry"> | string
    mood?: IntWithAggregatesFilter<"MoodEntry"> | number
    note?: StringNullableWithAggregatesFilter<"MoodEntry"> | string | null
    aiEmotion?: StringNullableWithAggregatesFilter<"MoodEntry"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MoodEntry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MoodEntry"> | Date | string
    userId?: StringWithAggregatesFilter<"MoodEntry"> | string
  }

  export type MoodWhereInput = {
    AND?: MoodWhereInput | MoodWhereInput[]
    OR?: MoodWhereInput[]
    NOT?: MoodWhereInput | MoodWhereInput[]
    id?: StringFilter<"Mood"> | string
    value?: IntFilter<"Mood"> | number
    token?: StringFilter<"Mood"> | string
    emoji?: StringFilter<"Mood"> | string
    label?: StringFilter<"Mood"> | string
    createdAt?: DateTimeFilter<"Mood"> | Date | string
    updatedAt?: DateTimeFilter<"Mood"> | Date | string
  }

  export type MoodOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
    token?: SortOrder
    emoji?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MoodWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    value?: number
    token?: string
    AND?: MoodWhereInput | MoodWhereInput[]
    OR?: MoodWhereInput[]
    NOT?: MoodWhereInput | MoodWhereInput[]
    emoji?: StringFilter<"Mood"> | string
    label?: StringFilter<"Mood"> | string
    createdAt?: DateTimeFilter<"Mood"> | Date | string
    updatedAt?: DateTimeFilter<"Mood"> | Date | string
  }, "id" | "value" | "token">

  export type MoodOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    token?: SortOrder
    emoji?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MoodCountOrderByAggregateInput
    _avg?: MoodAvgOrderByAggregateInput
    _max?: MoodMaxOrderByAggregateInput
    _min?: MoodMinOrderByAggregateInput
    _sum?: MoodSumOrderByAggregateInput
  }

  export type MoodScalarWhereWithAggregatesInput = {
    AND?: MoodScalarWhereWithAggregatesInput | MoodScalarWhereWithAggregatesInput[]
    OR?: MoodScalarWhereWithAggregatesInput[]
    NOT?: MoodScalarWhereWithAggregatesInput | MoodScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Mood"> | string
    value?: IntWithAggregatesFilter<"Mood"> | number
    token?: StringWithAggregatesFilter<"Mood"> | string
    emoji?: StringWithAggregatesFilter<"Mood"> | string
    label?: StringWithAggregatesFilter<"Mood"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Mood"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Mood"> | Date | string
  }

  export type SpotifyAccountWhereInput = {
    AND?: SpotifyAccountWhereInput | SpotifyAccountWhereInput[]
    OR?: SpotifyAccountWhereInput[]
    NOT?: SpotifyAccountWhereInput | SpotifyAccountWhereInput[]
    id?: StringFilter<"SpotifyAccount"> | string
    userId?: StringFilter<"SpotifyAccount"> | string
    spotifyId?: StringFilter<"SpotifyAccount"> | string
    accessToken?: StringFilter<"SpotifyAccount"> | string
    refreshToken?: StringFilter<"SpotifyAccount"> | string
    expiresAt?: DateTimeFilter<"SpotifyAccount"> | Date | string
    scope?: StringFilter<"SpotifyAccount"> | string
    createdAt?: DateTimeFilter<"SpotifyAccount"> | Date | string
    updatedAt?: DateTimeFilter<"SpotifyAccount"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SpotifyAccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    spotifyId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    scope?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SpotifyAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    spotifyId?: string
    AND?: SpotifyAccountWhereInput | SpotifyAccountWhereInput[]
    OR?: SpotifyAccountWhereInput[]
    NOT?: SpotifyAccountWhereInput | SpotifyAccountWhereInput[]
    accessToken?: StringFilter<"SpotifyAccount"> | string
    refreshToken?: StringFilter<"SpotifyAccount"> | string
    expiresAt?: DateTimeFilter<"SpotifyAccount"> | Date | string
    scope?: StringFilter<"SpotifyAccount"> | string
    createdAt?: DateTimeFilter<"SpotifyAccount"> | Date | string
    updatedAt?: DateTimeFilter<"SpotifyAccount"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId" | "spotifyId">

  export type SpotifyAccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    spotifyId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    scope?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SpotifyAccountCountOrderByAggregateInput
    _max?: SpotifyAccountMaxOrderByAggregateInput
    _min?: SpotifyAccountMinOrderByAggregateInput
  }

  export type SpotifyAccountScalarWhereWithAggregatesInput = {
    AND?: SpotifyAccountScalarWhereWithAggregatesInput | SpotifyAccountScalarWhereWithAggregatesInput[]
    OR?: SpotifyAccountScalarWhereWithAggregatesInput[]
    NOT?: SpotifyAccountScalarWhereWithAggregatesInput | SpotifyAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SpotifyAccount"> | string
    userId?: StringWithAggregatesFilter<"SpotifyAccount"> | string
    spotifyId?: StringWithAggregatesFilter<"SpotifyAccount"> | string
    accessToken?: StringWithAggregatesFilter<"SpotifyAccount"> | string
    refreshToken?: StringWithAggregatesFilter<"SpotifyAccount"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"SpotifyAccount"> | Date | string
    scope?: StringWithAggregatesFilter<"SpotifyAccount"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SpotifyAccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SpotifyAccount"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    moodEntries?: MoodEntryListRelationFilter
    spotifyAccount?: XOR<SpotifyAccountNullableScalarRelationFilter, SpotifyAccountWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    moodEntries?: MoodEntryOrderByRelationAggregateInput
    spotifyAccount?: SpotifyAccountOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    moodEntries?: MoodEntryListRelationFilter
    spotifyAccount?: XOR<SpotifyAccountNullableScalarRelationFilter, SpotifyAccountWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MoodEntryCreateInput = {
    id?: string
    mood: number
    note?: string | null
    aiEmotion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMoodEntriesInput
  }

  export type MoodEntryUncheckedCreateInput = {
    id?: string
    mood: number
    note?: string | null
    aiEmotion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type MoodEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    aiEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMoodEntriesNestedInput
  }

  export type MoodEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    aiEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MoodEntryCreateManyInput = {
    id?: string
    mood: number
    note?: string | null
    aiEmotion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type MoodEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    aiEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    aiEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MoodCreateInput = {
    id?: string
    value: number
    token: string
    emoji: string
    label: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MoodUncheckedCreateInput = {
    id?: string
    value: number
    token: string
    emoji: string
    label: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MoodUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodCreateManyInput = {
    id?: string
    value: number
    token: string
    emoji: string
    label: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MoodUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpotifyAccountCreateInput = {
    id?: string
    spotifyId: string
    accessToken: string
    refreshToken: string
    expiresAt: Date | string
    scope: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSpotifyAccountInput
  }

  export type SpotifyAccountUncheckedCreateInput = {
    id?: string
    userId: string
    spotifyId: string
    accessToken: string
    refreshToken: string
    expiresAt: Date | string
    scope: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpotifyAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    spotifyId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scope?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSpotifyAccountNestedInput
  }

  export type SpotifyAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    spotifyId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scope?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpotifyAccountCreateManyInput = {
    id?: string
    userId: string
    spotifyId: string
    accessToken: string
    refreshToken: string
    expiresAt: Date | string
    scope: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpotifyAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    spotifyId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scope?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpotifyAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    spotifyId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scope?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    moodEntries?: MoodEntryCreateNestedManyWithoutUserInput
    spotifyAccount?: SpotifyAccountCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    moodEntries?: MoodEntryUncheckedCreateNestedManyWithoutUserInput
    spotifyAccount?: SpotifyAccountUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moodEntries?: MoodEntryUpdateManyWithoutUserNestedInput
    spotifyAccount?: SpotifyAccountUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moodEntries?: MoodEntryUncheckedUpdateManyWithoutUserNestedInput
    spotifyAccount?: SpotifyAccountUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MoodEntryCountOrderByAggregateInput = {
    id?: SortOrder
    mood?: SortOrder
    note?: SortOrder
    aiEmotion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type MoodEntryAvgOrderByAggregateInput = {
    mood?: SortOrder
  }

  export type MoodEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    mood?: SortOrder
    note?: SortOrder
    aiEmotion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type MoodEntryMinOrderByAggregateInput = {
    id?: SortOrder
    mood?: SortOrder
    note?: SortOrder
    aiEmotion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type MoodEntrySumOrderByAggregateInput = {
    mood?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type MoodCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    token?: SortOrder
    emoji?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MoodAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type MoodMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    token?: SortOrder
    emoji?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MoodMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    token?: SortOrder
    emoji?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MoodSumOrderByAggregateInput = {
    value?: SortOrder
  }

  export type SpotifyAccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    spotifyId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    scope?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpotifyAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    spotifyId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    scope?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpotifyAccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    spotifyId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    scope?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MoodEntryListRelationFilter = {
    every?: MoodEntryWhereInput
    some?: MoodEntryWhereInput
    none?: MoodEntryWhereInput
  }

  export type SpotifyAccountNullableScalarRelationFilter = {
    is?: SpotifyAccountWhereInput | null
    isNot?: SpotifyAccountWhereInput | null
  }

  export type MoodEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCreateNestedOneWithoutMoodEntriesInput = {
    create?: XOR<UserCreateWithoutMoodEntriesInput, UserUncheckedCreateWithoutMoodEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMoodEntriesInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutMoodEntriesNestedInput = {
    create?: XOR<UserCreateWithoutMoodEntriesInput, UserUncheckedCreateWithoutMoodEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMoodEntriesInput
    upsert?: UserUpsertWithoutMoodEntriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMoodEntriesInput, UserUpdateWithoutMoodEntriesInput>, UserUncheckedUpdateWithoutMoodEntriesInput>
  }

  export type UserCreateNestedOneWithoutSpotifyAccountInput = {
    create?: XOR<UserCreateWithoutSpotifyAccountInput, UserUncheckedCreateWithoutSpotifyAccountInput>
    connectOrCreate?: UserCreateOrConnectWithoutSpotifyAccountInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSpotifyAccountNestedInput = {
    create?: XOR<UserCreateWithoutSpotifyAccountInput, UserUncheckedCreateWithoutSpotifyAccountInput>
    connectOrCreate?: UserCreateOrConnectWithoutSpotifyAccountInput
    upsert?: UserUpsertWithoutSpotifyAccountInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSpotifyAccountInput, UserUpdateWithoutSpotifyAccountInput>, UserUncheckedUpdateWithoutSpotifyAccountInput>
  }

  export type MoodEntryCreateNestedManyWithoutUserInput = {
    create?: XOR<MoodEntryCreateWithoutUserInput, MoodEntryUncheckedCreateWithoutUserInput> | MoodEntryCreateWithoutUserInput[] | MoodEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MoodEntryCreateOrConnectWithoutUserInput | MoodEntryCreateOrConnectWithoutUserInput[]
    createMany?: MoodEntryCreateManyUserInputEnvelope
    connect?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
  }

  export type SpotifyAccountCreateNestedOneWithoutUserInput = {
    create?: XOR<SpotifyAccountCreateWithoutUserInput, SpotifyAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: SpotifyAccountCreateOrConnectWithoutUserInput
    connect?: SpotifyAccountWhereUniqueInput
  }

  export type MoodEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MoodEntryCreateWithoutUserInput, MoodEntryUncheckedCreateWithoutUserInput> | MoodEntryCreateWithoutUserInput[] | MoodEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MoodEntryCreateOrConnectWithoutUserInput | MoodEntryCreateOrConnectWithoutUserInput[]
    createMany?: MoodEntryCreateManyUserInputEnvelope
    connect?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
  }

  export type SpotifyAccountUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<SpotifyAccountCreateWithoutUserInput, SpotifyAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: SpotifyAccountCreateOrConnectWithoutUserInput
    connect?: SpotifyAccountWhereUniqueInput
  }

  export type MoodEntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<MoodEntryCreateWithoutUserInput, MoodEntryUncheckedCreateWithoutUserInput> | MoodEntryCreateWithoutUserInput[] | MoodEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MoodEntryCreateOrConnectWithoutUserInput | MoodEntryCreateOrConnectWithoutUserInput[]
    upsert?: MoodEntryUpsertWithWhereUniqueWithoutUserInput | MoodEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MoodEntryCreateManyUserInputEnvelope
    set?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    disconnect?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    delete?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    connect?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    update?: MoodEntryUpdateWithWhereUniqueWithoutUserInput | MoodEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MoodEntryUpdateManyWithWhereWithoutUserInput | MoodEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MoodEntryScalarWhereInput | MoodEntryScalarWhereInput[]
  }

  export type SpotifyAccountUpdateOneWithoutUserNestedInput = {
    create?: XOR<SpotifyAccountCreateWithoutUserInput, SpotifyAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: SpotifyAccountCreateOrConnectWithoutUserInput
    upsert?: SpotifyAccountUpsertWithoutUserInput
    disconnect?: SpotifyAccountWhereInput | boolean
    delete?: SpotifyAccountWhereInput | boolean
    connect?: SpotifyAccountWhereUniqueInput
    update?: XOR<XOR<SpotifyAccountUpdateToOneWithWhereWithoutUserInput, SpotifyAccountUpdateWithoutUserInput>, SpotifyAccountUncheckedUpdateWithoutUserInput>
  }

  export type MoodEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MoodEntryCreateWithoutUserInput, MoodEntryUncheckedCreateWithoutUserInput> | MoodEntryCreateWithoutUserInput[] | MoodEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MoodEntryCreateOrConnectWithoutUserInput | MoodEntryCreateOrConnectWithoutUserInput[]
    upsert?: MoodEntryUpsertWithWhereUniqueWithoutUserInput | MoodEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MoodEntryCreateManyUserInputEnvelope
    set?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    disconnect?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    delete?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    connect?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    update?: MoodEntryUpdateWithWhereUniqueWithoutUserInput | MoodEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MoodEntryUpdateManyWithWhereWithoutUserInput | MoodEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MoodEntryScalarWhereInput | MoodEntryScalarWhereInput[]
  }

  export type SpotifyAccountUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SpotifyAccountCreateWithoutUserInput, SpotifyAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: SpotifyAccountCreateOrConnectWithoutUserInput
    upsert?: SpotifyAccountUpsertWithoutUserInput
    disconnect?: SpotifyAccountWhereInput | boolean
    delete?: SpotifyAccountWhereInput | boolean
    connect?: SpotifyAccountWhereUniqueInput
    update?: XOR<XOR<SpotifyAccountUpdateToOneWithWhereWithoutUserInput, SpotifyAccountUpdateWithoutUserInput>, SpotifyAccountUncheckedUpdateWithoutUserInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserCreateWithoutMoodEntriesInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    spotifyAccount?: SpotifyAccountCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMoodEntriesInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    spotifyAccount?: SpotifyAccountUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMoodEntriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMoodEntriesInput, UserUncheckedCreateWithoutMoodEntriesInput>
  }

  export type UserUpsertWithoutMoodEntriesInput = {
    update: XOR<UserUpdateWithoutMoodEntriesInput, UserUncheckedUpdateWithoutMoodEntriesInput>
    create: XOR<UserCreateWithoutMoodEntriesInput, UserUncheckedCreateWithoutMoodEntriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMoodEntriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMoodEntriesInput, UserUncheckedUpdateWithoutMoodEntriesInput>
  }

  export type UserUpdateWithoutMoodEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    spotifyAccount?: SpotifyAccountUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMoodEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    spotifyAccount?: SpotifyAccountUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutSpotifyAccountInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    moodEntries?: MoodEntryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSpotifyAccountInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    moodEntries?: MoodEntryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSpotifyAccountInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSpotifyAccountInput, UserUncheckedCreateWithoutSpotifyAccountInput>
  }

  export type UserUpsertWithoutSpotifyAccountInput = {
    update: XOR<UserUpdateWithoutSpotifyAccountInput, UserUncheckedUpdateWithoutSpotifyAccountInput>
    create: XOR<UserCreateWithoutSpotifyAccountInput, UserUncheckedCreateWithoutSpotifyAccountInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSpotifyAccountInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSpotifyAccountInput, UserUncheckedUpdateWithoutSpotifyAccountInput>
  }

  export type UserUpdateWithoutSpotifyAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moodEntries?: MoodEntryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSpotifyAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moodEntries?: MoodEntryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MoodEntryCreateWithoutUserInput = {
    id?: string
    mood: number
    note?: string | null
    aiEmotion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MoodEntryUncheckedCreateWithoutUserInput = {
    id?: string
    mood: number
    note?: string | null
    aiEmotion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MoodEntryCreateOrConnectWithoutUserInput = {
    where: MoodEntryWhereUniqueInput
    create: XOR<MoodEntryCreateWithoutUserInput, MoodEntryUncheckedCreateWithoutUserInput>
  }

  export type MoodEntryCreateManyUserInputEnvelope = {
    data: MoodEntryCreateManyUserInput | MoodEntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SpotifyAccountCreateWithoutUserInput = {
    id?: string
    spotifyId: string
    accessToken: string
    refreshToken: string
    expiresAt: Date | string
    scope: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpotifyAccountUncheckedCreateWithoutUserInput = {
    id?: string
    spotifyId: string
    accessToken: string
    refreshToken: string
    expiresAt: Date | string
    scope: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpotifyAccountCreateOrConnectWithoutUserInput = {
    where: SpotifyAccountWhereUniqueInput
    create: XOR<SpotifyAccountCreateWithoutUserInput, SpotifyAccountUncheckedCreateWithoutUserInput>
  }

  export type MoodEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: MoodEntryWhereUniqueInput
    update: XOR<MoodEntryUpdateWithoutUserInput, MoodEntryUncheckedUpdateWithoutUserInput>
    create: XOR<MoodEntryCreateWithoutUserInput, MoodEntryUncheckedCreateWithoutUserInput>
  }

  export type MoodEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: MoodEntryWhereUniqueInput
    data: XOR<MoodEntryUpdateWithoutUserInput, MoodEntryUncheckedUpdateWithoutUserInput>
  }

  export type MoodEntryUpdateManyWithWhereWithoutUserInput = {
    where: MoodEntryScalarWhereInput
    data: XOR<MoodEntryUpdateManyMutationInput, MoodEntryUncheckedUpdateManyWithoutUserInput>
  }

  export type MoodEntryScalarWhereInput = {
    AND?: MoodEntryScalarWhereInput | MoodEntryScalarWhereInput[]
    OR?: MoodEntryScalarWhereInput[]
    NOT?: MoodEntryScalarWhereInput | MoodEntryScalarWhereInput[]
    id?: StringFilter<"MoodEntry"> | string
    mood?: IntFilter<"MoodEntry"> | number
    note?: StringNullableFilter<"MoodEntry"> | string | null
    aiEmotion?: StringNullableFilter<"MoodEntry"> | string | null
    createdAt?: DateTimeFilter<"MoodEntry"> | Date | string
    updatedAt?: DateTimeFilter<"MoodEntry"> | Date | string
    userId?: StringFilter<"MoodEntry"> | string
  }

  export type SpotifyAccountUpsertWithoutUserInput = {
    update: XOR<SpotifyAccountUpdateWithoutUserInput, SpotifyAccountUncheckedUpdateWithoutUserInput>
    create: XOR<SpotifyAccountCreateWithoutUserInput, SpotifyAccountUncheckedCreateWithoutUserInput>
    where?: SpotifyAccountWhereInput
  }

  export type SpotifyAccountUpdateToOneWithWhereWithoutUserInput = {
    where?: SpotifyAccountWhereInput
    data: XOR<SpotifyAccountUpdateWithoutUserInput, SpotifyAccountUncheckedUpdateWithoutUserInput>
  }

  export type SpotifyAccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    spotifyId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scope?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpotifyAccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    spotifyId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scope?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodEntryCreateManyUserInput = {
    id?: string
    mood: number
    note?: string | null
    aiEmotion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MoodEntryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    aiEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodEntryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    aiEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodEntryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    aiEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}