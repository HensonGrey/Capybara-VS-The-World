import { Body } from "matter-js";

export interface Minion extends Body {
  health: number;
  damage: number;
}
