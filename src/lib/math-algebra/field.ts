import type { Prove } from "./base.ts";
import { asProved } from "./base.ts";
import type { GroupProtocol } from "./group.ts";
import { numberGroup, numberMultGroup } from "./group.ts";

// 体 (field)
export interface FieldProtocol<T, U> {
  readonly "@isAddAssociative": Prove;
  readonly "@isAddCommutative": Prove;
  Add(t1: T, t2: T): T;
  AddInverse(t: T): T;
  readonly "@isMultDistributive": Prove;
  Mult(t: T, u: U): T;
  readonly "@isMultAssociative": Prove;
  readonly "@isMultCommutative": Prove;
  MultAdd(u1: U, u2: U): U;
  MultInverse(u: U): U;
  Zero(): T;
  One(): U;
  AddEq(t1: T, t2: T): boolean;
  MultEq(u1: U, u2: U): boolean;
}
export interface FieldUtil<T, U> {
  IsZero(t: T): boolean;
  IsOne(u: U): boolean;
}

export const fieldUtil = <T, U>(
  field: FieldProtocol<T, U>,
): FieldUtil<T, U> => {
  return {
    IsZero(t): boolean {
      return field.AddEq(field.Zero(), t);
    },
    IsOne(u): boolean {
      return field.MultEq(field.One(), u);
    },
  };
};

export const createField = <T, U>(
  mod: GroupProtocol<T>,
  mult: GroupProtocol<U>,
  act: FieldProtocol<T, U>["Mult"],
  actIsDistributive: Prove,
): FieldProtocol<T, U> => {
  return {
    "@isAddAssociative": mod["@isAssociative"],
    "@isAddCommutative": mod["@isCommutative"],
    Add: mod.Add,
    AddInverse: mod.Inverse,
    "@isMultDistributive": actIsDistributive,
    Mult: act,
    "@isMultAssociative": mult["@isAssociative"],
    "@isMultCommutative": mult["@isCommutative"],
    MultAdd: mult.Add,
    MultInverse: mult.Inverse,
    Zero: mod.Zero,
    One: mult.Zero,
    AddEq: mod.Eq,
    MultEq: mult.Eq,
  };
};

export const numberField = () =>
  createField<number, number>(
    numberGroup(),
    numberMultGroup(),
    (t, u) => t * u,
    asProved(/**/),
  );
