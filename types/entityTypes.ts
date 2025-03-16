import { Body } from "matter-js";

export interface Minion extends Body {
  health: number;
  damage: number;
}

export interface Bullet extends Body {
  damage: number;
}

export interface IWall extends Body {
  health: number;
}
